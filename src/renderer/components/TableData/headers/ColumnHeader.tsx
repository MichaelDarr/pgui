/* eslint-disable react/prop-types */
import { HeaderRenderer } from 'leyden-react';
import { useRecoilValue } from 'recoil';

import { Grid, GridItem } from 'renderer/components/Grid';
import { Paragraph } from 'renderer/components/Text';
import { palette } from 'renderer/utils/color';
import { tableFieldsState } from 'renderer/components/TableData';

const area = {
    name: 'name',
};

const gridTemplate = `
" .         .             .        " 0.25rem
" .         ${area.name}  .        " auto
" .         .             .        " 0.25rem
/ 0.375rem  auto          0.375rem `;

export const ColumnHeader: HeaderRenderer = ({ position }) => {
    const fields = useRecoilValue(tableFieldsState);

    if (fields === null || position >= fields.length) {
        return null;
    }

    return (
        <Grid
            style={{
                backgroundColor: palette.white,
            }}
            template={gridTemplate}
        >
            <GridItem area={area.name}>
                <Paragraph style={{
                    color: palette.darkGray,
                    fontWeight: 600,
                }}>
                    {fields[position].name}
                </Paragraph>
            </GridItem>
        </Grid>
    );
};
