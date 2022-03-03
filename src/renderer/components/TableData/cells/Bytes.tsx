import { CellRenderer } from 'leyden-react';

export const Bytes: CellRenderer<'Bytes'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
