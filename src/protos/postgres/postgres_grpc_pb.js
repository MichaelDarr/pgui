// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_postgres_postgres_pb = require('../../protos/postgres/postgres_pb.js');

function serialize_postgres_ConnectRequest(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.ConnectRequest)) {
    throw new Error('Expected argument of type postgres.ConnectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_ConnectRequest(buffer_arg) {
  return protos_postgres_postgres_pb.ConnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_ConnectResponse(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.ConnectResponse)) {
    throw new Error('Expected argument of type postgres.ConnectResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_ConnectResponse(buffer_arg) {
  return protos_postgres_postgres_pb.ConnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_TestConnectionRequest(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.TestConnectionRequest)) {
    throw new Error('Expected argument of type postgres.TestConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_TestConnectionRequest(buffer_arg) {
  return protos_postgres_postgres_pb.TestConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_TestConnectionResponse(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.TestConnectionResponse)) {
    throw new Error('Expected argument of type postgres.TestConnectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_TestConnectionResponse(buffer_arg) {
  return protos_postgres_postgres_pb.TestConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PostgresServiceService = exports.PostgresServiceService = {
  connect: {
    path: '/postgres.PostgresService/Connect',
    requestStream: false,
    responseStream: false,
    requestType: protos_postgres_postgres_pb.ConnectRequest,
    responseType: protos_postgres_postgres_pb.ConnectResponse,
    requestSerialize: serialize_postgres_ConnectRequest,
    requestDeserialize: deserialize_postgres_ConnectRequest,
    responseSerialize: serialize_postgres_ConnectResponse,
    responseDeserialize: deserialize_postgres_ConnectResponse,
  },
  testConnection: {
    path: '/postgres.PostgresService/TestConnection',
    requestStream: false,
    responseStream: false,
    requestType: protos_postgres_postgres_pb.TestConnectionRequest,
    responseType: protos_postgres_postgres_pb.TestConnectionResponse,
    requestSerialize: serialize_postgres_TestConnectionRequest,
    requestDeserialize: deserialize_postgres_TestConnectionRequest,
    responseSerialize: serialize_postgres_TestConnectionResponse,
    responseDeserialize: deserialize_postgres_TestConnectionResponse,
  },
};

exports.PostgresServiceClient = grpc.makeGenericClientConstructor(PostgresServiceService);
