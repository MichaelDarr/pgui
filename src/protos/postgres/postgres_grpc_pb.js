// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_postgres_postgres_pb = require('../../protos/postgres/postgres_pb.js');

function serialize_postgres_DeleteConnectionRequest(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.DeleteConnectionRequest)) {
    throw new Error('Expected argument of type postgres.DeleteConnectionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_DeleteConnectionRequest(buffer_arg) {
  return protos_postgres_postgres_pb.DeleteConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_DeleteConnectionResponse(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.DeleteConnectionResponse)) {
    throw new Error('Expected argument of type postgres.DeleteConnectionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_DeleteConnectionResponse(buffer_arg) {
  return protos_postgres_postgres_pb.DeleteConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_GetConnectionsRequest(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.GetConnectionsRequest)) {
    throw new Error('Expected argument of type postgres.GetConnectionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_GetConnectionsRequest(buffer_arg) {
  return protos_postgres_postgres_pb.GetConnectionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_postgres_GetSchemaTablesRequest(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.GetSchemaTablesRequest)) {
    throw new Error('Expected argument of type postgres.GetSchemaTablesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_GetSchemaTablesRequest(buffer_arg) {
  return protos_postgres_postgres_pb.GetSchemaTablesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_GetSchemaTablesResponse(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.GetSchemaTablesResponse)) {
    throw new Error('Expected argument of type postgres.GetSchemaTablesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_GetSchemaTablesResponse(buffer_arg) {
  return protos_postgres_postgres_pb.GetSchemaTablesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_GetSchemasRequest(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.GetSchemasRequest)) {
    throw new Error('Expected argument of type postgres.GetSchemasRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_GetSchemasRequest(buffer_arg) {
  return protos_postgres_postgres_pb.GetSchemasRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_postgres_GetSchemasResponse(arg) {
  if (!(arg instanceof protos_postgres_postgres_pb.GetSchemasResponse)) {
    throw new Error('Expected argument of type postgres.GetSchemasResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_postgres_GetSchemasResponse(buffer_arg) {
  return protos_postgres_postgres_pb.GetSchemasResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  deleteConnection: {
    path: '/postgres.PostgresService/DeleteConnection',
    requestStream: false,
    responseStream: false,
    requestType: protos_postgres_postgres_pb.DeleteConnectionRequest,
    responseType: protos_postgres_postgres_pb.DeleteConnectionResponse,
    requestSerialize: serialize_postgres_DeleteConnectionRequest,
    requestDeserialize: deserialize_postgres_DeleteConnectionRequest,
    responseSerialize: serialize_postgres_DeleteConnectionResponse,
    responseDeserialize: deserialize_postgres_DeleteConnectionResponse,
  },
  getConnections: {
    path: '/postgres.PostgresService/GetConnections',
    requestStream: false,
    responseStream: false,
    requestType: protos_postgres_postgres_pb.GetConnectionsRequest,
    responseType: protos_postgres_postgres_pb.GetConnectionsResponse,
    requestSerialize: serialize_postgres_GetConnectionsRequest,
    requestDeserialize: deserialize_postgres_GetConnectionsRequest,
    responseSerialize: serialize_postgres_GetConnectionsResponse,
    responseDeserialize: deserialize_postgres_GetConnectionsResponse,
  },
  getSchemas: {
    path: '/postgres.PostgresService/GetSchemas',
    requestStream: false,
    responseStream: false,
    requestType: protos_postgres_postgres_pb.GetSchemasRequest,
    responseType: protos_postgres_postgres_pb.GetSchemasResponse,
    requestSerialize: serialize_postgres_GetSchemasRequest,
    requestDeserialize: deserialize_postgres_GetSchemasRequest,
    responseSerialize: serialize_postgres_GetSchemasResponse,
    responseDeserialize: deserialize_postgres_GetSchemasResponse,
  },
  getSchemaTables: {
    path: '/postgres.PostgresService/GetSchemaTables',
    requestStream: false,
    responseStream: false,
    requestType: protos_postgres_postgres_pb.GetSchemaTablesRequest,
    responseType: protos_postgres_postgres_pb.GetSchemaTablesResponse,
    requestSerialize: serialize_postgres_GetSchemaTablesRequest,
    requestDeserialize: deserialize_postgres_GetSchemaTablesRequest,
    responseSerialize: serialize_postgres_GetSchemaTablesResponse,
    responseDeserialize: deserialize_postgres_GetSchemaTablesResponse,
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
