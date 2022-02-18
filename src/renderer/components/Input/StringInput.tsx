import { ChangeEventHandler, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import { palette } from 'renderer/utils/color';

export interface StringInput extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'|'onChange'> {
    value: string;
    type?: 'number'|'password'|'text';
    onChange?: (value: string) => void;
}

export const StringInput: FC<StringInput> = ({
    onChange,
    style,
    type = 'text',
    ...props
}) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        if (!e.defaultPrevented && onChange) {
            onChange(e.target.value);
        }
    }

    return (
        <input
            {...props}
            style={{
                border: `1px solid ${palette.gray}`,
                borderRadius: '0.25rem',
                boxSizing: 'border-box',
                color: palette.darkGray,
                fontSize: '0.95rem',
                padding: '0.375rem',
                width: '100%',
                ...style,
            }}
            type={type}
            onChange={handleChange}
        />
    );
};
