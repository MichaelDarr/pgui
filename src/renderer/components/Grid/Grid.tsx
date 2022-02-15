import { CSSProperties, FC } from 'react';

import type { GridManual, GridShorthand } from './types';
import { gridIsShorthand } from './typeGuards';

export const Grid: FC<GridManual|GridShorthand> = (props) => {
    const {
        alignContent,
        alignItems,
        children,
        display = 'grid',
        fillParent,
        justifyContent,
        justifyItems,
        style,
        ...rest
    } = props;

    // Initialize style object with defaults, overriding grid-related styles.
    const gridStyle: CSSProperties = Object.assign(
        {
            margin: 0,
            padding: 0,
        },
        style,
        {
            alignContent,
            alignItems,
            display,
            justifyContent,
            justifyItems,
        },
    );

    if (fillParent) {
        Object.assign(gridStyle, {
            height: '100%',
            width: '100%',
        });
    }

    // Set syntax-dependant non-overridable styles
    if (gridIsShorthand(props)) {
        Object.assign(gridStyle, {
            gridTemplate: props.template,
        });
        Reflect.deleteProperty(rest, 'template');
    } else {
        Object.assign(gridStyle, {
            gridAutoColumns: props.autoColumns,
            gridAutoFlow: props.autoFlow,
            gridAutoRows: props.autoRows,
            gridColumnEnd: props.columnEnd,
            gridColumnGap: props.columnGap,
            gridColumnStart: props.columnStart,
            gridRowEnd: props.rowEnd,
            gridRowGap: props.rowGap,
            gridRowStart: props.rowStart,
            gridTemplateAreas: props.templateAreas,
            gridTemplateColumns: props.templateColumns,
            gridTemplateRows: props.templateRows,
        });
        Reflect.deleteProperty(rest, 'autoColumns');
        Reflect.deleteProperty(rest, 'autoFlow');
        Reflect.deleteProperty(rest, 'autoRows');
        Reflect.deleteProperty(rest, 'columnEnd');
        Reflect.deleteProperty(rest, 'columnGap');
        Reflect.deleteProperty(rest, 'columnStart');
        Reflect.deleteProperty(rest, 'rowEnd');
        Reflect.deleteProperty(rest, 'rowGap');
        Reflect.deleteProperty(rest, 'rowStart');
        Reflect.deleteProperty(rest, 'templateAreas');
        Reflect.deleteProperty(rest, 'templateColumns');
        Reflect.deleteProperty(rest, 'templateRows');
    }

    return (
        <section {...rest} style={gridStyle}>
            {children}
        </section>
    )
};
