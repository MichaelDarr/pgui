import { CellRenderer } from 'leyden-react';
import { palette } from 'renderer/common/color';

import { BasicCell } from './helpers/BasicCell';

export const Null: CellRenderer<'Null'> = ({
    attributes,
    children,
}) => {
    return (
        <BasicCell
            attributes={attributes}
            style={{
                color: palette.stoneGray,
            }}
            value={'NULL'}
        >
            {children}
        </BasicCell>
    );
};
