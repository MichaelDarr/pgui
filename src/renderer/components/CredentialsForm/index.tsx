import { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { Grid, GridItem } from 'renderer/components/Grid';
import { Heading } from 'renderer/components/Text/Heading';
import { SectionProps } from 'renderer/types';

import { ConnectionName, connectionNameState } from './ConnectionName';
import { DatabaseName } from './DatabaseName';
import { Host } from './Host';
import { Password } from './Password';
import { Port } from './Port';
import { SaveConnection } from './SaveConnection';
import { TestConnection } from './TestConnection';
import { Username } from './Username';

const area = {
    buttons: 'buttons',
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
" .     .                 .                 .                 .                 .                 .     " 1rem
" .     ${area.header}    ${area.header}    ${area.header}    ${area.header}    ${area.header}    .     " auto
" .     .                 .                 .                 .                 .                 .     " 1rem
" .     ${area.connName}  ${area.connName}  ${area.connName}  .                 .                 .     " auto
" .     .                 .                 .                 .                 .                 .     " 1rem
" .     ${area.host}      ${area.host}      ${area.host}      .                 ${area.port}      .     " auto
" .     .                 .                 .                 .                 .                 .     " 1rem
" .     ${area.username}  .                 ${area.password}  ${area.password}  ${area.password}  .     " auto
" .     .                 .                 .                 .                 .                 .     " 1rem
" .     ${area.dbName}    ${area.dbName}    ${area.dbName}    ${area.dbName}    ${area.dbName}    .     " auto
" .     .                 .                 .                 .                 .                 .     " 1rem
" .     ${area.buttons}   .                 ${area.test}      ${area.test}      ${area.test}      .     " auto
" .     .                 .                 .                 .                 .                 .     " 1rem
/ 1rem  13fr              1fr               6fr               1fr               6fr               1rem  `;

export const CredentialsForm: FC<SectionProps> = props => {
    const connectionName = useRecoilValue(connectionNameState);

    const headerText = connectionName === null
        ? 'Untitled Connection'
        : connectionName

    return (
        <Grid {...props} template={gridTemplate}>
            <GridItem area={area.header}>
                <Heading size='medium'>{headerText}</Heading>
            </GridItem>
            <GridItem area={area.connName}>
                <ConnectionName />
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
