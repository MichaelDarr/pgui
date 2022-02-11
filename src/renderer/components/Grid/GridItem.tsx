import { CSSProperties, FC } from 'react';

import { GridItemNamed, GridItemPlaced } from './types';
import { gridItemIsNamed } from './typeGuards';

export const GridItem: FC<GridItemNamed|GridItemPlaced> = (props) => {
    const {
        alignSelf,
        justifySelf,
        children,
        style,
        ...rest
    } = props;

    // Initialize style object with defaults, overriding grid-related styles.
    const itemStyle: CSSProperties = Object.assign(
        {
            margin: 0,
            padding: 0,
        },
        style,
        {
            alignSelf,
            justifySelf,
        },
    );

    // Set syntax-dependant non-overridable styles
    if (gridItemIsNamed(props)) {
        Object.assign(itemStyle, {
            gridArea: props.area,
        });
    } else {
        Object.assign(itemStyle, {
            gridColumn: props.column,
            gridColumnEnd: props.columnEnd,
            gridColumnStart: props.columnStart,
            gridRow: props.row,
            gridRowEnd: props.rowEnd,
            gridRowStart: props.rowStart,
        });
    }

    return (
        <section {...rest} style={itemStyle}>
            {children}
        </section>
    );
};
