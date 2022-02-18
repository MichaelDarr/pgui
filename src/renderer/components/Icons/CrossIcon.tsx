import { FC } from 'react';

import { SVGProps } from 'renderer/types';

import { PlusIcon } from './PlusIcon';

export interface CrossIcon extends SVGProps {
    iconColor: string
    iconSize?: string|number;
}

export const CrossIcon: FC<CrossIcon> = ({
    style,
    ...props
}) => {

    return (
        <PlusIcon
            {...props}
            style={{
                ...style,
                transform: 'rotate(45deg)',
                transformOrigin: 'center',
            }}
        />
    );
};
