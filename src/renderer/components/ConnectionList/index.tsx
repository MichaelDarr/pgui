import { CSSProperties, FC, useEffect, useState } from 'react';

import { postgres } from '../../client';
import { DivProps } from '../../types';
import {
    Connection,
    GetConnectionRequest,
} from '../../../protos/postgres/postgres_pb';

const containerStyle: CSSProperties = {
    padding: '1rem',
    backgroundColor: '#E8E8E8',
};

export const ConnectionList: FC<DivProps> = ({
    style,
    ...props
}) => {
    const [connections, setConnections] = useState<Connection[]>([]);

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

    return (
        <div {...props} style={{ ...style, ...containerStyle }}>
            <h1>Connections</h1>
            {renderConnections()}
        </div>
    );
};
