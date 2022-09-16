import React, { useState } from 'react';

const defaultPos = { top: '80vh', left: '48vw' };

export default function Game() {
    const [position, setPosition] = useState(defaultPos);

    function handleKey(event) {
        const top = Number(position.top.slice(0, -2));
        const left = Number(position.left.slice(0, -2));
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (top - 10 < 10) break;
                setPosition({ ...position, top: `${top - 10}vh` });
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (top + 10 > 80) break;
                setPosition({ ...position, top: `${top + 10}vh` });
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (left - 4 < 0) break;
                setPosition({ ...position, left: `${left - 4}vw` });
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (left + 4 > 97) break;
                setPosition({ ...position, left: `${left + 4}vw` });
                break;
            default:
                break;
        }
    }

    return (
        <div id="game-board" tabIndex={0} onKeyDown={handleKey}>
            <div id="player" style={position}></div>
            <div className="row grass"></div>
            <div className="row water"></div>
            <div className="row water"></div>
            <div className="row grass"></div>
            <div className="row street"></div>
            <div className="row street"></div>
            <div className="row street"></div>
            <div className="row grass"></div>
        </div>
    );
}
