import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import { ThemeProvider } from './app/shared/components/theme-provider/theme-provider.component';

ReactDOM.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
