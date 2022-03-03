import { TextRenderer } from 'leyden-react';

export const Empty: TextRenderer<'Empty'> = ({
    attributes,
    children,
}) => {
    return (
        <span {...attributes}>
            {children}
        </span>
    );
};
