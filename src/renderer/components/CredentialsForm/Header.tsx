import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { Heading } from 'renderer/components/Text/Heading';

import { connectionNameState } from './ConnectionName';

export const Header: FC<Heading> = props => {
    const connectionName = useRecoilValue(connectionNameState);

    if (connectionName === null) {
        return (
            <Heading size='medium' {...props}>
                Untitled Connection
            </Heading>
        )
    }

    return (
        <Heading {...props}>
            {connectionName}
        </Heading>
    );
};
