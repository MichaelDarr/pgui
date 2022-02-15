import { FC } from 'react';
import { atom, useRecoilState } from 'recoil';

import { StringInput } from 'renderer/components/Input/StringInput';

export const passwordState = atom<string|null>({
    key: 'CredentialsFormPassword',
    default: null,
});

export type Password = Omit<StringInput, 'onChange'|'type'|'value'>;

export const Password: FC<Password> = props => {
    const [password, setPassword] = useRecoilState(passwordState);

    return (
        <StringInput
            placeholder='Password'
            {...props}
            type='password'
            value={password??''}
            onChange={newValue => {
                if (newValue === '') {
                    setPassword(null);
                } else {
                    setPassword(newValue);
                }
            }}
        />
    );
};
