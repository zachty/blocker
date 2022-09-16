import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import Game from './game/Game';
import SpotPlayer from './SpotPlayer';

function App() {
    const [token, setToken] = useState('');

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('/auth/token');
            setToken(data.access_token);
        })();
    }, []);

    return (
        <div className="App">
            <Header />
            <Game />
            {token ? (
                <SpotPlayer token={token} />
            ) : (
                <a href="/auth/login">Login to Spotify</a>
            )}
        </div>
    );
}

export default App;
