import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

import { postgres } from 'renderer/client';
import { GetSchemasRequest } from 'protos/postgres/postgres_pb';

import { connectionIDState } from './connection';

const schemasQuery = selectorFamily<Set<string>, string>({
    key: 'PostgresSchemasQuery',
    get: connectionID => () => new Promise((res, rej) => {
        const req = new GetSchemasRequest();
        req.setConnectionid(connectionID);
        postgres.getSchemas(req, (err, value) => {
            if (err !== null) {
                rej(err);
            } else if (typeof value === 'undefined') {
                rej(new Error('value undefined in response without error'))
            } else {
                res(new Set(value.getSchemasList()));
            }
        });
    }),
});

export const schemasState = selector<Set<string>>({
    key: 'PostgresSchemas',
    get: ({ get }) => {
        const connectionID = get(connectionIDState);
        if (connectionID === null) {
            return new Set();
        }
        return get(schemasQuery(connectionID));
    },
});

const userSelectedSchemaState = atom<string|null>({
    key: 'PostgresUserSelectedSchema',
    default: null,
});

export const schemaState = selector<string|null>({
    key: 'PostgresSchema',
    get: ({ get }) => {
        const schemas = get(schemasState);
        const userSelectedSchema = get(userSelectedSchemaState);
        if (userSelectedSchema === null) {
            if (schemas.has('public')) {
                return 'public';
            }
        } else if (schemas.has(userSelectedSchema)) {
            return userSelectedSchema;
        }
        return null;
    },
    set: ({ get, set }, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const schemas = get(schemasState);
            if (newValue === null || schemas.has(newValue)) {
                set(userSelectedSchemaState, newValue);
            }
        }
    },
});
