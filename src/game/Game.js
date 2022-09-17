import React, { useState, useEffect } from 'react';

//default position for player
const defaultPos = { top: '80vh', left: '48vw' };

//helper function to animate obstacles
function createAndMove(freq, obstacle, parent) {
    //TODO: set an interval that creates obstacles and changes stlye left to end of the page which will cause movement
    // console.log('car');
    setInterval(() => {
        //this c-l triggers only after saving and clicking somewhere else.....what?
        console.log('wut');
        //rest of this doesnt trigger
        const obst = document.createElement('div');
        obst.className = obstacle;
        obst.style = { left: '300vh' };
        parent.appendChild(obst);
    }, freq);
}

export default function Game() {
    const [position, setPosition] = useState(defaultPos);

    const streets = Array.from(document.getElementsByClassName('street'));
    const logs = Array.from(document.getElementsByClassName('water'));

    if (streets)
        streets.forEach(street => {
            createAndMove(3000, 'car', street);
        });

    //Player movement
    function handleKey(event) {
        const moveLeft = 2;
        const top = Number(position.top.slice(0, -2));
        const left = Number(position.left.slice(0, -2));
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                //TODO: change 'if' for winning
                //set pos to start, increase points
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
                if (left - moveLeft < 0) break;
                setPosition({ ...position, left: `${left - moveLeft}vw` });
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (left + moveLeft > 96) break;
                setPosition({ ...position, left: `${left + moveLeft}vw` });
                break;
            default:
                break;
        }
    }

    return (
        <div id="game-board" tabIndex={0} onKeyDown={handleKey}>
            <div id="player" style={position}></div>
            <div className="row grass"></div>
            <div className="row water">
                <div className="log"></div>
            </div>
            <div className="row water">
                <div className="log"></div>
            </div>
            <div className="row grass"></div>
            <div className="row street">
                <div className="car"></div>
            </div>
            <div className="row street">
                <div className="bus"></div>
            </div>
            <div className="row street">
                <div className="car"></div>
            </div>
            <div className="row grass"></div>
        </div>
    );
}
