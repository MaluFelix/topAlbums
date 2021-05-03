import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        width: 200,
        borderRadius: 6,
        margin: theme.spacing(3, 2, 3)
    },
    media: {
        height: 200,
    },
}));