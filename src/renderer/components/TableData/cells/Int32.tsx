import { CellRenderer } from 'leyden-react';

export const Int32: CellRenderer<'Int32'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
