import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

import { activeConnectionIDState } from './connection';

import { postgres } from 'renderer/client';
import { GetSchemasRequest } from 'protos/postgres/postgres_pb';

export const schemasState = selectorFamily<Set<string>, string>({
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
                res(new Set(result));
            }
        });
    }),
});

export const activeSchemasState = selector<Set<string>>({
    key: 'PostgresActiveSchemas',
    get: ({ get }) => {
        const activeConnectionID = get(activeConnectionIDState);
        if (activeConnectionID === null) {
            return new Set();
        }
        return get(schemasState(activeConnectionID));
    },
});

const userSelectedSchemaState = atom<string|null>({
    key: 'PostgresUserSelectedSchema',
    default: null,
});

export const selectedSchemaState = selector<string|null>({
    key: 'PostgresSelectedSchema',
    get: ({ get }) => {
        const activeSchemas = get(activeSchemasState);
        const userSelectedSchema = get(userSelectedSchemaState);
        if (userSelectedSchema === null) {
            if (activeSchemas.has('public')) {
                return 'public';
            }
        } else if (activeSchemas.has(userSelectedSchema)) {
            return userSelectedSchema;
        }
        return null;
    },
    set: ({ get, set }, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const activeSchemas = get(activeSchemasState);
            if (newValue === null || activeSchemas.has(newValue)) {
                set(userSelectedSchemaState, newValue);
            }
        }
    },
});
