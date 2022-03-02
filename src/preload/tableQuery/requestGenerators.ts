import { GetTableRequest, QueryRequestStream } from 'protos/postgres/postgres_pb';

export const genInitializeRequest = ({
    connectionid,
    schema,
    table,
}: GetTableRequest.InitializeQuery.AsObject): GetTableRequest => {
    const initializeQuery = new GetTableRequest.InitializeQuery();
    initializeQuery.setConnectionid(connectionid);
    initializeQuery.setSchema(schema);
    initializeQuery.setTable(table);

    const getTableRequest = new GetTableRequest();
    getTableRequest.setInitialize(initializeQuery);

    return getTableRequest;
}

export const genQueryRequest = ({
    metadata,
    rows,
}: QueryRequestStream.AsObject): GetTableRequest => {
    const query = new QueryRequestStream();
    query.setMetadata(metadata);
    query.setRows(rows);

    const request = new GetTableRequest();
    request.setQuery(query);

    return request;
};
