import { FC } from 'react';

import { SpanProps } from 'renderer/types';

export const Paragraph: FC<SpanProps> = ({
    children,
    style,
    ...props
}) => {
    return (
        <span
            {...props}
            style={{
                fontSize: '0.9rem',
                ...style
            }}
        >
            {children}
        </span>
    )
};
