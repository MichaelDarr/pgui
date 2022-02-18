import { FC } from 'react';

import { SVGProps } from 'renderer/types';

export interface PlusIcon extends SVGProps {
    iconColor: string
    iconSize?: string|number;
}

export const PlusIcon: FC<PlusIcon> = ({
    iconColor,
    iconSize,
    style,
    ...props
}) => {
    const svgProps: SVGProps = {
        viewBox: '0 0 7 7',
        style: {
            display: 'block',
            ...style,
        },
        ...props,
    };
    if (typeof iconSize !== 'undefined') {
        Object.assign(svgProps, {
            height: iconSize,
            width: iconSize,
        });
    }

    return (
        <svg {...svgProps}>
            <polygon
                fill={iconColor}
                points='0,3 0,4 3,4 3,7 4,7 4,4 7,4 7,3 4,3 4,0 3,0 3,3'
            />
        </svg>
    );
};
