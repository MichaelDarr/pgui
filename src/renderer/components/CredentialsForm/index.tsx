import { FC } from 'react';
import { selector, useRecoilCallback, useRecoilValue } from 'recoil';
import * as uuid from 'uuid';

import {
    Credentials,
    Connection,
    SaveConnectionRequest,
    TestConnectionRequest,
} from 'protos/postgres/postgres_pb';
import { postgres } from 'renderer/client';
import { Grid, GridItem } from 'renderer/components/Grid';
import { Heading } from 'renderer/components/Text/Heading';
import { activeConnectionIDState, connectionsState } from 'renderer/state/postgres/connection';
import { SectionProps } from 'renderer/types';
import { randomColorHex } from 'renderer/utils/color';

import { ConnectionName, connectionNameState } from './ConnectionName';
import { DatabaseName, databaseNameState } from './DatabaseName';
import { Host, hostState } from './Host';
import { Password, passwordState } from './Password';
import { Port, portState } from './Port';
import { Username, usernameState } from './Username';

interface TestResult {
    result: 'error'|'failure'|'success'|'untested';
    message?: string;
}
const testResultState = selector<TestResult>({
    key: 'CredentialsFormTestResult',
    get: ({ get }) => {
        const credentials = get(credentialsState);
        if (credentials === null) {
            return { result: 'untested' }
        }
        const arg = new TestConnectionRequest();
        arg.setCredentials(credentials);
        return new Promise(res => {
            postgres.testConnection(arg, (err, value) => {
                if (err) {
                    res({ result: 'error', message: String(err) });
                } else if (!value) {
                    res({ result: 'error', message: String('no response from driver') });
                } else {
                    res({ result: value.getSuccess() ? 'success' : 'failure' });
                }
            });
        })
    }
});

const credentialsState = selector<Credentials|null>({
    key: 'CredentialsFormCredentials',
    get: ({ get }) => {
        const databaseName = get(databaseNameState);
        const host = get(hostState);
        const password = get(passwordState);
        const port = get(portState);
        const username = get(usernameState);
        if (databaseName === null || host === null || password === null || port === null || username === null) {
            return null;
        }

        const credentials = new Credentials();
        credentials.setDb(databaseName);
        credentials.setHost(host);
        credentials.setPort(port);
        credentials.setUser(username);
        credentials.setPassword(password);
        return credentials;
    },
});

const connectionState = selector<null|Connection>({
    key: 'CredentailsFormConnection',
    get: ({ get }) => {
        const credentials = get(credentialsState);
        const name = get(connectionNameState);
        if (name === null || credentials === null) {
            return null;
        }

        const connection = new Connection();
        connection.setCredentials(credentials);
        connection.setName(name);
        connection.setId(uuid.v4());
        connection.setColor(randomColorHex());
        return connection;
    },
});

const connectionHeaderText = selector({
    key: 'CredentailsFormConnectionHeaderText',
    get:({ get }) => {
        const connectionName = get(connectionNameState);
        if (connectionName === null) {
            return 'Untitled Connection';
        }
        return connectionName;
    }
})

const area = {
    buttons: 'buttons',
    connName: 'connection-name',
    dbName: 'database-name',
    header: 'header',
    host: 'host',
    password: 'password',
    port: 'port',
    testIndicator: 'test-indicator',
    username: 'username',
}

const gridTemplate = `
" .     .                 .                 .                      .                      .                     .     " 1rem
" .     ${area.header}    ${area.header}    ${area.header}         ${area.header}         ${area.header}        .     " auto
" .     .                 .                 .                      .                      .                     .     " 1rem
" .     ${area.connName}  ${area.connName}  ${area.connName}       .                      .                     .     " auto
" .     .                 .                 .                      .                      .                     .     " 1rem
" .     ${area.host}      ${area.host}      ${area.host}           .                      ${area.port}          .     " auto
" .     .                 .                 .                      .                      .                     .     " 1rem
" .     ${area.username}  .                 ${area.password}       ${area.password}       ${area.password}      .     " auto
" .     .                 .                 .                      .                      .                     .     " 1rem
" .     ${area.dbName}    ${area.dbName}    ${area.dbName}         ${area.dbName}         ${area.dbName}        .     " auto
" .     .                 .                 .                      .                      .                     .     " 1rem
" .     ${area.buttons}   .                 ${area.testIndicator}  ${area.testIndicator}  ${area.testIndicator} .     " auto
" .     .                 .                 .                      .                      .                     .     " 1rem
/ 1rem  13fr              1fr               6fr                    1fr                    6fr                   1rem  `;

export const CredentialsForm: FC<SectionProps> = props => {
    const headerText = useRecoilValue(connectionHeaderText);
    const testResult = useRecoilValue(testResultState);

    const refreshTestResult = useRecoilCallback(({ refresh }) => () => {
        refresh(testResultState);
    })

    const saveConnection = useRecoilCallback(({ refresh, set, snapshot }) => async () => {
        const connection = await snapshot.getPromise(connectionState);
        if (connection === null) {
            return;
        }
        const arg = new SaveConnectionRequest();
        arg.setConnection(connection);
        postgres.saveConnection(arg, (err, value) => {
            if (err) {
                console.warn(err);
                return;
            } else if (!value) {
                console.warn(new Error('unexpected nullish value'));
                return;
            }
            refresh(connectionsState);
            const newConnectionID = value.getConnection()?.getId();
            if (typeof newConnectionID === 'undefined') {
                return;
            }
            set(activeConnectionIDState, newConnectionID);
        })
    });

    const renderConnectionStatus = (): JSX.Element => {
        switch(testResult.result) {
            case 'error':
                return <span style={{ color: 'red' }}>internal error: {testResult.message}</span>;
            case 'failure':
                return <span style={{ color: 'red' }}>connection failed</span>;
            case 'success':
                return <span style={{ color: 'green' }}>connection successful</span>
            default:
                return <></>;
        }
    }

    return (
        <Grid {...props} template={gridTemplate}>
            <GridItem area={area.header}>
                <Heading size='medium'>{headerText}</Heading>
            </GridItem>
            <GridItem area={area.connName}>
                <ConnectionName />
            </GridItem>
            <GridItem area={area.host}>
                <Host />
            </GridItem>
            <GridItem area={area.port}>
                <Port />
            </GridItem>
            <GridItem area={area.username}>
                <Username />
            </GridItem>
            <GridItem area={area.password}>
                <Password />
            </GridItem>
            <GridItem area={area.dbName}>
                <DatabaseName />
            </GridItem>
            <GridItem area={area.buttons}>
                <button onClick={refreshTestResult}>Test Connection</button>
                <button onClick={saveConnection}>Save Connection</button>
            </GridItem>
            <GridItem area={area.testIndicator}>
                {renderConnectionStatus()}
            </GridItem>
        </Grid>
    );
};
