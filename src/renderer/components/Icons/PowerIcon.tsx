import { FC } from 'react';

import { SVGProps } from 'renderer/types';

export interface PowerIcon extends SVGProps {
    iconColor: string;
    iconSize?: string|number;
}

export const PowerIcon: FC<PowerIcon> = ({
    iconColor,
    iconSize,
    style,
    ...props
}) => {
    const svgProps: SVGProps = {
        viewBox: '0 0 24 24',
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
            <path
                fill='transparent'
                stroke={iconColor}
                strokeWidth={2}
                strokeLinecap='round'
                d='
                    M 8,6
                    A 8 8 0 0 0 12,21
                    A 8 8 0 0 0 16,6
                    M 12,12
                    L 12,3'
            />
        </svg>
    );
};
