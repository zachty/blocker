import React from 'react';

export default function SpotPlayer() {
    return (
        <div>
            <button id="skipLast">Previous</button>
            <button id="togglePlay">Toggle Play</button>
            <button id="skipNext">Next</button>
            <script src="https://sdk.scdn.co/spotify-player.js"></script>
            <script src="./spotScript"></script>
        </div>
    );
}
