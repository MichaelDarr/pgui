import { CellRenderer } from 'leyden-react';

export const Placeholder: CellRenderer<'Placeholder'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
