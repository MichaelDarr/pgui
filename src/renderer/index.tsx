import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

ReactDOM.render(
    <StrictMode>
        <ErrorBoundary>
        <style>{`
                body {
                    margin: 0px;
                    padding: 0px;
                }
        `}</style>
            <App/>
        </ErrorBoundary>
    </StrictMode>,
    document.getElementById('root'),
);
