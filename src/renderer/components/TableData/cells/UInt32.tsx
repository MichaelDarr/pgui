import { CellRenderer } from 'leyden-react';

export const UInt32: CellRenderer<'UInt32'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
