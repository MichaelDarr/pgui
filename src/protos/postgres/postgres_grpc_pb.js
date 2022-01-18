// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_postgres_postgres_pb = require('../../protos/postgres/postgres_pb.js');

function serialize_postgres_GetConnectionRequest(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.GetConnectionRequest)) {
    throw new Error('Expected argument of type postgres.GetConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_GetConnectionRequest(buffer_arg) {
  return protos_postgres_postgres_pb.GetConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_GetConnectionsResponse(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.GetConnectionsResponse)) {
    throw new Error('Expected argument of type postgres.GetConnectionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_GetConnectionsResponse(buffer_arg) {
  return protos_postgres_postgres_pb.GetConnectionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_SaveConnectionRequest(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.SaveConnectionRequest)) {
    throw new Error('Expected argument of type postgres.SaveConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_SaveConnectionRequest(buffer_arg) {
  return protos_postgres_postgres_pb.SaveConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_SaveConnectionResponse(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.SaveConnectionResponse)) {
    throw new Error('Expected argument of type postgres.SaveConnectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_SaveConnectionResponse(buffer_arg) {
  return protos_postgres_postgres_pb.SaveConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  getConnections: {
    path: '/postgres.PostgresService/GetConnections',
    requestStream: false,
    responseStream: false,
    requestType: protos_postgres_postgres_pb.GetConnectionRequest,
    responseType: protos_postgres_postgres_pb.GetConnectionsResponse,
    requestSerialize: serialize_postgres_GetConnectionRequest,
    requestDeserialize: deserialize_postgres_GetConnectionRequest,
    responseSerialize: serialize_postgres_GetConnectionsResponse,
    responseDeserialize: deserialize_postgres_GetConnectionsResponse,
  },
  saveConnection: {
    path: '/postgres.PostgresService/SaveConnection',
    requestStream: false,
    responseStream: false,
    requestType: protos_postgres_postgres_pb.SaveConnectionRequest,
    responseType: protos_postgres_postgres_pb.SaveConnectionResponse,
    requestSerialize: serialize_postgres_SaveConnectionRequest,
    requestDeserialize: deserialize_postgres_SaveConnectionRequest,
    responseSerialize: serialize_postgres_SaveConnectionResponse,
    responseDeserialize: deserialize_postgres_SaveConnectionResponse,
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
