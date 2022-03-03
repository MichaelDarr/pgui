import { FC } from 'react';
import { atom, useRecoilState } from 'recoil';

import { randomColorHex } from 'renderer/common/color';
import { SpanProps } from 'renderer/types';

export const colorState = atom<string>({
    key: 'CredentialsFormColor',
    default: randomColorHex(),
});


export const Color: FC<SpanProps> = ({
    onClick,
    style,
    ...props
}) => {
    const [color, setColor] = useRecoilState(colorState);

    return (
        <span
            {...props}
            onClick={e => {
                if (onClick) {
                    onClick(e);
                }
                if (!e.defaultPrevented) {
                    setColor(randomColorHex());
                }
            }}
            style={{
                borderRadius: '4px',
                boxSizing: 'border-box',
                cursor: 'pointer',
                display: 'block',
                height: '100%',
                width: '100%',
                ...style,
                background: color,
            }}
        />
    );
};
