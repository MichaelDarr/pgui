import { FC } from 'react';
import { atom, useRecoilState } from 'recoil';

import { StringInput } from 'renderer/components/Input/StringInput';

export const connectionNameState = atom<string|null>({
    key: 'CredentialsFormConnectionName',
    default: null,
});

export type ConnectionName = Omit<StringInput, 'onChange'|'type'|'value'>;

export const ConnectionName: FC<ConnectionName> = props => {
    const [connectionName, setConnectionName] = useRecoilState(connectionNameState);

    return (
        <StringInput
            placeholder='Connection Name'
            {...props}
            value={connectionName??''}
            onChange={newValue => {
                if (newValue === '') {
                    setConnectionName(null);
                } else {
                    setConnectionName(newValue);
                }
            }}
        />
    );
};
