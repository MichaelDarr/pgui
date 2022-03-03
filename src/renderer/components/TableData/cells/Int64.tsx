import { CellRenderer } from 'leyden-react';

export const Int64: CellRenderer<'Int64'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
