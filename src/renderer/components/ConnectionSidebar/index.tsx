import { FC, Suspense } from 'react';

import { ConnectionList } from 'renderer/components/ConnectionSidebar/ConnectionList';
import { DivProps } from '../../types';

export const ConnectionSidebar: FC<DivProps> = props => {
    return (
        <Suspense fallback={<p>loading...</p>}>
            <ConnectionList {...props} />
        </Suspense>
    )
};
