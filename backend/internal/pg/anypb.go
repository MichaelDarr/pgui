package pg

import (
	"fmt"
	"reflect"
	"time"

	"github.com/gofrs/uuid"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/known/anypb"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

// NewAnypb creates an any protobuf value from a generic database value.
func NewAnypb(value interface{}) (*anypb.Any, error) {
	var message proto.Message
	switch t := value.(type) {
	case nil:
		message = &emptypb.Empty{}
	case bool:
		message = wrapperspb.Bool(t)
	case int8:
		message = wrapperspb.Int32(int32(t))
	case int16:
		message = wrapperspb.Int32(int32(t))
	case int32:
		message = wrapperspb.Int32(t)
	case int64:
		message = wrapperspb.Int64(t)
	case uint8:
		message = wrapperspb.UInt32(uint32(t))
	case uint16:
		message = wrapperspb.UInt32(uint32(t))
	case uint32:
		message = wrapperspb.UInt32(t)
	case uint64:
		message = wrapperspb.UInt64(t)
	case float32:
		message = wrapperspb.Float(t)
	case float64:
		message = wrapperspb.Double(t)
	case string:
		message = wrapperspb.String(t)
	case []byte:
		message = wrapperspb.Bytes(t)
	case [16]byte:
		message = wrapperspb.Bytes(t[:])
	case time.Time:
		message = timestamppb.New(t)
	case uuid.UUID:
		message = wrapperspb.String(t.String())
	default:
		fmt.Printf("failed to convert value to any: %v\n%v\n", t, reflect.TypeOf(t))
		return nil, fmt.Errorf(`failed to convert value to any: %v`, t)
	}
	return anypb.New(message)
}

// NewAnypbSlice creates a slice of any protobuf values from a slice of generic database values.
func NewAnypbSlice(values []interface{}) ([]*anypb.Any, error) {
	anyValues := make([]*anypb.Any, len(values))
	for i, value := range values {
		anyValue, err := NewAnypb(value)
		if err != nil {
			return nil, err
		}
		anyValues[i] = anyValue
	}
	return anyValues, nil
}
