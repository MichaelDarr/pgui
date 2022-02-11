import { CSSProperties, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postgres } from '../../client';
import { DivProps } from '../../types';
import {
    Connection,
    GetConnectionRequest,
} from '../../../protos/postgres/postgres_pb';
import type { RootState } from '../../../preload/redux';

export const selectConnections = (state: RootState) => (
    state.connection.connections
);

export const selectActiveConnectionID = (state: RootState) => (
    state.connection.activeConnectionID
);

const containerStyle: CSSProperties = {
    padding: '1rem',
    backgroundColor: '#E8E8E8',
};

export const ConnectionList: FC<DivProps> = ({
    style,
    ...props
}) => {
    const dispatch = useDispatch();
    const reduxConnections = useSelector(selectConnections);
    const reduxActiveConnectionID = useSelector(selectActiveConnectionID);
    const [connections, setConnections] = useState<Connection[]>([]);

    useEffect(() => {
        console.log({ reduxConnections });
    }, [reduxConnections]);

    useEffect(() => {
        console.log({ reduxActiveConnectionID });
    }, [reduxActiveConnectionID]);

    useEffect(() => {
        const callIt = setTimeout(() => {
            console.log('dispatching!');
            dispatch({ type: 'connection/setConnectionID', payload: 'ah he booo hey' });
            dispatch({ type: 'connection/fetchConnections', payload: null });
            console.log('dispatched');
        }, 2000);
        return () => {
            clearTimeout(callIt);
        }
    }, []);

    useEffect(() => {
        const req = new GetConnectionRequest();
        postgres.getConnections(req, (_err, value) => {
            if (value) {
                setConnections(value.getConnectionsList());
            }
        });
    }, []);

    const renderConnections = (): JSX.Element => {
        if (connections.length === 0) {
            return <></>;
        }
        return (
            <ul>
                {connections.map(connection => (
                    <li key={connection.getId()}>{connection.getName()}</li>
                ))}
            </ul>
        )
    }

    const renderConnectionsNew = (): JSX.Element => {
        if (reduxConnections.length === 0) {
            return <></>;
        }
        return (
            <ul>
                {reduxConnections.map(connection => (
                    <li key={connection.id}>{connection.name} (RECOIL)</li>
                ))}
            </ul>
        )
    }

    return (
        <div {...props} style={{ ...style, ...containerStyle }}>
            <h1>Connections</h1>
            {renderConnections()}
            {renderConnectionsNew()}
        </div>
    );
};
