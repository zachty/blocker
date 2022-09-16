import React, { useState, useEffect } from 'react';

//dummy object for displaying this info
const dumTrack = {
    name: '',
    album: {
        images: [{ url: '' }],
    },
    artists: [{ name: '' }],
};

//TODO: set this as active when person logs in so you dont have to change it from the spotify client
//TODO: make it prettier, grey background, info on the left functional icons in center, spotify logo on the right
export default function SpotPlayer(props) {
    const [player, setPlayer] = useState({});
    const [paused, setPaused] = useState(true);
    const [track, setTrack] = useState(dumTrack);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Blocker Web App',
                getOAuthToken: cb => {
                    cb(props.token);
                },
                volume: 0.5,
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', state => {
                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                //TODO: figure out how this works
                // player.getCurrentState().then(state => {
                //     !state ? setActive(false) : setActive(true);
                // });
            });

            player.connect();
        };
    }, []);

    //TODO: add volume up and down button to move volume by .1
    return (
        <div id="spotify-player">
            <div className="track-info">
                <img src={track.album.images[0].url} alt="album cover" />
                <p>{track.name} </p>
                <p>by {track.artists[0].name} </p>
            </div>
            <div>
                <button onClick={() => player.previousTrack()}>Previous</button>
                <button onClick={() => player.togglePlay()}>
                    {paused ? 'Play' : 'Pause'}
                </button>
                <button onClick={() => player.nextTrack()}>Next</button>
            </div>
            <div>PLACEHOLDER FOR SPOTIFY LOGO</div>
        </div>
    );
}
