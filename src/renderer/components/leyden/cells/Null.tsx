import { CellRenderer } from 'leyden-react';

export const Null: CellRenderer<'Null'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
