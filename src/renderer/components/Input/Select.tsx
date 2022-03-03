import { DetailedHTMLProps, FC, SelectHTMLAttributes} from 'react';

import { palette } from 'renderer/common/color';

export type Select = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

export const Select: FC<Select> = ({
    children,
    style,
    ...props
}) => {
    return (
        <select
            {...props}
            style={{
                backgroundColor: palette.white,
                border: `1px solid ${palette.gray}`,
                borderRadius: '0.25rem',
                boxSizing: 'border-box',
                color: palette.darkGray,
                cursor: 'pointer',
                fontSize: '0.95rem',
                padding: '0.375rem 0rem',
                width: '100%',
                ...style,
            }}
        >
            {children}
        </select>
    );
};
