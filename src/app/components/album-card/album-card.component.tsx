import React, { useEffect, useState } from 'react';

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
// Storage
import Storage from '../../shared/services/web-storage.service';
import { STORAGE_KEY } from '../../shared/constants/storage.constants';
// Style
import { useStyles } from './album-card.component.style';

interface AlbumCardProps {
    album: Album
}

export default function AlbumCard(props: AlbumCardProps): JSX.Element {
    const classes = useStyles();

    // Consts
    const getArray = JSON.parse(localStorage.getItem(STORAGE_KEY.FAVORITES) || '0') ;
    // State
    const [favorites, setFavorites] = useState<number[]>([]);

    const addfavorite = (album: Album) => {
        const favArray = favorites;
        let addFavArray = true;

        favArray.map((item: number) => {
            if (item === album.rank) {
                favArray.splice(item, 1);
                addFavArray = false;
            }
        });

        if (addFavArray) {
            favArray.push(album.rank);
        }

        setFavorites([...favArray]);

        Storage.local.set(STORAGE_KEY.FAVORITES, JSON.stringify(favorites));

        const storage = Storage.local.get(STORAGE_KEY.FAVITEM + (album.rank));
        if (storage === null) {
            Storage.local.set((STORAGE_KEY.FAVITEM + (album.rank)), JSON.stringify(album));
        } else {
            Storage.local.remove(STORAGE_KEY.FAVITEM + (album.rank));
        }
    };

    useEffect(() => {
        if (getArray !== 0) {
            setFavorites([...getArray]);
        }
    }, []);

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
            <CardActions className={classes.button}>
                <IconButton aria-label="add to favorites" onClick={() => addfavorite(props.album)}>
                    {
                        Storage.local.get(STORAGE_KEY.FAVITEM+(props.album.rank)) ? <FavoriteIcon style={{ color: 'red'}}/> : <FavoriteIcon />
                    }
                </IconButton>
                <Button target="_blank" href={props.album.link} color="primary">
                    iTunes
                </Button>
            </CardActions>
        </Card>
    );
}