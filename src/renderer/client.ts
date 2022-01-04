import type { PostgresServiceClientSource } from '../@types/protobridge';
import { ConnectResponse } from '../protos/postgres/postgres_pb';

export const postgres: PostgresServiceClientSource = {
    connect: (argument, callback) => window.electron.proto.postgres.connect(
        argument.serializeBinary(),
        (err, value) => {
            const deserializedValue = value === undefined
                ? undefined
                : ConnectResponse.deserializeBinary(value);
            callback(err, deserializedValue);
        }
    )
}
