import { FC, useEffect, useState } from 'react';
import { selector, useRecoilValue } from 'recoil';

import { Credentials, TestConnectionRequest } from 'protos/postgres/postgres_pb';
import { postgres } from 'renderer/client';
import { Button } from 'renderer/components/Input/Button';
import { SpanProps } from 'renderer/types';

import { databaseNameState } from './DatabaseName';
import { hostState } from './Host';
import { passwordState } from './Password';
import { portState } from './Port';
import { usernameState } from './Username';

export const credentialsState = selector<Credentials|null>({
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

export const TestConnection: FC<SpanProps> = props => {
    const credentials = useRecoilValue(credentialsState);

    const [testResult, setTestResult] = useState<null|TestResult>(null);

    useEffect(() => {
        setTestResult(null);
    }, [credentials]);

    const refreshTestResult = () => {
        if (credentials === null) {
            setTestResult(null);
            return;
        }
        setTestResult({ result: 'loading'});
        const arg = new TestConnectionRequest();
        arg.setCredentials(credentials);
        postgres.testConnection(arg, (err, value) => {
            if (err) {
                setTestResult({ result: 'error', message: String(err) });
            } else if (!value) {
                setTestResult({ result: 'error', message: String('no response from driver') });
            } else {
                setTestResult({ result: value.getSuccess() ? 'success' : 'failure' });
            }
        });
    };

    const renderTestConnectionButton = () => (
        <Button
            disabled={credentials === null}
            onClick={refreshTestResult}
        >
            TEST
        </Button>
    );

    return (
        <span {...props}>
            {testResult === null
                ? renderTestConnectionButton()
                : <TestConnectionResult {...testResult} />
            }
        </span>
    )
};

interface TestResult {
    result: 'error'|'failure'|'loading'|'success';
    message?: string;
}

const TestConnectionResult: FC<TestResult> = ({
    result,
    message,
}) => {
    switch (result) {
        case 'error':
            return (
                <span style={{ color: 'red' }}>
                    Internal Error: {message}
                </span>
            );
        case 'failure':
            return (
                <span style={{ color: 'red' }}>
                    Connection Failed: {message}
                </span>
            );
        case 'loading':
            return (
                <span>
                    Testing...
                </span>
            );
        case 'success':
            return (
                <span style={{ color: 'green' }}>
                    Connection Successful
                </span>
            );
    }
};
