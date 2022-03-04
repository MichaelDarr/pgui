import { Cell, CellType } from 'leyden';

import type { Value } from 'preload/tableQuery/types';

import { Serialize } from '.';

export interface SerializeCell {
    Bool: (value: boolean) => Cell<'Bool'>;
    Bytes: (value: string) => Cell<'Bytes'>;
    Double: (value: number) => Cell<'Double'>;
    Float: (value: number) => Cell<'Float'>;
    Int32: (value: number) => Cell<'Int32'>;
    Int64: (value: number) => Cell<'Int64'>;
    Null: () => Cell<'Null'>;
    Placeholder: () => Cell<'Placeholder'>;
    String: (value: string) => Cell<'String'>;
    Timestamp: (value: Date) => Cell<'Timestamp'>;
    UInt64: (value: number) => Cell<'UInt64'>;
    UInt32: (value: number) => Cell<'UInt32'>;

    fromValue: (value: Value) => Cell<CellType>;
}

export const SerializeCell: SerializeCell = {
    Bool(value) {
        return Cell.new(
            'Bool',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    Bytes(value) {
        return Cell.new(
            'Bytes',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    Double(value) {
        return Cell.new(
            'Double',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    Float(value) {
        return Cell.new(
            'Float',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    Int32(value) {
        return Cell.new(
            'Int32',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    Int64(value) {
        return Cell.new(
            'Int64',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    Null() {
        return Cell.new(
            'Null',
            [Serialize.Text.Empty()],
            { isVoid: true },
        );
    },

    Placeholder() {
        return Cell.new(
            'Placeholder',
            [Serialize.Text.Empty()],
            { isVoid: true },
        );
    },

    String(value) {
        return Cell.new(
            'String',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    Timestamp(value) {
        return Cell.new(
            'Timestamp',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    UInt64(value) {
        return Cell.new(
            'UInt64',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    UInt32(value) {
        return Cell.new(
            'UInt32',
            [Serialize.Text.Empty()],
            { isVoid: true, value },
        );
    },

    fromValue({ type, value }) {
        switch(type) {
            case 'bool':
                return Serialize.Cell.Bool(value);
            case 'bytes':
                return Serialize.Cell.Bytes(value);
            case 'double':
                return Serialize.Cell.Double(value);
            case 'float':
                return Serialize.Cell.Float(value);
            case 'int32':
                return Serialize.Cell.Int32(value);
            case 'int64':
                return Serialize.Cell.Int64(value);
            case 'null':
                return Serialize.Cell.Null();
            case 'string':
                return Serialize.Cell.String(value);
            case 'timestamp':
                return Serialize.Cell.Timestamp(value);
            case 'uint32':
                return Serialize.Cell.UInt32(value);
            case 'uint64':
                return Serialize.Cell.UInt64(value);
        }
    },
};
