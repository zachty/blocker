import './App.css';
import Header from './Header';
import Game from './game/Game';
import SpotPlayer from './SpotPlayer';

function App() {
    return (
        <div className="App">
            <Header />
            <Game />
            <SpotPlayer />
        </div>
    );
}

export default App;
