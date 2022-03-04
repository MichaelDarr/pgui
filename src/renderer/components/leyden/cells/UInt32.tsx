import { CellRenderer } from 'leyden-react';

import { BasicCell } from './helpers/BasicCell';

export const UInt32: CellRenderer<'UInt32'> = ({
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
