import { HeaderRenderer } from 'leyden-react';
import { useRecoilValue } from 'recoil';
import { style } from 'typestyle';

import { palette } from 'renderer/common/color';
import { Grid, GridItem } from 'renderer/components/Grid';
import { Paragraph } from 'renderer/components/Text';
import { tableFieldsState } from 'renderer/components/TableData';

const area = {
    name: 'name',
};

const gridTemplate = `
" .         .             .    .        " 1fr
" .         ${area.name}  .    .        " auto
" .         .             .    .        " 1fr
/ 0.375rem  auto          1fr  0.375rem `;

const columnHeaderClass = style({
    backgroundColor: palette.white,
    minWidth: '3rem',
    $nest: {
        '::before': {
            content: "''",
            position: 'absolute',
            top: 0,
            right: -1,
            bottom: -1,
            left: -1,
            boxSizing: 'border-box',
            borderLeft: `1px solid ${palette.gray}`,
            borderRight: `1px solid ${palette.gray}`,
            borderBottom: `2px solid ${palette.gray}`,
        },
    },
});

export const ColumnHeader: HeaderRenderer = ({ position }) => {
    const fields = useRecoilValue(tableFieldsState);

    if (fields === null || position >= fields.length) {
        return null;
    }

    return (
        <Grid
            className={columnHeaderClass}
            style={{ height: '1.375rem' }}
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
