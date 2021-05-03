import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AlbumCard from '../../components/album-card/album-card.component';
import Header from '../../components/header/header.component';
import { Album } from '../../models/album.model';

import { useStyles } from './home.page.style';

const HomePage = (): JSX.Element => {
    const classes = useStyles();

    // State
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => res.json())
            .then((album) => {
                setAlbums(
                    album.feed.entry.map((entry: any, index: number) => ({
                        title: entry['im:name'].label,
                        link: entry.id.label,
                        rank: index + 1,
                        price: entry['im:price'].label,
                        artist: entry['im:artist'].label,
                        imgSrc:
                        entry['im:image'].length > 0
                            ? entry['im:image'][2].label
                            : null,
                    }))
                );
            })
            .catch((error: any) => error);
    }, []);

    return (
        <>
            <Header />
            <Grid container className={classes.root} spacing={3}>
                <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="h2" align="center">Top 100 albums iTunes</Typography>
                        <Grid container justify="center" spacing={1}>
                            {
                                albums.map((album: Album, index: number) => (
                                    <Box key={index} flexWrap="wrap">
                                        <AlbumCard album={album}/>
                                    </Box>
                                ))
                            }
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default (HomePage);
