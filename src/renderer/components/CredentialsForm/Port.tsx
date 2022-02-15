import { FC } from 'react';
import { atom, selector, useRecoilState } from 'recoil';

import { StringInput } from 'renderer/components/Input/StringInput';
import { stringIsInteger } from 'renderer/utils/regex';

const portInputState = atom<string>({
    key: 'CredentialsFormPortInput',
    default: '5432',
})

export const portState = selector<number|null>({
    key: 'CredentialsFormPortState',
    get: ({ get }) => {
        const portInput = get(portInputState);
        if (portInput === '') {
            return null;
        }
        const numericPortInput = parseInt(portInput);
        if (isNaN(numericPortInput)) {
            return null;
        }
        return numericPortInput;
    },
});

export type Port = Omit<StringInput, 'onChange'|'type'|'value'>;

export const Port: FC<Port> = props => {
    const [portInput, setPortInput] = useRecoilState(portInputState);

    return (
        <StringInput
            placeholder='Port'
            {...props}
            type='number'
            value={portInput??''}
            onChange={newValue => {
                if (newValue === '' || stringIsInteger(newValue)) {
                    setPortInput(newValue);
                }
            }}
        />
    );
};
