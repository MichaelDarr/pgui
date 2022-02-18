import { FC, MouseEventHandler } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { connectionsState } from 'renderer/state/postgres/connection';
import { SectionProps } from 'renderer/types';

import { ConnectionItem, connectionIDWithActionsState } from './ConnectionItem';

export const ConnectionList: FC<SectionProps> = ({
    onMouseLeave,
    style,
    ...props
}) => {
    const setConnectionIDWithActions = useSetRecoilState(connectionIDWithActionsState);
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

    const handleMouseLeave: MouseEventHandler<HTMLElement> = e => {
        if (onMouseLeave) {
            onMouseLeave(e);
        }
        if (!e.defaultPrevented) {
            setConnectionIDWithActions(null);
        }
    }

    return (
        <section
            {...props}
            onMouseLeave={handleMouseLeave}
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
