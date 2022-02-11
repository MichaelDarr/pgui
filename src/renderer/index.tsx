import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

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
            <Provider store={window.electron.store}>
                <App/>
            </Provider>
        </ErrorBoundary>
    </StrictMode>,
    document.getElementById('root'),
);
