import { FC } from 'react';
import { atom, useRecoilState } from 'recoil';

import { StringInput } from 'renderer/components/Input/StringInput';

export const usernameState = atom<string|null>({
    key: 'CredentialsFormUsername',
    default: null,
});

export type Username = Omit<StringInput, 'onChange'|'type'|'value'>;

export const Username: FC<Username> = props => {
    const [username, setUsername] = useRecoilState(usernameState);

    return (
        <StringInput
            placeholder='Username'
            {...props}
            value={username??''}
            onChange={newValue => {
                if (newValue === '') {
                    setUsername(null);
                } else {
                    setUsername(newValue);
                }
            }}
        />
    );
};
