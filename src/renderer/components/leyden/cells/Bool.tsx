import { CellRenderer } from 'leyden-react';

import { BasicCell } from './helpers/BasicCell';

export const Bool: CellRenderer<'Bool'> = ({
    attributes,
    children,
    element,
}) => {
    return (
        <BasicCell
            attributes={attributes}
            value={element.value ? 'True' : 'False'}
        >
            {children}
        </BasicCell>
    );
};
