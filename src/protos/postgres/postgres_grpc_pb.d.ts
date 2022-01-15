// GENERATED CODE -- DO NOT EDIT!

// package: postgres
// file: protos/postgres/postgres.proto

import * as protos_postgres_postgres_pb from "../../protos/postgres/postgres_pb";
import * as grpc from "@grpc/grpc-js";

interface IPostgresServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  saveConnection: grpc.MethodDefinition<protos_postgres_postgres_pb.SaveConnectionRequest, protos_postgres_postgres_pb.SaveConnectionResponse>;
  testConnection: grpc.MethodDefinition<protos_postgres_postgres_pb.TestConnectionRequest, protos_postgres_postgres_pb.TestConnectionResponse>;
}

export const PostgresServiceService: IPostgresServiceService;

export interface IPostgresServiceServer extends grpc.UntypedServiceImplementation {
  saveConnection: grpc.handleUnaryCall<protos_postgres_postgres_pb.SaveConnectionRequest, protos_postgres_postgres_pb.SaveConnectionResponse>;
  testConnection: grpc.handleUnaryCall<protos_postgres_postgres_pb.TestConnectionRequest, protos_postgres_postgres_pb.TestConnectionResponse>;
}

export class PostgresServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  saveConnection(argument: protos_postgres_postgres_pb.SaveConnectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.SaveConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
}
