import { Text } from 'leyden';

export interface SerializeText {
    BaseText: (text: string) => Text<'BaseText'>;
    Empty: () => Text<'Empty'>;
}

export const SerializeText: SerializeText = {
    BaseText(text) {
        return Text.new('BaseText', text, {});
    },

    Empty() {
        return Text.new('Empty', '', { validator: 'empty' });
    },
};
