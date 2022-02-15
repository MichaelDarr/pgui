import { FC } from 'react';
import { atom, useRecoilState } from 'recoil';

import { StringInput } from 'renderer/components/Input/StringInput';


export const hostState = atom<string|null>({
    key: 'CredentialsFormHost',
    default: null,
});

export type Host = Omit<StringInput, 'onChange'|'type'|'value'>;

export const Host: FC<Host> = props => {
    const [host, setHost] = useRecoilState(hostState);

    return (
        <StringInput
            placeholder='Host'
            {...props}
            value={host??''}
            onChange={newValue => {
                if (newValue === '') {
                    setHost(null);
                } else {
                    setHost(newValue);
                }
            }}
        />
    );
};
