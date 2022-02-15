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
                borderRadius: '2px',
                boxSizing: 'border-box',
                fontSize: '1rem',
                padding: '6px',
                width: '100%',
                ...style,
            }}
            type={type}
            onChange={handleChange}
        />
    );
};
