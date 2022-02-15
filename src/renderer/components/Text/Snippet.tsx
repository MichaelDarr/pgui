import { FC } from 'react';

import { SpanProps } from 'renderer/types';

export const Snippet: FC<SpanProps> = ({
    children,
    style,
    ...props
}) => {
    return (
        <span
            {...props}
            style={{
                fontSize: '0.8rem',
                letterSpacing: '0.03em',
                ...style
            }}
        >
            {children}
        </span>
    )
};
