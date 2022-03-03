import { CellRenderer } from 'leyden-react';

export const String: CellRenderer<'String'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
