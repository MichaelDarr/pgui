import { FC } from 'react';
import { atom, useRecoilState } from 'recoil';

import { SpanProps } from 'renderer/types';
import { randomColorHex } from 'renderer/utils/color';

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
                borderRadius: '2px',
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
