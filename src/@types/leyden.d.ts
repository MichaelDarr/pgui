import { Text } from 'leyden';

interface BaseText<T extends string = string> {
    text: T;
}

// EmptyCell contains no data.
interface EmptyCell {
    children: [Text<'Empty'>];
    isVoid: true;
}

// ValueCell displays a value not editable as plain text, like a boolean or timestamp.
interface ValueCell<T> {
    children: [Text<'Empty'>];
    isVoid: true;
    data: {
        value: T;
    };
}

interface Empty extends BaseText<''> {
    validator: 'empty';
}

declare module 'leyden' {
    interface CustomTypes {
        Cells: {
            Bool: ValueCell<boolean>;
            Bytes: ValueCell<string>;
            Double: ValueCell<number>;
            Float: ValueCell<number>;
            Int32: ValueCell<number>;
            Int64: ValueCell<number>;
            Null: EmptyCell;
            Placeholder: EmptyCell;
            String: ValueCell<string>;
            Timestamp: ValueCell<Date>;
            UInt64: ValueCell<number>;
            UInt32: ValueCell<number>;
        };
        Text: {
            BaseText: BaseText,
            Empty: Empty,
        };
    }
}
