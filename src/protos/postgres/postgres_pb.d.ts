// package: postgres
// file: protos/postgres/postgres.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class Connection extends jspb.Message {
  hasCredentials(): boolean;
  clearCredentials(): void;
  getCredentials(): Credentials | undefined;
  setCredentials(value?: Credentials): void;

  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getColor(): string;
  setColor(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Connection.AsObject;
  static toObject(includeInstance: boolean, msg: Connection): Connection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Connection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Connection;
  static deserializeBinaryFromReader(message: Connection, reader: jspb.BinaryReader): Connection;
}

export namespace Connection {
  export type AsObject = {
    credentials?: Credentials.AsObject,
    id: string,
    name: string,
    color: string,
  }
}

export class Credentials extends jspb.Message {
  getHost(): string;
  setHost(value: string): void;

  getPort(): number;
  setPort(value: number): void;

  getUser(): string;
  setUser(value: string): void;

  getDb(): string;
  setDb(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Credentials.AsObject;
  static toObject(includeInstance: boolean, msg: Credentials): Credentials.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Credentials, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Credentials;
  static deserializeBinaryFromReader(message: Credentials, reader: jspb.BinaryReader): Credentials;
}

export namespace Credentials {
  export type AsObject = {
    host: string,
    port: number,
    user: string,
    db: string,
    password: string,
  }
}

export class Field extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getTableoid(): number;
  setTableoid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Field.AsObject;
  static toObject(includeInstance: boolean, msg: Field): Field.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Field, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Field;
  static deserializeBinaryFromReader(message: Field, reader: jspb.BinaryReader): Field;
}

export namespace Field {
  export type AsObject = {
    name: string,
    tableoid: number,
  }
}

export class QueryRequestStream extends jspb.Message {
  getRows(): number;
  setRows(value: number): void;

  getMetadata(): boolean;
  setMetadata(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryRequestStream.AsObject;
  static toObject(includeInstance: boolean, msg: QueryRequestStream): QueryRequestStream.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryRequestStream, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryRequestStream;
  static deserializeBinaryFromReader(message: QueryRequestStream, reader: jspb.BinaryReader): QueryRequestStream;
}

export namespace QueryRequestStream {
  export type AsObject = {
    rows: number,
    metadata: boolean,
  }
}

export class QueryResultStream extends jspb.Message {
  hasMetadata(): boolean;
  clearMetadata(): void;
  getMetadata(): QueryResultStream.MetadataResult | undefined;
  setMetadata(value?: QueryResultStream.MetadataResult): void;

  hasRow(): boolean;
  clearRow(): void;
  getRow(): QueryResultStream.RowResult | undefined;
  setRow(value?: QueryResultStream.RowResult): void;

  getDataCase(): QueryResultStream.DataCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryResultStream.AsObject;
  static toObject(includeInstance: boolean, msg: QueryResultStream): QueryResultStream.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryResultStream, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryResultStream;
  static deserializeBinaryFromReader(message: QueryResultStream, reader: jspb.BinaryReader): QueryResultStream;
}

export namespace QueryResultStream {
  export type AsObject = {
    metadata?: QueryResultStream.MetadataResult.AsObject,
    row?: QueryResultStream.RowResult.AsObject,
  }

  export class MetadataResult extends jspb.Message {
    clearFieldsList(): void;
    getFieldsList(): Array<Field>;
    setFieldsList(value: Array<Field>): void;
    addFields(value?: Field, index?: number): Field;

    getRowsread(): number;
    setRowsread(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MetadataResult.AsObject;
    static toObject(includeInstance: boolean, msg: MetadataResult): MetadataResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MetadataResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MetadataResult;
    static deserializeBinaryFromReader(message: MetadataResult, reader: jspb.BinaryReader): MetadataResult;
  }

  export namespace MetadataResult {
    export type AsObject = {
      fieldsList: Array<Field.AsObject>,
      rowsread: number,
    }
  }

  export class RowResult extends jspb.Message {
    clearValuesList(): void;
    getValuesList(): Array<google_protobuf_any_pb.Any>;
    setValuesList(value: Array<google_protobuf_any_pb.Any>): void;
    addValues(value?: google_protobuf_any_pb.Any, index?: number): google_protobuf_any_pb.Any;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RowResult.AsObject;
    static toObject(includeInstance: boolean, msg: RowResult): RowResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RowResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RowResult;
    static deserializeBinaryFromReader(message: RowResult, reader: jspb.BinaryReader): RowResult;
  }

  export namespace RowResult {
    export type AsObject = {
      valuesList: Array<google_protobuf_any_pb.Any.AsObject>,
    }
  }

