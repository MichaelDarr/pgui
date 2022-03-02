import { useRecoilState } from 'recoil';
import { FC, MouseEventHandler, useState } from 'react';

import { Table } from 'protos/postgres/postgres_pb';
import { palette } from 'renderer/utils/color';
import { Grid, GridItem } from 'renderer/components/Grid';
import { TableIcon } from 'renderer/components/Icons/TableIcon';
import { Paragraph } from 'renderer/components/Text';
import { tableState } from 'renderer/state/postgres/table';
import { SectionProps } from 'renderer/types';

export interface TableItem extends SectionProps {
    table: Table.AsObject;
}

const area = {
    icon: 'icon',
    name: 'name',
};

const gridTemplate = `
" .        .               .         .             .       " 0.5rem
" .        ${area.icon}    .         ${area.name}  .       " 0.875rem
" .        .               .         .             .       " 0.5rem
/ 0.75rem  0.875rem        0.75rem  1fr            0.25rem `;

export const TableItem: FC<TableItem> = ({
    table,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    const [selectedTable, setTable] = useRecoilState(tableState);

    const [isHovered, setIsHovered] = useState(false);

    const isSelected = selectedTable?.name === table.name;

    const fullStyle = (() => {
        const baseStyle = {
            color: palette.black,
            cursor: 'pointer',
            ...style,
        };
        if (isSelected) {
            Object.assign(baseStyle, {
                backgroundColor: palette.blue,
                color: palette.white,
            });
        } else if (isHovered) {
            Object.assign(baseStyle, {
                backgroundColor: palette.lightGray,
                color: palette.maroon,
            });
        }
        return baseStyle;
    })();

    const handleClick: MouseEventHandler<HTMLElement> = e => {
        if (onClick) {
            onClick(e);
        }
        if (!e.defaultPrevented) {
            setTable(table);
        }
    };

    const handleMouseEnter: MouseEventHandler<HTMLElement> = e => {
        if (onMouseEnter) {
            onMouseEnter(e);
        }
        if (!e.defaultPrevented) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave: MouseEventHandler<HTMLElement> = e => {
        if (onMouseLeave) {
            onMouseLeave(e);
        }
        if (!e.defaultPrevented) {
            setIsHovered(false);
        }
    };

    return (
        <Grid
            {...props}
            style={fullStyle}
            template={gridTemplate}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <GridItem
                area={area.icon}
            >
                <TableIcon
                    iconColor={isSelected ? palette.lightGray : palette.blue}
                />
            </GridItem>
            <GridItem
                area={area.name}
                style={{
                    lineHeight: '0.75rem',
                }}
            >
                <Paragraph>
                    {table.name}
                </Paragraph>
            </GridItem>
        </Grid>
    );
};
