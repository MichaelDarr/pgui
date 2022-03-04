import { CellRenderer } from 'leyden-react';

import { BasicCell } from './helpers/BasicCell';

export const Timestamp: CellRenderer<'Timestamp'> = ({
    attributes,
    children,
    element,
}) => {
    return (
        <BasicCell
            attributes={attributes}
            value={element.value.toLocaleString()}
        >
            {children}
        </BasicCell>
    );
};
