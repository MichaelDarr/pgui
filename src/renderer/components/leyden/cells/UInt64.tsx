import { CellRenderer } from 'leyden-react';

export const UInt64: CellRenderer<'UInt64'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
