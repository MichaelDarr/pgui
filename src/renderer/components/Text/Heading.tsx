import { CSSProperties, FC } from 'react';

import { HeadingProps } from 'renderer/types';

export interface Heading extends HeadingProps {
    size?: 'large'|'medium'|'small';
}

const headingSizeMap = {
    ['large']: '2.5rem',
    ['medium']: '2rem',
    ['small']: '1.5rem',
}

export const Heading: FC<Heading> = ({
    children,
    size = 'medium',
    style,
    ...props
}) => {
    const headingStyle: CSSProperties = Object.assign(
        {
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
