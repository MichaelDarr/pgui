import { FC, MouseEventHandler, useState } from 'react';
import { atom, useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';

import { Connection, DeleteConnectionRequest } from 'protos/postgres/postgres_pb';
import { postgres } from 'renderer/client';
import { Grid, GridItem } from 'renderer/components/Grid';
import { CrossIcon } from 'renderer/components/Icons/CrossIcon';
import { Paragraph } from 'renderer/components/Text';
import { connectionIDState, connectionsState } from 'renderer/state/postgres/connection';
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/common/color';

export interface ConnectionItem extends SectionProps {
    connection: Connection.AsObject;
}

const area = {
    delete: 'delete',
    info: 'info',
    name: 'name',
    stripe: 'stripe',
};

const gridTemplate = `
" .        .               .        .             .       " 0.375rem
" .        ${area.stripe}  .        .             .       " 0.375rem
" .        ${area.stripe}  .        ${area.name}  .       " 0.875rem
" .        ${area.stripe}  .        .             .       " 0.5rem
" .        ${area.stripe}  .        ${area.info}  .       " 0.875rem
" .        ${area.stripe}  .        .             .       " 0.375rem
" .        .               .        .             .       " 0.375rem
/ 0.75rem  3px             0.75rem  1fr           0.25rem `;

const gridTemplateWithActions = `
" .        .               .        .               .        .             .       " 0.375rem
" .        .               .        ${area.stripe}  .        .             .       " 0.375rem
" .        ${area.delete}  .        ${area.stripe}  .        ${area.name}  .       " 0.875rem
" .        ${area.delete}  .        ${area.stripe}  .        .             .       " 0.5rem
" .        ${area.delete}  .        ${area.stripe}  .        ${area.info}  .       " 0.875rem
" .        .               .        ${area.stripe}  .        .             .       " 0.375rem
" .        .               .        .               .        .             .       " 0.375rem
/ 0.75rem  2.25rem         0.75rem  3px             0.75rem  1fr           0.25rem `;

export const connectionIDWithActionsState = atom<string|null>({
    key: 'connectionWithActionsState',
    default: null,
})

export const ConnectionItem: FC<ConnectionItem> = ({
    connection,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    const setConnectionID = useSetRecoilState(connectionIDState);
    const [connectionIDWithActions, setConnectionIDWithActions] = useRecoilState(connectionIDWithActionsState);

    const [deleteIsHovered, setDeleteIsHovered] = useState(false);
    const [isBeingDeleted, setIsBeingDeleted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [failedToConnect, setFailedToConnect] = useState(false);

    const hasActions = connectionIDWithActions === connection.id;

    const fullStyle = (() => {
        const baseStyle = {
            cursor: 'pointer',
            ...style,
        };
        if (isHovered) {
            Object.assign(baseStyle, {
                backgroundColor: palette.blue,
                color: palette.white,
            });
        }
        return baseStyle;
    })();

    const deleteConnection = useRecoilCallback(({ refresh }) => () => {
        const req = new DeleteConnectionRequest();
        req.setConnectionid(connection.id);
        postgres.deleteConnection(req, err => {
            if (err !== null) {
                throw err;
            }
            refresh(connectionsState);
        })
    }, [connection.id])

    const handleClick: MouseEventHandler<HTMLElement> = e => {
        if (onClick) {
            onClick(e);
        }
        if (!e.defaultPrevented) {
            setFailedToConnect(false);
            setConnectionID(connection.id);
        }
    };

    const handleContextMenu: MouseEventHandler<HTMLElement> = e => {
        if (!e.defaultPrevented) {
            e.preventDefault();
            setConnectionIDWithActions(connection.id);
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

    const credentialInfo = (() => {
        if (typeof connection.credentials === 'undefined') {
            return '';
        }
        const { db, host, port } = connection.credentials;
        return `${host}:${port} | ${db}`;
    })();

    if (isBeingDeleted) {
        return null;
    }

    return (
        <Grid
            {...props}
            style={fullStyle}
            template={hasActions ? gridTemplateWithActions : gridTemplate}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleContextMenu}
        >
            {hasActions && <GridItem
                area={area.delete}
                style={{
                    alignItems: 'center',
                    background: deleteIsHovered ? palette.lightGray : palette.white,
                    border: `1px solid ${palette.gray}`,
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                onClick={e => {
                    if (!e.defaultPrevented) {
                        e.preventDefault();
                        setIsBeingDeleted(true);
                        setConnectionIDWithActions(null);
                        deleteConnection();
                    }
                }}
                onMouseEnter={e => {
                    if (!e.defaultPrevented) {
                        setDeleteIsHovered(true);
                    }
                }}
                onMouseLeave={e => {
                    if (!e.defaultPrevented) {
                        setDeleteIsHovered(false);
                    }
                }}
            >
                <CrossIcon
                    iconColor={palette.maroon}
                    iconSize='1.625rem'
                />
            </GridItem>}
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
                    color: isHovered ? palette.white : palette.darkGray,
                    fontWeight: 600,
                }}>
                    {connection.name}
                    {failedToConnect && (
                        ' (connection failed)'
                    )}
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
