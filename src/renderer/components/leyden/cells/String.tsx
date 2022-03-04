import { CellRenderer } from 'leyden-react';

import { BasicCell } from './helpers/BasicCell';

export const String: CellRenderer<'String'> = ({
    attributes,
    children,
    element,
}) => {
    return (
        <BasicCell
            attributes={attributes}
            value={element.value}
        >
            {children}
        </BasicCell>
    );
};
