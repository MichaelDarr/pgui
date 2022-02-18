import { CSSProperties, FC, MouseEventHandler, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { Connection } from 'protos/postgres/postgres_pb';
import { palette } from 'renderer/utils/color';
import { Grid, GridItem } from 'renderer/components/Grid';
import { Paragraph } from 'renderer/components/Text';
import { connectionIDState } from 'renderer/state/postgres/connection';
import { SectionProps } from 'renderer/types';

export interface ConnectionItem extends SectionProps {
    connection: Connection.AsObject;
    disabled?: boolean;
}

const area = {
    stripe: 'stripe',
    name: 'name',
    info: 'info'
};

const gridTemplate = `
" .        .               .         .             .      " 0.375rem
" .        ${area.stripe}  .         .             .      " 0.375rem
" .        ${area.stripe}  .         ${area.name}  .      " 0.875rem
" .        ${area.stripe}  .         .             .      " 0.5rem
" .        ${area.stripe}  .         ${area.info}  .      " 0.875rem
" .        ${area.stripe}  .         .             .      " 0.375rem
" .        .               .         .             .      " 0.375rem
/ 0.75rem  3px             0.75rem  1fr           0.25rem `;

export const ConnectionItem: FC<ConnectionItem> = ({
    connection,
    disabled = false,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    const setConnectionID = useSetRecoilState(connectionIDState);

    const [isHovered, setIsHovered] = useState(false);

    const credentialInfo = (() => {
        if (typeof connection.credentials === 'undefined') {
            return '';
        }
        const { db, host, port } = connection.credentials;
        return `${host}:${port} | ${db}`;
    })();

    const fullStyle = (() => {
        const baseStyle: CSSProperties = {
            cursor: 'pointer',
            userSelect: 'none',
            ...style,
        };
        if (disabled) {
            Object.assign(baseStyle, {
                cursor: 'auto',
            });
        } else if (isHovered) {
            Object.assign(baseStyle, {
                backgroundColor: palette.blue,
                color: palette.white,
            });
        }
        return baseStyle;
    })();

    const handleClick: MouseEventHandler<HTMLElement> = e => {
        if (onClick) {
            onClick(e);
        }
        if (!e.defaultPrevented) {
            setConnectionID(connection.id);
        }
    };

    const handleMouseEnter: MouseEventHandler<HTMLElement> = e => {
        if (onMouseEnter) {
            onMouseEnter(e);
        }
        if (!disabled && !e.defaultPrevented) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave: MouseEventHandler<HTMLElement> = e => {
        if (onMouseLeave) {
            onMouseLeave(e);
        }
        if (!disabled && !e.defaultPrevented) {
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
                area={area.stripe}
                style={{
                    backgroundColor: connection.color,
                    borderRadius: '3px',
                }}
            />
            <GridItem
                area={area.name}
                style={{
                    lineHeight: '0.875rem',
                }}
            >
                <Paragraph style={{
                    color: (!disabled && isHovered)
                        ? palette.white
                        : palette.darkGray,
                    fontWeight: 600,
                }}>
                    {connection.name}
                </Paragraph>
            </GridItem>
            <GridItem
                area={area.info}
                style={{
                    lineHeight: '0.875rem',
                }}
            >
                <Paragraph>{credentialInfo}</Paragraph>
            </GridItem>
        </Grid>
    );
};
