import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { connectionsState } from 'renderer/state/postgres/connection';
import { SectionProps } from 'renderer/types';

import { ConnectionItem } from './ConnectionItem';

export const ConnectionList: FC<SectionProps> = ({
    style,
    ...props
}) => {
    const connections = useRecoilValue(connectionsState);

    if (connections.size === 0) {
        return <section style={style} {...props} />;
    }

    const sortedConnections = [...connections.values()].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return (
        <section
            {...props}
            style={{
                ...style,
                alignItems: 'stretch',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {sortedConnections.map(connection => (
                <ConnectionItem
                    key={connection.id}
                    connection={connection}
                />
            ))}
        </section>
    );
};
