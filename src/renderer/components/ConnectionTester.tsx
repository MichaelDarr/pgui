import { FC, useState } from 'react';

import { postgres } from '../client';
import { Credentials, TestConnectionRequest } from '../../protos/postgres/postgres_pb';

export const ConnectionTester: FC = () => {
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

    const testConnection = (): void => {
        const credentials = getCredentials();
        const arg = new TestConnectionRequest();
        arg.setCredentials(credentials);
        console.log(credentials.toObject());
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
        <div>
            <h1>Connection Tester</h1>
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
            {renderConnectionStatus()}
        </div>
    );
};
