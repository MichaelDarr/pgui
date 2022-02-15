import { FC, ChangeEventHandler } from 'react';
import { atom, useRecoilState } from 'recoil';

import { InputProps } from 'renderer/types';

export const nameState = atom<string|null>({
    key: 'CredentialsFormName',
    default: null,
});

export type Name = Omit<InputProps, 'type'|'value'>;

export const Name: FC<InputProps> = ({
    onChange,
    ...props
}) => {
    const [name, setName] = useRecoilState(nameState);

    const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
        if (onChange) {
            onChange(e);
        }
        if (e.defaultPrevented) {
            return;
        }
        if (e.target.value === '') {
            setName(null);
        } else {
            setName(e.target.value);
        }
    }

    return (
        <input
            placeholder='Connection Name'
            {...props}
            type='text'
            value={name??''}
            onChange={handleChange}
        />
    );
};
