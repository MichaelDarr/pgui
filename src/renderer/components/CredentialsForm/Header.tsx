import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { Heading } from 'renderer/components/Text/Heading';

import { colorState } from './Color';
import { connectionNameState } from './ConnectionName';

export const Header: FC<Heading> = props => {
    const color = useRecoilValue(colorState);
    const connectionName = useRecoilValue(connectionNameState);

    if (connectionName === null) {
        return (
            <Heading size='medium' {...props}>
                Untitled Connection
            </Heading>
        )
    }

    return (
        <Heading
            {...props}
            style={{
                borderBottom: `2px solid ${color}`,
                ...props.style
            }}
        >
            {connectionName}
        </Heading>
    );
};
