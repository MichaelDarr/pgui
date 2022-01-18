import { CSSProperties, FC, useState } from 'react';
import * as uuid from 'uuid';

import { postgres } from '../../client';
import { DivProps } from '../../types';
import { randomColorHex } from '../../utils/color';
import {
    Credentials,
    Connection,
    SaveConnectionRequest,
    TestConnectionRequest,
} from '../../../protos/postgres/postgres_pb';

const containerStyle: CSSProperties = {
    padding: '1rem',
    backgroundColor: '#FFFFFF',
};

export const CredentialsForm: FC<DivProps> = ({
    style,
    ...props
}) => {
    const [name, setName] = useState<string>('CoolConnection');
    const [host, setHost] = useState<string>('localhost');
    const [port, setPort] = useState<string>('5432');
    const [user, setUser] = useState<string>('postgres');
    const [db, setDb] = useState<string>('pg');
    const [password, setPassword] = useState<string>('pass');

    const [success, setSuccess] = useState<boolean|null>(null);

    const getCredentials = (): Credentials => {
        const credentials = new Credentials();
        credentials.setHost(host);
        credentials.setPort(Number(port));
        credentials.setUser(user);
        credentials.setDb(db);
        credentials.setPassword(password);
        return credentials;
    }

    const getConnection = (): Connection => {
        const connection = new Connection();
        const credentials = getCredentials();
        connection.setCredentials(credentials);
        connection.setId(uuid.v4());
        connection.setName(name);
        connection.setColor(randomColorHex());
        return connection;
    }

    const testConnection = (): void => {
        const credentials = getCredentials();
        const arg = new TestConnectionRequest();
        arg.setCredentials(credentials);
        postgres.testConnection(arg, (err, value) => {
            if (err) {
                console.warn(err)
            } else if (!value) {
                console.warn(new Error('unexpected nullish value'));
            } else {
                setSuccess(value.getSuccess());
            }
        });
    };

    const saveConnection = (): void => {
        const connection = getConnection();
        const arg = new SaveConnectionRequest();
        arg.setConnection(connection);
        postgres.saveConnection(arg, (err, value) => {
            if (err) {
                console.warn(err)
            } else if (!value) {
                console.warn(new Error('unexpected nullish value'));
            } else {
                console.log(value.getConnection());
            }
        })
    }

    const renderConnectionStatus = (): JSX.Element => {
        if (success === null) {
            return <p>untested connection</p>;
        }
        if (!success) {
            return <p>connection failed</p>
        }
        return <p>connection successful!</p>
    }

    return (
        <div {...props} style={{ ...style, ...containerStyle }}>
            <h1>New Connection</h1>
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
            <hr />
            <button onClick={testConnection}>Test Connection</button>
            <button onClick={saveConnection}>Save Connection</button>
            {renderConnectionStatus()}
        </div>
    );
};
