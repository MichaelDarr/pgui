import { FC } from 'react';
import {
    atom,
    DefaultValue,
    selector,
    useRecoilCallback,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
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

import { Name, nameState } from './Name';

const databaseState = atom({
    key: 'CredentialsFormDatabase',
    default: 'pg',
});
const hostState = atom({
    key: 'CredentialsFormHost',
    default: 'localhost',
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
const testResultState = selector<TestResult>({
    key: 'CredentialsFormTestResult',
    get: ({ get }) => {
        const credentials = get(credentialsState);
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

const connectionState = selector<null|Connection>({
    key: 'CredentailsFormConnection',
    get: ({ get }) => {
        const connection = new Connection();
        const credentials = get(credentialsState);
        connection.setCredentials(credentials);
        const name = get(nameState);
        if (name === null) {
            return null;
        }
        connection.setName(name);
        connection.setId(uuid.v4());
        connection.setColor(randomColorHex());
        return connection;
    },
});

const connectionHeaderText = selector({
    key: 'CredentailsFormConnectionHeaderText',
    get:({ get }) => {
        const connectionName = get(nameState);
        if (connectionName === null) {
            return 'Untitled Connection';
        }
        return connectionName;
    }
})

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
    const headerText = useRecoilValue(connectionHeaderText);

    const [host, setHost] = useRecoilState(hostState);
    const [port, setPort] = useRecoilState(portStringifiedState);
    const [user, setUser] = useRecoilState(userState);
    const [db, setDb] = useRecoilState(databaseState);
    const [password, setPassword] = useRecoilState(passwordState);
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
            <GridItem area={area.form}>
                <Name />
                <label>
                    <p>Host</p>
                    <input type='text' value={host} onChange={e => setHost(e.target.value)} />
                </label>
                <label>
                    <p>Port</p>
                    <input type='text' value={port} onChange={e => setPort(e.target.value)} />
                </label>
                <label>
                    <p>User</p>
                    <input type='text' value={user} onChange={e => setUser(e.target.value)} />
                </label>
                <label>
                    <p>DB</p>
                    <input type='text' value={db} onChange={e => setDb(e.target.value)} />
                </label>
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
