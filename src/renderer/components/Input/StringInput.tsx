import { ChangeEventHandler, FC } from 'react';

import { InputProps } from 'renderer/types';

export interface StringInput extends Omit<InputProps, 'type'|'onChange'> {
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
                width: '100%',
                boxSizing: 'border-box',
                ...style,
            }}
            type={type}
            onChange={handleChange}
        />
    );
};
