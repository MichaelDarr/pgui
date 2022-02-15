import { FC } from 'react';
import { atom, useRecoilState } from 'recoil';

import { StringInput } from 'renderer/components/Input/StringInput';

export const databaseNameState = atom<string|null>({
    key: 'CredentialsFormDatabaseName',
    default: null,
});

export type DatabaseName = Omit<StringInput, 'onChange'|'type'|'value'>;

export const DatabaseName: FC<DatabaseName> = props => {
    const [databaseName, setDatabaseName] = useRecoilState(databaseNameState);

    return (
        <StringInput
            placeholder='Database Name'
            {...props}
            value={databaseName??''}
            onChange={newValue => {
                if (newValue === '') {
                    setDatabaseName(null);
                } else {
                    setDatabaseName(newValue);
                }
            }}
        />
    );
};
