import { CellRenderer } from 'leyden-react';

export const Double: CellRenderer<'Double'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
