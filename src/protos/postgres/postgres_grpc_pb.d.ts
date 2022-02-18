// GENERATED CODE -- DO NOT EDIT!

// package: postgres
// file: protos/postgres/postgres.proto

import * as protos_postgres_postgres_pb from "../../protos/postgres/postgres_pb";
import * as grpc from "@grpc/grpc-js";

interface IPostgresServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  deleteConnection: grpc.MethodDefinition<protos_postgres_postgres_pb.DeleteConnectionRequest, protos_postgres_postgres_pb.DeleteConnectionResponse>;
  getConnections: grpc.MethodDefinition<protos_postgres_postgres_pb.GetConnectionsRequest, protos_postgres_postgres_pb.GetConnectionsResponse>;
  getSchemas: grpc.MethodDefinition<protos_postgres_postgres_pb.GetSchemasRequest, protos_postgres_postgres_pb.GetSchemasResponse>;
  getSchemaTables: grpc.MethodDefinition<protos_postgres_postgres_pb.GetSchemaTablesRequest, protos_postgres_postgres_pb.GetSchemaTablesResponse>;
  saveConnection: grpc.MethodDefinition<protos_postgres_postgres_pb.SaveConnectionRequest, protos_postgres_postgres_pb.SaveConnectionResponse>;
  testConnection: grpc.MethodDefinition<protos_postgres_postgres_pb.TestConnectionRequest, protos_postgres_postgres_pb.TestConnectionResponse>;
}

export const PostgresServiceService: IPostgresServiceService;

export interface IPostgresServiceServer extends grpc.UntypedServiceImplementation {
  deleteConnection: grpc.handleUnaryCall<protos_postgres_postgres_pb.DeleteConnectionRequest, protos_postgres_postgres_pb.DeleteConnectionResponse>;
  getConnections: grpc.handleUnaryCall<protos_postgres_postgres_pb.GetConnectionsRequest, protos_postgres_postgres_pb.GetConnectionsResponse>;
  getSchemas: grpc.handleUnaryCall<protos_postgres_postgres_pb.GetSchemasRequest, protos_postgres_postgres_pb.GetSchemasResponse>;
  getSchemaTables: grpc.handleUnaryCall<protos_postgres_postgres_pb.GetSchemaTablesRequest, protos_postgres_postgres_pb.GetSchemaTablesResponse>;
  saveConnection: grpc.handleUnaryCall<protos_postgres_postgres_pb.SaveConnectionRequest, protos_postgres_postgres_pb.SaveConnectionResponse>;
  testConnection: grpc.handleUnaryCall<protos_postgres_postgres_pb.TestConnectionRequest, protos_postgres_postgres_pb.TestConnectionResponse>;
}

export class PostgresServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  deleteConnection(argument: protos_postgres_postgres_pb.DeleteConnectionRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.DeleteConnectionResponse>): grpc.ClientUnaryCall;
  deleteConnection(argument: protos_postgres_postgres_pb.DeleteConnectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.DeleteConnectionResponse>): grpc.ClientUnaryCall;
  deleteConnection(argument: protos_postgres_postgres_pb.DeleteConnectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.DeleteConnectionResponse>): grpc.ClientUnaryCall;
  getConnections(argument: protos_postgres_postgres_pb.GetConnectionsRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetConnectionsResponse>): grpc.ClientUnaryCall;
  getConnections(argument: protos_postgres_postgres_pb.GetConnectionsRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetConnectionsResponse>): grpc.ClientUnaryCall;
  getConnections(argument: protos_postgres_postgres_pb.GetConnectionsRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetConnectionsResponse>): grpc.ClientUnaryCall;
  getSchemas(argument: protos_postgres_postgres_pb.GetSchemasRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemasResponse>): grpc.ClientUnaryCall;
  getSchemas(argument: protos_postgres_postgres_pb.GetSchemasRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemasResponse>): grpc.ClientUnaryCall;
  getSchemas(argument: protos_postgres_postgres_pb.GetSchemasRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemasResponse>): grpc.ClientUnaryCall;
  getSchemaTables(argument: protos_postgres_postgres_pb.GetSchemaTablesRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemaTablesResponse>): grpc.ClientUnaryCall;
  getSchemaTables(argument: protos_postgres_postgres_pb.GetSchemaTablesRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemaTablesResponse>): grpc.ClientUnaryCall;
  getSchemaTables(argument: protos_postgres_postgres_pb.GetSchemaTablesRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.GetSchemaTablesResponse>): grpc.ClientUnaryCall;
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
}
