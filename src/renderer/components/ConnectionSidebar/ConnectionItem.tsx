import { FC, MouseEventHandler, useMemo, useState } from 'react';

import { Connection } from 'protos/postgres/postgres_pb';
import { palette } from 'renderer/utils/color';
import { Grid, GridItem } from 'renderer/components/Grid';
import { Snippet } from 'renderer/components/Text';
import { SectionProps } from 'renderer/types';

export interface ConnectionItem extends SectionProps {
    connection: Connection.AsObject;
}

const area = {
    splotch: 'splotch',
    name: 'name',
    info: 'info'
};

const gridTemplate = `
" .     .                .     .             .       " 0.75rem
" .     ${area.splotch}  .     ${area.name}  .       " 0.8rem
" .     ${area.splotch}  .     .             .       " 0.4rem
" .     ${area.splotch}  .     ${area.info}  .       " 0.8rem
" .     .                .     .             .       " 0.75rem
/ 1rem  2rem             1rem  1fr           0.25rem `;

export const ConnectionItem: FC<ConnectionItem> = ({
    connection,
    style,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    const [isHovering, setIsHovering] = useState(false);

    const fullStyle = useMemo(() => {
        const baseStyle = {
            cursor: 'pointer',
            ...style,
        };
        if (isHovering) {
            Object.assign(baseStyle, {
                backgroundColor: palette.pgBlue,
                color: palette.white,
            });
        }
        return baseStyle;
    }, [isHovering, style]);

    const handleMouseEnter: MouseEventHandler<HTMLElement> = e => {
        if (onMouseEnter) {
            onMouseEnter(e);
        }
        if (!e.defaultPrevented) {
            setIsHovering(true);
        }
    };

    const handleMouseLeave: MouseEventHandler<HTMLElement> = e => {
        if (onMouseLeave) {
            onMouseLeave(e);
        }
        if (!e.defaultPrevented) {
            setIsHovering(false);
        }
    }

    const credentialInfo = (() => {
        if (typeof connection.credentials === 'undefined') {
            return '';
        }
        const { db, host, port } = connection.credentials;
        return `${host}:${port} | ${db}`;
    })();

    return (
        <Grid
            {...props}
            style={fullStyle}
            template={gridTemplate}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <GridItem
                area={area.splotch}
                style={{
                    backgroundColor: connection.color,
                    borderRadius: '50%',
                }}
            />
            <GridItem
                area={area.name}
                style={{
                    lineHeight: '0.8rem',
                }}
            >
                <Snippet>{connection.name}</Snippet>
            </GridItem>
            <GridItem
                area={area.info}
                style={{
                    lineHeight: '0.8rem',
                }}
            >
                <Snippet>{credentialInfo}</Snippet>
            </GridItem>
        </Grid>
    );
};
