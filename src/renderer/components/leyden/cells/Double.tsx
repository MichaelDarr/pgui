import { CellRenderer } from 'leyden-react';

import { BasicCell } from './helpers/BasicCell';

export const Double: CellRenderer<'Double'> = ({
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
