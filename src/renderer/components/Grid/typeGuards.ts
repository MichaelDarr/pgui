
import { GridItemNamed, GridItemPlaced, GridManual, GridShorthand } from './types';

export const gridIsShorthand = (
    grid: GridManual|GridShorthand
): grid is GridShorthand => (
    typeof Reflect.get(grid, 'template') === 'string'
);

export const gridItemIsNamed = (
    gridItem: GridItemNamed|GridItemPlaced
): gridItem is GridItemNamed => (
    typeof Reflect.get(gridItem, 'area') === 'string'
);
