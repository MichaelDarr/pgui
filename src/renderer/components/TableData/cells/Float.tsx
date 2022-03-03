import { CellRenderer } from 'leyden-react';

export const Float: CellRenderer<'Float'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
