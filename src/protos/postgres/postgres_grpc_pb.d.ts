// GENERATED CODE -- DO NOT EDIT!

// package: postgres
// file: protos/postgres/postgres.proto

import * as protos_postgres_postgres_pb from "../../protos/postgres/postgres_pb";
import * as grpc from "@grpc/grpc-js";

interface IPostgresServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getConnections: grpc.MethodDefinition<protos_postgres_postgres_pb.GetConnectionsRequest, protos_postgres_postgres_pb.GetConnectionsResponse>;
  saveConnection: grpc.MethodDefinition<protos_postgres_postgres_pb.SaveConnectionRequest, protos_postgres_postgres_pb.SaveConnectionResponse>;
  testConnection: grpc.MethodDefinition<protos_postgres_postgres_pb.TestConnectionRequest, protos_postgres_postgres_pb.TestConnectionResponse>;
  getSchemas: grpc.MethodDefinition<protos_postgres_postgres_pb.GetSchemasRequest, protos_postgres_postgres_pb.GetSchemasResponse>;
}

export const PostgresServiceService: IPostgresServiceService;

export interface IPostgresServiceServer extends grpc.UntypedServiceImplementation {
  getConnections: grpc.handleUnaryCall<protos_postgres_postgres_pb.GetConnectionsRequest, protos_postgres_postgres_pb.GetConnectionsResponse>;
  saveConnection: grpc.handleUnaryCall<protos_postgres_postgres_pb.SaveConnectionRequest, protos_postgres_postgres_pb.SaveConnectionResponse>;
  testConnection: grpc.handleUnaryCall<protos_postgres_postgres_pb.TestConnectionRequest, protos_postgres_postgres_pb.TestConnectionResponse>;
  getSchemas: grpc.handleUnaryCall<protos_postgres_postgres_pb.GetSchemasRequest, protos_postgres_postgres_pb.GetSchemasResponse>;
}

export class PostgresServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  getConnections(argument: protos_postgres_postgres_pb.GetConnectionsRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetConnectionsResponse>): grpc.ClientUnaryCall;
  getConnections(argument: protos_postgres_postgres_pb.GetConnectionsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetConnectionsResponse>): grpc.ClientUnaryCall;
  getConnections(argument: protos_postgres_postgres_pb.GetConnectionsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetConnectionsResponse>): grpc.ClientUnaryCall;
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  getSchemas(argument: protos_postgres_postgres_pb.GetSchemasRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemasResponse>): grpc.ClientUnaryCall;
  getSchemas(argument: protos_postgres_postgres_pb.GetSchemasRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemasResponse>): grpc.ClientUnaryCall;
  getSchemas(argument: protos_postgres_postgres_pb.GetSchemasRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemasResponse>): grpc.ClientUnaryCall;
}
