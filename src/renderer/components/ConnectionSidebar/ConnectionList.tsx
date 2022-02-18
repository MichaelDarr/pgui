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

    if (connections.length === 0) {
        return <div style={style} {...props} />;
    }

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
            {connections.map(connection => (
                <ConnectionItem
                    key={connection.id}
                    connection={connection}
                />
            ))}
        </section>
    );
};
