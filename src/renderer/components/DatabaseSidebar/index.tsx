import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { activeSchemasState } from 'renderer/state/postgres/schema';
import { SectionProps } from 'renderer/types';

export const DatabaseSidebar: FC<SectionProps> = props => {
    const activeSchemas = useRecoilValue(activeSchemasState);

    return (
        <section {...props}>
            {activeSchemas.join(', ')}
        </section>
    );
};
