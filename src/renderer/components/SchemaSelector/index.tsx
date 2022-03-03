import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { palette } from 'renderer/common/color';
import { Grid, GridItem } from 'renderer/components/Grid';
import { Select } from 'renderer/components/Input/Select';
import { schemasState, schemaState } from 'renderer/state/postgres/schema';
import { SectionProps } from 'renderer/types';

const area = {
    selector: 'selector',
};

const gridTemplate = `
" .       .                 .      " 0.5rem
" .       ${area.selector}  .      " auto
" .       .                 .      " 0.5rem
/ 0.5rem  auto              0.5rem `;

export const SchemaSelector: FC<SectionProps> = ({
    style,
    ...props
}) => {
    const schemas = useRecoilValue(schemasState);
    const [schema, setSchema] = useRecoilState(schemaState);

    const sortedSchemas = [...schemas].sort((a, b) => {
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
        <Grid
            {...props}
            style={{
                ...style,
                backgroundColor: palette.white,
            }}
            template={gridTemplate}
        >
            <GridItem area={area.selector}>
                <Select
                    onChange={e => setSchema(e.target.value)}
                    value={schema??-1}
                >
                    {sortedSchemas.length === 0 && (
                        <option disabled value={-1}>No schemas detected</option>
                    )}
                    {sortedSchemas.length > 0 && schema === null && (
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
            </GridItem>
        </Grid>
    );
};
