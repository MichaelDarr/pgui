import { CSSProperties, FC, Suspense, useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';

import { Router } from './Router';
import { primaryFontFamilyState } from './state/style/font';
import { DivProps } from './types';
import { palette } from './utils/color';
import { getFontFamily } from './utils/font';

export const App: FC = () => {
    return (
        <RecoilRoot>
            <GlobalStyle/>
            <AppContainer>
                <Suspense fallback={<p>loading...</p>}>
                    <Router />
                </Suspense>
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
        const openSans = getFontFamily('Open Sans');
        openSans.load().then(() => {
            if (!cancelled) {
                setPrimaryFontFamily(openSans.cssFontFamily)
            }
        }).catch(err => {
            console.warn(`failed to load open sans font: ${String(err)}`);
        });
        return () => {
            cancelled = true;
        }
    }, []);

    return (
        <style>
            {`
                body {
                    color: ${palette.black};
                    margin: 0px;
                    padding: 0px;
                    font-family: ${primaryFontFamily};
                }
            `}
        </style>
    )
};
