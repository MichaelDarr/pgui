// package: postgres
// file: protos/postgres/postgres.proto

import * as jspb from "google-protobuf";

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

export class GetConnectionRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetConnectionRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetConnectionRequest): GetConnectionRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetConnectionRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetConnectionRequest;
  static deserializeBinaryFromReader(message: GetConnectionRequest, reader: jspb.BinaryReader): GetConnectionRequest;
}

export namespace GetConnectionRequest {
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

