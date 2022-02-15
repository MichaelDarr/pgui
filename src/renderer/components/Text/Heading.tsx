import { CSSProperties, FC } from 'react';

import { palette } from 'renderer/utils/color';
import { HeadingProps } from 'renderer/types';

export interface Heading extends HeadingProps {
    size?: 'large'|'medium'|'small';
}

const headingSizeMap = {
    ['large']: '1.75rem',
    ['medium']: '1.5rem',
    ['small']: '1.25rem',
}

export const Heading: FC<Heading> = ({
    children,
    size = 'medium',
    style,
    ...props
}) => {
    const headingStyle: CSSProperties = Object.assign(
        {
            color: palette.blue,
            margin: 0,
            lineHeight: headingSizeMap[size],
        },
        style,
        {
            fontSize: headingSizeMap[size],
        },
    );

    return (
        <h1 {...props} style={headingStyle}>
            {children}
        </h1>
    )
}
