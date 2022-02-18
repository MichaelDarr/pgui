import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { Connect } from 'renderer/views/Connect';
import { DataBrowser } from 'renderer/views/DataBrowser';
import { connectionState } from 'renderer/state/postgres/connection';

export const Router: FC = () => {
    const activeConnection = useRecoilValue(connectionState);

    if (activeConnection === null) {
        return <Connect />;
    }

    return (
        <DataBrowser />
    )
};
