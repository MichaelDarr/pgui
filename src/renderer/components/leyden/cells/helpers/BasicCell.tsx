import { CellType } from 'leyden';
import { CellRenderer } from 'leyden-react';
import { FC } from 'react';
import { style } from 'typestyle';

import { palette } from 'renderer/common/color';
import { Grid, GridItem } from 'renderer/components/Grid';
import { SectionProps } from 'renderer/types';

export interface BasicCell extends SectionProps {
    attributes: Parameters<CellRenderer<CellType>>[0]['attributes'];
    value: string;
}

const area = {
    text: 'text',
};

const gridTemplate = `
" .       .             .    .       " 1fr
" .       .             .    .       " 0.125rem
" .       ${area.text}  .    .       " auto
" .       .             .    .       " 0.125rem
" .       .             .    .       " 1fr
/ 0.25rem  auto         1fr  0.25rem `;

const basicCellClass = style({
    alignItems: 'center',
    backgroundColor: palette.white,
    display: 'flex',
    fontSize: '0.875rem',
    height: '1.875rem',
    maxHeight: '1.875rem',
    minWidth: '100%',
    width: 'min-content',
    maxWidth: 'max(12rem, 100%)',
    overflow: 'overlay hidden',
    whiteSpace: 'nowrap',
    $nest: {
        '&::-webkit-scrollbar': {
            height: '5px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(102, 102, 102, 0.6)',
            backgroundClip: 'padding-box',
            border: '1px solid transparent',
            borderRadius: '3px',
        },
    },
});

export const BasicCell: FC<BasicCell> = ({
    attributes,
    children,
    value,
    ...props
}) => {
    return (
        <Grid
            className={basicCellClass}
            {...props}
            attributes={attributes}
            template={gridTemplate}
        >
            <GridItem area={area.text}>
                {value}
            </GridItem>
            {children}
        </Grid>
    );
};
