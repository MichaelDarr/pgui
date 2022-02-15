import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

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
                width: '100%',
                boxSizing: 'border-box',
                ...style,
            }}
        >
            {children}
        </button>
    );
};
