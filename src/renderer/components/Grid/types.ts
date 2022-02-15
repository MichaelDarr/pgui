import { SectionProps } from 'renderer/types';


interface GridBase extends SectionProps {
    alignContent?: 'center'|'end'|'space-around'|'space-between'|'space-evenly'|'start'|'stretch';
    alignItems?: 'baseline'|'center'|'end'|'start'|'stretch';
    display?: 'inline-grid'|'grid';
    fillParent?: boolean;
    justifyContent?: 'center'|'end'|'space-around'|'space-between'|'space-evenly'|'start'|'stretch';
    justifyItems?: 'center'|'end'|'start'|'stretch';
}

export interface GridManual extends GridBase {
    autoColumns?: string;
    autoFlow?: 'column'|'column dense'|'row'|'row dense';
    autoRows?: string;
    columnEnd?: string;
    columnGap?: string;
    columnStart?: string;
    rowEnd?: string;
    rowGap?: string;
    rowStart?: string;
    templateAreas?: string;
    templateColumns?: string;
    templateRows?: string;
}

export interface GridShorthand extends GridBase {
    template: string;
}

interface GridItemBase extends SectionProps {
    alignSelf?: 'center'|'end'|'start'|'stretch';
    justifySelf?: 'center'|'end'|'start'|'stretch';
}

export interface GridItemNamed extends GridItemBase {
    area: string;
}

export interface GridItemPlaced extends GridItemBase {
    column?: string;
    columnEnd?: string;
    columnStart?: string;
    row?: string;
    rowEnd?: string;
    rowStart?: string;
}
