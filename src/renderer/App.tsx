import { CSSProperties, FC, useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';

import { primaryFontFamilyState } from './state/style/font';
import { DivProps } from './types';
import { getFontFamily } from './utils/font';
import { Connect } from './views/Connect';

export const App: FC = () => {
    return (
        <RecoilRoot>
            <GlobalStyle/>
            <AppContainer>
                <Connect />
            </AppContainer>
        </RecoilRoot>
    );
};

const AppContainer: FC<DivProps> = ({ children, style, ...props }) => {
    const containerStyle: CSSProperties = Object.assign({
        height: '100vh',
        width: '100vw',
        margin: '0',
        padding: '0',
    }, style);

    return (
        <div {...props} style={containerStyle}>
            {children}
        </div>
    );
};

const GlobalStyle: FC = () => {
    const [primaryFontFamily, setPrimaryFontFamily] = useRecoilState(primaryFontFamilyState);

    useEffect(() => {
        let cancelled = false;
        const montserrat = getFontFamily('Montserrat');
        montserrat.load().then(() => {
            if (!cancelled) {
                setPrimaryFontFamily(montserrat.cssFontFamily)
            }
        }).catch(err => {
            console.warn(`failed to load montserrat font: ${String(err)}`);
        });
        return () => {
            cancelled = true;
        }
    }, []);

    return (
        <style>
            {`
                body {
                    margin: 0px;
                    padding: 0px;
                    font-family: ${primaryFontFamily};
                }
            `}
        </style>
    )
};
