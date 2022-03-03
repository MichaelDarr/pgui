import { Text } from 'leyden';

interface BaseText<T extends string = string> {
    text: T;
}

// NullCell displays a value that is null.
interface NullCell {
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

// TextCell displays a value editable as plain text, like a string or number.
interface TextCell {
    children: [Text<'BaseText'>];
    isVoid: false;
}

interface Empty extends BaseText<''> {
    validator: 'empty';
}

declare module 'leyden' {
    interface CustomTypes {
        Cells: {
            Bool: ValueCell<boolean>;
            Bytes: TextCell;
            Double: TextCell;
            Float: TextCell;
            Int32: TextCell;
            Int64: TextCell;
            Empty: NullCell;
            String: TextCell;
            Timestamp: ValueCell<Date>;
            UInt64: TextCell;
            UInt32: TextCell;
        };
        Text: {
            BaseText: BaseText,
            Empty: Empty,
        };
    }
}
