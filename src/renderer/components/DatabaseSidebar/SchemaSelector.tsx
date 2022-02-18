import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Select } from 'renderer/components/Input/Select';
import { activeSchemasState, selectedSchemaState } from 'renderer/state/postgres/schema';
import { SectionProps } from 'renderer/types';

export const SchemaSelector: FC<SectionProps> = props => {
    const activeSchemas = useRecoilValue(activeSchemasState);
    const [selectedSchema, setSelectedSchema] = useRecoilState(selectedSchemaState);

    const sortedSchemas = [...activeSchemas].sort((a, b) => {
        if (a === 'public') {
            return -1;
        }
        if (b === 'public') {
            return 1;
        }
        const nameA = a.toUpperCase();
        const nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return (
        <section {...props}>
            <Select
                onChange={e => setSelectedSchema(e.target.value)}
                value={selectedSchema??-1}
            >
                {sortedSchemas.length === 0 && (
                    <option disabled value={-1}>No schemas detected</option>
                )}
                {sortedSchemas.length > 0 && selectedSchema === null && (
                    <option disabled value={-1}>Select a schema</option>
                )}
                {sortedSchemas.map(schema => (
                    <option
                        key={schema}
                        value={schema}
                    >
                        {schema}
                    </option>
                ))}
            </Select>
        </section>
    );
};
