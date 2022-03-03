import { CellRenderer } from 'leyden-react';

export const Empty: CellRenderer<'Empty'> = ({
    attributes,
    children,
}) => {
    return (
        <section {...attributes}>
            {children}
        </section>
    );
};