  export enum DataCase {
    DATA_NOT_SET = 0,
    METADATA = 1,
    ROW = 2,
  }
}

export class Table extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getSchema(): string;
  setSchema(value: string): void;

  getOwner(): string;
  setOwner(value: string): void;

  getHasindexes(): boolean;
  setHasindexes(value: boolean): void;

  getHasrules(): boolean;
  setHasrules(value: boolean): void;

  getHastriggers(): boolean;
  setHastriggers(value: boolean): void;

  getHasrowsecurityenabled(): boolean;
  setHasrowsecurityenabled(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Table.AsObject;
  static toObject(includeInstance: boolean, msg: Table): Table.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Table, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Table;
  static deserializeBinaryFromReader(message: Table, reader: jspb.BinaryReader): Table;
}

export namespace Table {
  export type AsObject = {
    name: string,
    schema: string,
    owner: string,
    hasindexes: boolean,
    hasrules: boolean,
    hastriggers: boolean,
    hasrowsecurityenabled: boolean,
  }
}

export class DeleteConnectionRequest extends jspb.Message {
  getConnectionid(): string;
  setConnectionid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteConnectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteConnectionRequest): DeleteConnectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteConnectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteConnectionRequest;
  static deserializeBinaryFromReader(message: DeleteConnectionRequest, reader: jspb.BinaryReader): DeleteConnectionRequest;
}

export namespace DeleteConnectionRequest {
  export type AsObject = {
    connectionid: string,
  }
}

export class DeleteConnectionResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteConnectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteConnectionResponse): DeleteConnectionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteConnectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteConnectionResponse;
  static deserializeBinaryFromReader(message: DeleteConnectionResponse, reader: jspb.BinaryReader): DeleteConnectionResponse;
}

export namespace DeleteConnectionResponse {
  export type AsObject = {
  }
}

export class GetConnectionsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetConnectionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetConnectionsRequest): GetConnectionsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetConnectionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetConnectionsRequest;
  static deserializeBinaryFromReader(message: GetConnectionsRequest, reader: jspb.BinaryReader): GetConnectionsRequest;
}

export namespace GetConnectionsRequest {
  export type AsObject = {
  }
}

export class GetConnectionsResponse extends jspb.Message {
  clearConnectionsList(): void;
  getConnectionsList(): Array<Connection>;
  setConnectionsList(value: Array<Connection>): void;
  addConnections(value?: Connection, index?: number): Connection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetConnectionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetConnectionsResponse): GetConnectionsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetConnectionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetConnectionsResponse;
  static deserializeBinaryFromReader(message: GetConnectionsResponse, reader: jspb.BinaryReader): GetConnectionsResponse;
}

export namespace GetConnectionsResponse {
  export type AsObject = {
    connectionsList: Array<Connection.AsObject>,
  }
}

export class GetSchemasRequest extends jspb.Message {
  getConnectionid(): string;
  setConnectionid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSchemasRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSchemasRequest): GetSchemasRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSchemasRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSchemasRequest;
  static deserializeBinaryFromReader(message: GetSchemasRequest, reader: jspb.BinaryReader): GetSchemasRequest;
}

export namespace GetSchemasRequest {
  export type AsObject = {
    connectionid: string,
  }
}

export class GetSchemasResponse extends jspb.Message {
  clearSchemasList(): void;
  getSchemasList(): Array<string>;
  setSchemasList(value: Array<string>): void;
  addSchemas(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSchemasResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSchemasResponse): GetSchemasResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSchemasResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSchemasResponse;
  static deserializeBinaryFromReader(message: GetSchemasResponse, reader: jspb.BinaryReader): GetSchemasResponse;
}

export namespace GetSchemasResponse {
  export type AsObject = {
    schemasList: Array<string>,
  }
}

export class GetSchemaTablesRequest extends jspb.Message {
  getConnectionid(): string;
  setConnectionid(value: string): void;

  getSchema(): string;
  setSchema(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSchemaTablesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSchemaTablesRequest): GetSchemaTablesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSchemaTablesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSchemaTablesRequest;
  static deserializeBinaryFromReader(message: GetSchemaTablesRequest, reader: jspb.BinaryReader): GetSchemaTablesRequest;
}

export namespace GetSchemaTablesRequest {
  export type AsObject = {
    connectionid: string,
    schema: string,
  }
}

export class GetSchemaTablesResponse extends jspb.Message {
  clearTablesList(): void;
  getTablesList(): Array<Table>;
  setTablesList(value: Array<Table>): void;
  addTables(value?: Table, index?: number): Table;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSchemaTablesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSchemaTablesResponse): GetSchemaTablesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSchemaTablesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSchemaTablesResponse;
  static deserializeBinaryFromReader(message: GetSchemaTablesResponse, reader: jspb.BinaryReader): GetSchemaTablesResponse;
}

