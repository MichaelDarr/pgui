// GENERATED CODE -- DO NOT EDIT!

// package: postgres
// file: protos/postgres/postgres.proto

import * as protos_postgres_postgres_pb from "../../protos/postgres/postgres_pb";
import * as grpc from "@grpc/grpc-js";

interface IPostgresServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  connect: grpc.MethodDefinition<protos_postgres_postgres_pb.ConnectRequest, protos_postgres_postgres_pb.ConnectResponse>;
  testConnection: grpc.MethodDefinition<protos_postgres_postgres_pb.TestConnectionRequest, protos_postgres_postgres_pb.TestConnectionResponse>;
}

export const PostgresServiceService: IPostgresServiceService;

export interface IPostgresServiceServer extends grpc.UntypedServiceImplementation {
  connect: grpc.handleUnaryCall<protos_postgres_postgres_pb.ConnectRequest, protos_postgres_postgres_pb.ConnectResponse>;
  testConnection: grpc.handleUnaryCall<protos_postgres_postgres_pb.TestConnectionRequest, protos_postgres_postgres_pb.TestConnectionResponse>;
}

export class PostgresServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  connect(argument: protos_postgres_postgres_pb.ConnectRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.ConnectResponse>): grpc.ClientUnaryCall;
  connect(argument: protos_postgres_postgres_pb.ConnectRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.ConnectResponse>): grpc.ClientUnaryCall;
  connect(argument: protos_postgres_postgres_pb.ConnectRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.ConnectResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
  testConnection(argument: protos_postgres_postgres_pb.TestConnectionRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.TestConnectionResponse>): grpc.ClientUnaryCall;
}
