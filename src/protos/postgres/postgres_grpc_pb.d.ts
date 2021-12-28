// GENERATED CODE -- DO NOT EDIT!

// package: postgres
// file: protos/postgres/postgres.proto

import * as protos_postgres_postgres_pb from "../../protos/postgres/postgres_pb";
import * as grpc from "@grpc/grpc-js";

interface IPostgresServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  connect: grpc.MethodDefinition<protos_postgres_postgres_pb.ConnectRequest, protos_postgres_postgres_pb.ConnectResponse>;
}

export const PostgresServiceService: IPostgresServiceService;

export interface IPostgresServiceServer extends grpc.UntypedServiceImplementation {
  connect: grpc.handleUnaryCall<protos_postgres_postgres_pb.ConnectRequest, protos_postgres_postgres_pb.ConnectResponse>;
}

export class PostgresServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  connect(argument: protos_postgres_postgres_pb.ConnectRequest, callback: grpc.requestCallback<protos_postgres_postgres_pb.ConnectResponse>): grpc.ClientUnaryCall;
  connect(argument: protos_postgres_postgres_pb.ConnectRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.ConnectResponse>): grpc.ClientUnaryCall;
  connect(argument: protos_postgres_postgres_pb.ConnectRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<protos_postgres_postgres_pb.ConnectResponse>): grpc.ClientUnaryCall;
}
