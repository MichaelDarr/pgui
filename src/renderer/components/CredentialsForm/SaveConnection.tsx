import { FC } from 'react';
import { selector, useRecoilCallback, useRecoilValue } from 'recoil';
import * as uuid from 'uuid';

import { Connection, SaveConnectionRequest } from 'protos/postgres/postgres_pb';
import { postgres } from 'renderer/client';
import { Button } from 'renderer/components/Input/Button';
import { activeConnectionIDState, connectionsState } from 'renderer/state/postgres/connection';

import { colorState } from './Color';
import { connectionNameState } from './ConnectionName';
import { credentialsState } from './TestConnection';

const connectionState = selector<null|Connection>({
    key: 'CredentailsFormConnection',
    get: ({ get }) => {
        const color = get(colorState);
        const credentials = get(credentialsState);
        const name = get(connectionNameState);
        if (name === null || credentials === null) {
            return null;
        }

        const connection = new Connection();
        connection.setCredentials(credentials);
        connection.setName(name);
        connection.setId(uuid.v4());
        connection.setColor(color);
        return connection;
    },
});

export const SaveConnection: FC<Button> = ({
    disabled,
    onClick,
    ...props
}) => {
    const connection = useRecoilValue(connectionState);

    const saveConnection = useRecoilCallback(({ refresh, set }) => () => {
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
            if (typeof newConnectionID !== 'undefined') {
                set(activeConnectionIDState, newConnectionID);
            }
        })
    }, [connection]);

    return (
        <Button
            {...props}
            disabled={disabled||connection===null}
            onClick={e => {
                if (onClick) {
                    onClick(e);
                }
                if (!e.defaultPrevented) {
                    saveConnection();
                }
            }}
        >
            SAVE
        </Button>
    )
};
