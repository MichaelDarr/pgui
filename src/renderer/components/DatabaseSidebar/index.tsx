import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { activeConnectionState } from 'renderer/state/postgres/connection';
import { SectionProps } from 'renderer/types';

export const DatabaseSidebar: FC<SectionProps> = props => {
    const activeConnection = useRecoilValue(activeConnectionState);

    if (activeConnection === null) {
        return (
            <section {...props}>
                No active connection.
            </section>
        )
    }

    return (
        <section {...props}>
            Displaying tables for {activeConnection.name}
        </section>
    );
};
