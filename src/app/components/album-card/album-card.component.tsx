import React from 'react';

// Material UI
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
// Model
import { Album } from '../../models/album.model';
// Style
import { useStyles } from './album-card.component.style';

interface AlbumCardProps {
    album: Album
}

export default function AlbumCard(props: AlbumCardProps): JSX.Element {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.album.imgSrc}
                    title={props.album.title}
                />
                <CardContent>
                    <Typography variant="h6">
                        {`# ${props.album.rank}`}
                    </Typography>
                    <Typography noWrap>
                        {props.album.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" noWrap>
                        {props.album.artist}
                    </Typography>
                    <Typography noWrap>
                        {props.album.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <Button size="small" color="primary">
                    iTunes
                </Button>
            </CardActions>
        </Card>
    );
}