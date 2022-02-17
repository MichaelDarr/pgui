import { selector, selectorFamily } from 'recoil';

import { activeConnectionIDState } from './connection';

import { postgres } from 'renderer/client';
import { GetSchemasRequest } from 'protos/postgres/postgres_pb';

export const schemasState = selectorFamily<string[], string>({
    key: 'PostgresSchemas',
    get: (connectionID) => () => new Promise((res, rej) => {
        const req = new GetSchemasRequest();
        req.setConnectionid(connectionID);
        postgres.getSchemas(req, (err, value) => {
            if (err !== null) {
                rej(err);
            } else if (typeof value === 'undefined') {
                rej(new Error('value undefined in response without error'))
            } else {
                const result = value.getSchemasList()
                res(result);
            }
        })
    })
});

export const activeSchemasState = selector<string[]>({
    key: 'PostgresActiveSchemas',
    get: ({ get }) => {
        const activeConnectionID = get(activeConnectionIDState);
        if (activeConnectionID === null) {
            return [];
        }
        return get(schemasState(activeConnectionID));
    }
})
