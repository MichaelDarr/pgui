import { FC } from 'react';

import { SVGProps } from 'renderer/types';

export interface TableIcon extends SVGProps {
    iconColor: string
}

export const TableIcon: FC<TableIcon> = ({
    iconColor,
    style,
    ...props
}) => {
    return (
        <svg
            viewBox='0 0 14 14'
            style={{
                display: 'block',
                ...style,
            }}
            {...props}
        >
            <rect x={0} y={0} width={14} height={4} fill={iconColor} />
            <rect x={0} y={5} width={4} height={4} fill={iconColor} />
            <rect x={5} y={5} width={4} height={4} fill={iconColor} />
            <rect x={10} y={5} width={4} height={4} fill={iconColor} />
            <rect x={0} y={10} width={4} height={4} fill={iconColor} />
            <rect x={5} y={10} width={4} height={4} fill={iconColor} />
            <rect x={10} y={10} width={4} height={4} fill={iconColor} />
        </svg>
    );
};
