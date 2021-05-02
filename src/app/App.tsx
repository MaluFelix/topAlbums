import React, { Fragment, useContext } from 'react';

// Material UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';

// Components
import { ThemeContext } from './shared/components/theme-provider/theme-provider.component';
import HomePage from './pages/home/home.page';

const App: React.FC = (): JSX.Element => {

    const { theme } = useContext(ThemeContext);

    const materialTheme = createMuiTheme({
        typography: {
            "fontFamily": `"Open Sans", sans-serif`,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 600,
            "fontWeightBold": 700
        },
        palette: {
            primary: {
                light: '#af52bf',
                main: '#9c27b0',
                dark: '#6d1b7b',
                contrastText: '#fff',
            },
            type: theme
        },
    }, ptBR);

    return (
        <Fragment>
            <ThemeProvider theme={materialTheme}>
                <CssBaseline />
                <HomePage />
            </ThemeProvider>
        </Fragment>
    );
};

export default App;
