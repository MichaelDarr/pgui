import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import { palette } from 'renderer/utils/color';

export type Button = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button: FC<Button> = ({
    children,
    style,
    ...props
}) => {
    return (
        <button
            {...props}
            style={{
                background: palette.lightGray,
                border: `1px solid ${palette.gray}`,
                borderRadius: '2px',
                boxSizing: 'border-box',
                fontSize: '1rem',
                letterSpacing: '0.05em',
                padding: '6px',
                width: '100%',
                ...style,
            }}
        >
            {children}
        </button>
    );
};
