#
# github.com/MichaelDarr/pgui
#
GO ?= go

GOFLAGS :=
EXTRA_GOFLAGS ?=

ROOT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
BACKEND_DIR := $(ROOT_DIR)/backend
BIN_DIR := $(ROOT_DIR)/assets/bin

.PHONY: backend
backend: ## build backend binary
	cd $(BACKEND_DIR); \
	$(GO) build $(GOFLAGS) -ldflags '-s -w' $(EXTRA_GOFLAGS) -o $(BIN_DIR)/$@ ./cmd/backend

.PHONY: proto
proto:
	protoc \
        --plugin="protoc-gen-ts=$(ROOT_DIR)/node_modules/.bin/protoc-gen-ts" \
        --plugin=protoc-gen-grpc="$(ROOT_DIR)/node_modules/.bin/grpc_tools_node_protoc_plugin" \
        --go_out=$(ROOT_DIR)/backend --go_opt=paths=source_relative \
        --go-grpc_out=$(ROOT_DIR)/backend --go-grpc_opt=paths=source_relative \
        --js_out=import_style=commonjs,binary:$(ROOT_DIR)/src \
        --ts_out=service=grpc-node,mode=grpc-js:$(ROOT_DIR)/src \
        --grpc_out="grpc_js:$(ROOT_DIR)/src" \
		protos/**/*.proto
