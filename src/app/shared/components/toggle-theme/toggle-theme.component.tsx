import React, { useContext } from 'react';
// Material-UI
import { IconButton, Tooltip } from '@material-ui/core';
import { Brightness4, Brightness5 } from '@material-ui/icons';
// Components
import { ThemeContext } from '../theme-provider/theme-provider.component';

export const ToggleTheme = (): JSX.Element => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <Tooltip title={theme === "dark" ? "Modo claro" : "Modo escuro"} arrow>
            <IconButton color="inherit" aria-label="Alternar tema claro/escuro" onClick={toggleTheme}>
                {
                    theme === "dark" ?
                        <Brightness5></Brightness5> :
                        <Brightness4></Brightness4>
                }
            </IconButton>
        </Tooltip>
    );
};
