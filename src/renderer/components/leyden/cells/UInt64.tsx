import { CellRenderer } from 'leyden-react';

import { BasicCell } from './helpers/BasicCell';

export const UInt64: CellRenderer<'UInt64'> = ({
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
