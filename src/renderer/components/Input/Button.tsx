import {
    ButtonHTMLAttributes,
    CSSProperties,
    DetailedHTMLProps,
    FC,
    MouseEventHandler,
    useMemo,
    useState
} from 'react';

import { palette } from 'renderer/utils/color';

export type Button = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button: FC<Button> = ({
    children,
    disabled,
    style,
    onMouseEnter,
    onMouseLeave,
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter: MouseEventHandler<HTMLButtonElement> = e => {
        if (onMouseEnter) {
            onMouseEnter(e);
        }
        if (!e.defaultPrevented) {
            setIsHovered(true);
        }
    };

    const handleMouseLeave: MouseEventHandler<HTMLButtonElement> = e => {
        if (onMouseLeave) {
            onMouseLeave(e);
        }
        if (!e.defaultPrevented) {
            setIsHovered(false);
        }
    };

    const buttonStyle = useMemo(() => {
        const baseStyle: CSSProperties = {
            backgroundColor: palette.blue,
            border: 'none',
            borderRadius: '0.25rem',
            boxSizing: 'border-box',
            color: palette.white,
            fontSize: '1rem',
            padding: '0.375rem 0.75rem',
            width: '100%',
            ...style,
        }
        if (disabled) {
            Object.assign(baseStyle, {
                cursor: 'not-allowed',
                opacity: 0.6,
            });
        } else if (isHovered) {
            Object.assign(baseStyle, {
                backgroundColor: palette.stoneGray,
                cursor: 'pointer',
            });
        }
        return baseStyle;
    }, [disabled, isHovered, style]);

    return (
        <button
            {...props}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            style={buttonStyle}
        >
            {children}
        </button>
    );
};
