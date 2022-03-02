import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';

import { Grid, GridItem } from 'renderer/components/Grid';
import { PowerIcon } from 'renderer/components/Icons/PowerIcon';
import { Paragraph } from 'renderer/components/Text';
import { connectionState } from 'renderer/state/postgres/connection';
import { SectionProps } from 'renderer/types';
import { palette } from 'renderer/utils/color';

const area = {
    info: 'info',
    name: 'name',
    power: 'power',
    stripe: 'stripe',
};

const gridTemplate = `
" .         .              .         ${area.stripe}  .         .             .       " 0.375rem
" .         ${area.power}  .         ${area.stripe}  .         ${area.name}  .       " 0.875rem
" .         ${area.power}  .         ${area.stripe}  .         .             .       " 0.5rem
" .         ${area.power}  .         ${area.stripe}  .         ${area.info}  .       " 0.875rem
" .         .              .         ${area.stripe}  .         .             .       " 0.375rem
/ 0.375rem  2.25rem        0.375rem  3px             0.375rem  1fr           0.25rem `;

export const Connection: FC<SectionProps> = props => {
    const [powerHovered, setPowerHovered] = useState(false);

    const [connection, setConnection] = useRecoilState(connectionState);

    if (connection === null) {
        return null;
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
            template={gridTemplate}
        >
            <GridItem
                area={area.power}
                style={{
                    alignItems: 'center',
                    background: powerHovered ? palette.lightGray : 'transparent',
                    border: `1px solid ${palette.gray}`,
                    borderRadius: '0.25rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                onClick={() => setConnection(null)}
                onMouseEnter={e => {
                    if (!e.defaultPrevented) {
                        setPowerHovered(true);
                    }
                }}
                onMouseLeave={e => {
                    if (!e.defaultPrevented) {
                        setPowerHovered(false);
                    }
                }}
            >
                <PowerIcon
                    iconColor={powerHovered ? palette.maroon : palette.darkGray}
                    iconSize='1.625rem'
                />
            </GridItem>
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
                    color: palette.darkGray,
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
