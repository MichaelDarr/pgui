import { Cell } from 'leyden';

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
}

export const SerializeCell: SerializeCell = {
    Bool(value) {
        return Cell.new(
            'Bool',
            [Serialize.Text.Empty()],
            {
                isVoid: true,
                value,
            }
        );
    },

    Bytes(value) {
        return Cell.new(
            'Bytes',
            [Serialize.Text.BaseText(value)],
            {},
        );
    },

    Double(value) {
        return Cell.new(
            'Double',
            [Serialize.Text.BaseText(value.toString())],
            {},
        );
    },

    Float(value) {
        return Cell.new(
            'Float',
            [Serialize.Text.BaseText(value.toString())],
            {},
        );
    },

    Int32(value) {
        return Cell.new(
            'Int32',
            [Serialize.Text.BaseText(value.toString())],
            {},
        );
    },

    Int64(value) {
        return Cell.new(
            'Int64',
            [Serialize.Text.BaseText(value.toString())],
            {},
        );
    },

    Null() {
        return Cell.new(
            'Null',
            [Serialize.Text.Empty()],
            {
                isVoid: true,
            },
        );
    },

    Placeholder() {
        return Cell.new(
            'Placeholder',
            [Serialize.Text.Empty()],
            {
                isVoid: true,
            },
        );
    },

    String(value) {
        return Cell.new(
            'String',
            [Serialize.Text.BaseText(value)],
            {},
        );
    },

    Timestamp(value) {
        return Cell.new(
            'Timestamp',
            [Serialize.Text.Empty()],
            {
                isVoid: true,
                value,
            },
        );
    },

    UInt64(value) {
        return Cell.new(
            'UInt64',
            [Serialize.Text.BaseText(value.toString())],
            {},
        );
    },

    UInt32(value) {
        return Cell.new(
            'UInt32',
            [Serialize.Text.BaseText(value.toString())],
            {},
        );
    },

};