export namespace GetSchemaTablesResponse {
  export type AsObject = {
    tablesList: Array<Table.AsObject>,
  }
}

export class GetTableRequest extends jspb.Message {
  hasInitialize(): boolean;
  clearInitialize(): void;
  getInitialize(): GetTableRequest.InitializeQuery | undefined;
  setInitialize(value?: GetTableRequest.InitializeQuery): void;

  hasQuery(): boolean;
  clearQuery(): void;
  getQuery(): QueryRequestStream | undefined;
  setQuery(value?: QueryRequestStream): void;

  getRequestCase(): GetTableRequest.RequestCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTableRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTableRequest): GetTableRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTableRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTableRequest;
  static deserializeBinaryFromReader(message: GetTableRequest, reader: jspb.BinaryReader): GetTableRequest;
}

export namespace GetTableRequest {
  export type AsObject = {
    initialize?: GetTableRequest.InitializeQuery.AsObject,
    query?: QueryRequestStream.AsObject,
  }

  export class InitializeQuery extends jspb.Message {
    getConnectionid(): string;
    setConnectionid(value: string): void;

    getSchema(): string;
    setSchema(value: string): void;

    getTable(): string;
    setTable(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InitializeQuery.AsObject;
    static toObject(includeInstance: boolean, msg: InitializeQuery): InitializeQuery.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InitializeQuery, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InitializeQuery;
    static deserializeBinaryFromReader(message: InitializeQuery, reader: jspb.BinaryReader): InitializeQuery;
  }

  export namespace InitializeQuery {
    export type AsObject = {
      connectionid: string,
      schema: string,
      table: string,
    }
  }

  export enum RequestCase {
    REQUEST_NOT_SET = 0,
    INITIALIZE = 1,
    QUERY = 2,
  }
}

export class GetTableResponse extends jspb.Message {
  hasResult(): boolean;
  clearResult(): void;
  getResult(): QueryResultStream | undefined;
  setResult(value?: QueryResultStream): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTableResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTableResponse): GetTableResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTableResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTableResponse;
  static deserializeBinaryFromReader(message: GetTableResponse, reader: jspb.BinaryReader): GetTableResponse;
}

export namespace GetTableResponse {
  export type AsObject = {
    result?: QueryResultStream.AsObject,
  }
}

export class SaveConnectionRequest extends jspb.Message {
  hasConnection(): boolean;
  clearConnection(): void;
  getConnection(): Connection | undefined;
  setConnection(value?: Connection): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveConnectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveConnectionRequest): SaveConnectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveConnectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveConnectionRequest;
  static deserializeBinaryFromReader(message: SaveConnectionRequest, reader: jspb.BinaryReader): SaveConnectionRequest;
}

export namespace SaveConnectionRequest {
  export type AsObject = {
    connection?: Connection.AsObject,
  }
}

export class SaveConnectionResponse extends jspb.Message {
  hasConnection(): boolean;
  clearConnection(): void;
  getConnection(): Connection | undefined;
  setConnection(value?: Connection): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveConnectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SaveConnectionResponse): SaveConnectionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveConnectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveConnectionResponse;
  static deserializeBinaryFromReader(message: SaveConnectionResponse, reader: jspb.BinaryReader): SaveConnectionResponse;
}

export namespace SaveConnectionResponse {
  export type AsObject = {
    connection?: Connection.AsObject,
  }
}

export class TestConnectionRequest extends jspb.Message {
  hasCredentials(): boolean;
  clearCredentials(): void;
  getCredentials(): Credentials | undefined;
  setCredentials(value?: Credentials): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestConnectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TestConnectionRequest): TestConnectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TestConnectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TestConnectionRequest;
  static deserializeBinaryFromReader(message: TestConnectionRequest, reader: jspb.BinaryReader): TestConnectionRequest;
}

export namespace TestConnectionRequest {
  export type AsObject = {
    credentials?: Credentials.AsObject,
  }
}

export class TestConnectionResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): void;

  getErrormessage(): string;
  setErrormessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestConnectionResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TestConnectionResponse): TestConnectionResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TestConnectionResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TestConnectionResponse;
  static deserializeBinaryFromReader(message: TestConnectionResponse, reader: jspb.BinaryReader): TestConnectionResponse;
}

export namespace TestConnectionResponse {
  export type AsObject = {
    success: boolean,
    errormessage: string,
  }
}

