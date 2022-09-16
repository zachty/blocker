window.onSpotifyWebPlaybackSDKReady = () => {
    const token =
        'BQBLtNnlsk-a2IyYssA1rO25-NuUtFBBq2pzll_BGrFug9wLfDsH5OOUYAyWudzjw0Mfut6KUE_LPzes08Pcvfu5vNWGXpA6NKCDvLiPi5n-UuzHCvP7e6tWGv0tJHRg8yNLeuF0UIP_Atkc_YroYRHEcBl_PbmpzykuEcZ9ulIEKR8SKXBgi24Xhr3fmnYOLyoz';
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
            cb(token);
        },
        volume: 0.5,
    });
    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    document.getElementById('togglePlay').onclick = function () {
        player.togglePlay();
    };

    document.getElementById('skipLast').onclick = function () {
        player.previousTrack();
    };

    document.getElementById('skipNext').onclick = function () {
        player.nextTrack();
    };

    player.connect();
};
