import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { connectionsState } from '../../state/postgres/connection';
import { DivProps } from '../../types';

export const ConnectionList: FC<DivProps> = (props) => {
    const connections = useRecoilValue(connectionsState);

    const renderConnections = (): JSX.Element => {
        if (connections.length === 0) {
            return <></>;
        }
        return (
            <ul>
                {connections.map(connection => (
                    <li key={connection.id}>{connection.name}</li>
                ))}
            </ul>
        )
    }

    return (
        <div {...props}>
            {renderConnections()}
        </div>
    );
};
