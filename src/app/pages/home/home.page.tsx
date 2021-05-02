import React, { useEffect, useState } from 'react';
import Header from '../../components/header/header.component';
import { Album } from '../../models/album.model';

const HomePage = () => {
    // State
    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => res.json())
            .then((album) => {
                setAlbums(
                    album.feed.entry.map((entry: any, index: number) => ({
                        title: entry.title.label,
                        link: entry.id.label,
                        rank: index + 1,
                        price: entry["im:price"].label,
                        artist: entry["im:artist"].label,
                        imgSrc:
                        entry["im:image"].length > 0
                            ? entry["im:image"][0].label
                            : null,
                    }))
                );
            })
            .catch((error: any) => error);
    }, []);

    console.log(albums);

    return (
        <Header />
    );
};

export default (HomePage);
