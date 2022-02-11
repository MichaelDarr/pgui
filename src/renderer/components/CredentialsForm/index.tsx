import { FC } from 'react';
import { atom, DefaultValue, selector, useRecoilCallback, useRecoilState } from 'recoil';
import * as uuid from 'uuid';

import { Grid, GridItem } from '../Grid';
import { Heading } from '../Text/Heading';
import { postgres } from '../../client';
import { activeConnectionIDState, connectionsState } from '../../state/postgres/connection';
import { SectionProps } from '../../types';
import { randomColorHex } from '../../utils/color';
import {
    Credentials,
    Connection,
    SaveConnectionRequest,
    TestConnectionRequest,
} from '../../../protos/postgres/postgres_pb';

const databaseState = atom({
    key: 'CredentialsFormDatabase',
    default: 'pg',
});
const hostState = atom({
    key: 'CredentialsFormHost',
    default: 'localhost',
});
const nameState = atom({
    key: 'CredentialsFormName',
    default: 'CoolConnection',
});
const passwordState = atom({
    key: 'CredentialsFormPassword',
    default: 'pass',
});
const portFullState = atom({
    key: 'CredentialsFormPortFullState',
    default: { stringified: '5432', numeric: 5432 },
});
const portStringifiedState = selector<string>({
    key: 'CredentialsFormPortStringifiedState',
    get: ({ get }) => {
        return get(portFullState).stringified;
    },
    set: ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            return;
        }
        const newNumericValue = parseInt(newValue);
        if (!isNaN(newNumericValue)) {
            set(portFullState, { stringified: newValue, numeric: newNumericValue });
        }
    },
});
const numericPortState = selector<number>({
    key: 'CredentialsFormPortNumericState',
    get: ({ get }) => {
        return get(portFullState).numeric;
    }
});
const userState = atom({
    key: 'CredentialsFormUser',
    default: 'postgres',
});
interface TestResult {
    result: 'untested'|'success'|'failure'|'error';
    message?: string;
}
const testResultState = atom<TestResult>({
    key: 'CredentialsFormTestResult',
    default: { result: 'untested' },
});

const credentialsState = selector<Credentials>({
    key: 'CredentialsFormCredentials',
    get: ({ get }) => {
        const credentials = new Credentials();
        const db = get(databaseState);
        credentials.setDb(db);
        const host = get(hostState);
        credentials.setHost(host);
        const password = get(passwordState);
        credentials.setPassword(password);
        const port = get(numericPortState);
        credentials.setPort(port);
        const user = get(userState);
        credentials.setUser(user);
        return credentials;
    },
});

const connectionState = selector<Connection>({
    key: 'CredentailsFormConnection',
    get: ({ get }) => {
        const connection = new Connection();
        const credentials = get(credentialsState);
        connection.setCredentials(credentials);
        const name = get(nameState);
        connection.setName(name);
        connection.setId(uuid.v4());
        connection.setColor(randomColorHex());
        return connection;
    },
});

const area = {
    header: 'header',
    form: 'form',
    buttons: 'buttons',
    testIndicator: 'test-indicator',
}

const gridTemplate = `
" .     .                .               .                      .   " 1rem
" .     ${area.header}   ${area.header}  ${area.header}         .   " auto
" .     .                .               .                      .   " 1rem
" .     ${area.form}     ${area.form}    ${area.form}           .   " auto
" .     .                .               .                      .   " 1rem
" .     ${area.buttons}  .               ${area.testIndicator}  .   " auto
" .     .                .               .                      .   " 1rem
/ 1rem  auto             1rem            auto                   1fr `;

export const CredentialsForm: FC<SectionProps> = (props) => {
    const [name, setName] = useRecoilState(nameState);
    const [host, setHost] = useRecoilState(hostState);
    const [port, setPort] = useRecoilState(portStringifiedState);
    const [user, setUser] = useRecoilState(userState);
    const [db, setDb] = useRecoilState(databaseState);
    const [password, setPassword] = useRecoilState(passwordState);
    const [testResult, setTestResult] = useRecoilState(testResultState);

    const refreshTestResult = useRecoilCallback(({ snapshot }) => async () => {
        const credentials = await snapshot.getPromise(credentialsState);
        const arg = new TestConnectionRequest();
        arg.setCredentials(credentials);
        postgres.testConnection(arg, (err, value) => {
            let newResult: TestResult;
            if (err) {
                newResult = { result: 'error', message: String(err) };
            } else if (!value) {
                newResult = { result: 'error', message: String('no response from driver') };
            } else {
                newResult = { result: value.getSuccess() ? 'success' : 'failure' };
            }
            setTestResult(newResult);
        });
    }, []);

    const saveConnection = useRecoilCallback(({ refresh, set, snapshot }) => async () => {
        const connection = await snapshot.getPromise(connectionState);
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
                <Heading size='medium'>New Connection</Heading>
            </GridItem>
            <GridItem area={area.form}>
                <hr />
                <label>
                    <p>Name</p>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} />
                </label>
                <hr />
                <label>
                    <p>Host</p>
                    <input type='text' value={host} onChange={e => setHost(e.target.value)} />
                </label>
                <hr />
                <label>
                    <p>Port</p>
                    <input type='text' value={port} onChange={e => setPort(e.target.value)} />
                </label>
                <hr />
                <label>
                    <p>User</p>
                    <input type='text' value={user} onChange={e => setUser(e.target.value)} />
                </label>
                <hr />
                <label>
                    <p>DB</p>
                    <input type='text' value={db} onChange={e => setDb(e.target.value)} />
                </label>
                <hr />
                <label>
                    <p>Password</p>
                    <input type='text' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
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
