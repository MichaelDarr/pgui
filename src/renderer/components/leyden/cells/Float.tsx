import { CellRenderer } from 'leyden-react';

import { BasicCell } from './helpers/BasicCell';

export const Float: CellRenderer<'Float'> = ({
    attributes,
    children,
    element,
}) => {
    return (
        <BasicCell
            attributes={attributes}
            value={element.value.toString()}
        >
            {children}
        </BasicCell>
    );
};
