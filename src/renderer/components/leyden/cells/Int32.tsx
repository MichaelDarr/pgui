import { CellRenderer } from 'leyden-react';

import { BasicCell } from './helpers/BasicCell';

export const Int32: CellRenderer<'Int32'> = ({
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
