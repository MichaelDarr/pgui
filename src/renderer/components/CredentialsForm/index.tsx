import { FC } from 'react';

import { Grid, GridItem } from 'renderer/components/Grid';
import { SectionProps } from 'renderer/types';

import { Color } from './Color';
import { ConnectionName } from './ConnectionName';
import { DatabaseName } from './DatabaseName';
import { Header } from './Header';
import { Host } from './Host';
import { Password } from './Password';
import { Port } from './Port';
import { SaveConnection } from './SaveConnection';
import { TestConnection } from './TestConnection';
import { Username } from './Username';

const area = {
    buttons: 'buttons',
    color: 'color',
    connName: 'connection-name',
    dbName: 'database-name',
    header: 'header',
    host: 'host',
    password: 'password',
    port: 'port',
    test: 'test-indicator',
    username: 'username',
}

const gridTemplate = `
" ${area.header}    ${area.header}    ${area.header}    ${area.header}    ${area.header}   " auto
" .                 .                 .                 .                 .                " 2rem
" ${area.connName}  ${area.connName}  ${area.connName}  .                 ${area.color}    " auto
" .                 .                 .                 .                 .                " 1.5rem
" ${area.host}      ${area.host}      ${area.host}      .                 ${area.port}     " auto
" .                 .                 .                 .                 .                " 1.5rem
" ${area.username}  .                 ${area.password}  ${area.password}  ${area.password} " auto
" .                 .                 .                 .                 .                " 1.5rem
" ${area.dbName}    ${area.dbName}    ${area.dbName}    ${area.dbName}    ${area.dbName}   " auto
" .                 .                 .                 .                 .                " 2.5rem
" ${area.buttons}   .                 ${area.test}      ${area.test}      ${area.test}     " auto
/ 13fr              1fr               6fr               1fr               6fr              `;

export const CredentialsForm: FC<SectionProps> = props => {
    return (
        <Grid {...props} template={gridTemplate}>
            <GridItem area={area.header}>
                <Header />
            </GridItem>
            <GridItem area={area.connName}>
                <ConnectionName />
            </GridItem>
            <GridItem area={area.color}>
                <Color />
            </GridItem>
            <GridItem area={area.host}>
                <Host />
            </GridItem>
            <GridItem area={area.port}>
                <Port />
            </GridItem>
            <GridItem area={area.username}>
                <Username />
            </GridItem>
            <GridItem area={area.password}>
                <Password />
            </GridItem>
            <GridItem area={area.dbName}>
                <DatabaseName />
            </GridItem>
            <GridItem area={area.buttons}>
                <SaveConnection />
            </GridItem>
            <GridItem area={area.test} style={{ textAlign: 'right' }}>
                <TestConnection />
            </GridItem>
        </Grid>
    );
};
