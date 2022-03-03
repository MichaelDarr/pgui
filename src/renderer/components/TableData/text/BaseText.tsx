import { TextRenderer } from 'leyden-react';

export const BaseText: TextRenderer<'BaseText'> = ({ attributes, children }) => {
    return <span {...attributes}>{children}</span>;
};
