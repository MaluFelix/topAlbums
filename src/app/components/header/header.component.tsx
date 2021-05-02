import React from 'react';

// Material
import {
    AppBar,
    Toolbar,
    Box
} from '@material-ui/core';
// Components
import { ToggleTheme } from '../../shared/components/toggle-theme/toggle-theme.component';
//Style
import { useStyles } from './header.component.style';

export default function Header(): JSX.Element {

    const classes = useStyles();

    return (
        <AppBar
            position="fixed"
            className={classes.appBar}
        >
            <Toolbar>
                <Box display="flex" flexDirection="row-reverse" flex="auto">
                    <ToggleTheme />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
