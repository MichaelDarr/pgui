import type { HTMLAttributes, SVGProps as ReactSVGProps } from 'react';

export type DivProps = HTMLAttributes<HTMLDivElement>;
export type ElementProps = HTMLAttributes<HTMLElement>;
export type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
export type SectionProps = ElementProps;
export type SpanProps = HTMLAttributes<HTMLSpanElement>;
export type SVGProps = ReactSVGProps<SVGSVGElement>;

export interface TestResult {
    success: boolean;
    message?: string;
}
