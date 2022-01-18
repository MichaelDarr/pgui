// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.14.0
// source: protos/postgres/postgres.proto

package proto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// PostgresServiceClient is the client API for PostgresService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PostgresServiceClient interface {
	GetConnections(ctx context.Context, in *GetConnectionRequest, opts ...grpc.CallOption) (*GetConnectionsResponse, error)
	SaveConnection(ctx context.Context, in *SaveConnectionRequest, opts ...grpc.CallOption) (*SaveConnectionResponse, error)
	TestConnection(ctx context.Context, in *TestConnectionRequest, opts ...grpc.CallOption) (*TestConnectionResponse, error)
}

type postgresServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewPostgresServiceClient(cc grpc.ClientConnInterface) PostgresServiceClient {
	return &postgresServiceClient{cc}
}

func (c *postgresServiceClient) GetConnections(ctx context.Context, in *GetConnectionRequest, opts ...grpc.CallOption) (*GetConnectionsResponse, error) {
	out := new(GetConnectionsResponse)
	err := c.cc.Invoke(ctx, "/postgres.PostgresService/GetConnections", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *postgresServiceClient) SaveConnection(ctx context.Context, in *SaveConnectionRequest, opts ...grpc.CallOption) (*SaveConnectionResponse, error) {
	out := new(SaveConnectionResponse)
	err := c.cc.Invoke(ctx, "/postgres.PostgresService/SaveConnection", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *postgresServiceClient) TestConnection(ctx context.Context, in *TestConnectionRequest, opts ...grpc.CallOption) (*TestConnectionResponse, error) {
	out := new(TestConnectionResponse)
	err := c.cc.Invoke(ctx, "/postgres.PostgresService/TestConnection", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PostgresServiceServer is the server API for PostgresService service.
// All implementations must embed UnimplementedPostgresServiceServer
// for forward compatibility
type PostgresServiceServer interface {
	GetConnections(context.Context, *GetConnectionRequest) (*GetConnectionsResponse, error)
	SaveConnection(context.Context, *SaveConnectionRequest) (*SaveConnectionResponse, error)
	TestConnection(context.Context, *TestConnectionRequest) (*TestConnectionResponse, error)
	mustEmbedUnimplementedPostgresServiceServer()
}

// UnimplementedPostgresServiceServer must be embedded to have forward compatible implementations.
type UnimplementedPostgresServiceServer struct {
}

func (UnimplementedPostgresServiceServer) GetConnections(context.Context, *GetConnectionRequest) (*GetConnectionsResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetConnections not implemented")
}
func (UnimplementedPostgresServiceServer) SaveConnection(context.Context, *SaveConnectionRequest) (*SaveConnectionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SaveConnection not implemented")
}
func (UnimplementedPostgresServiceServer) TestConnection(context.Context, *TestConnectionRequest) (*TestConnectionResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method TestConnection not implemented")
}
func (UnimplementedPostgresServiceServer) mustEmbedUnimplementedPostgresServiceServer() {}

// UnsafePostgresServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PostgresServiceServer will
// result in compilation errors.
type UnsafePostgresServiceServer interface {
	mustEmbedUnimplementedPostgresServiceServer()
}

func RegisterPostgresServiceServer(s grpc.ServiceRegistrar, srv PostgresServiceServer) {
	s.RegisterService(&PostgresService_ServiceDesc, srv)
}

func _PostgresService_GetConnections_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetConnectionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PostgresServiceServer).GetConnections(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/postgres.PostgresService/GetConnections",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PostgresServiceServer).GetConnections(ctx, req.(*GetConnectionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _PostgresService_SaveConnection_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SaveConnectionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PostgresServiceServer).SaveConnection(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/postgres.PostgresService/SaveConnection",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PostgresServiceServer).SaveConnection(ctx, req.(*SaveConnectionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _PostgresService_TestConnection_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TestConnectionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PostgresServiceServer).TestConnection(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/postgres.PostgresService/TestConnection",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PostgresServiceServer).TestConnection(ctx, req.(*TestConnectionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// PostgresService_ServiceDesc is the grpc.ServiceDesc for PostgresService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var PostgresService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "postgres.PostgresService",
	HandlerType: (*PostgresServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetConnections",
			Handler:    _PostgresService_GetConnections_Handler,
		},
		{
			MethodName: "SaveConnection",
			Handler:    _PostgresService_SaveConnection_Handler,
		},
		{
			MethodName: "TestConnection",
			Handler:    _PostgresService_TestConnection_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "protos/postgres/postgres.proto",
}
