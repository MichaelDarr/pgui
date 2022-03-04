import { CellRenderer } from 'leyden-react';

export const Placeholder: CellRenderer<'Placeholder'> = ({
    attributes,
    children,
}) => {
    return (
        <span {...attributes}>
            {children}
        </span>
    );
};
