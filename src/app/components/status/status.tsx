"use client";

import './status.css';

import { VscDebugRestart } from 'react-icons/vsc';

const StatusBar = ({currPlayer,winner,reset}: {currPlayer:boolean; winner: string | null; reset: () => void}) => {
    return (
        <div className="statusbar">
            { !winner && 
            (<div className={`player-turn ${currPlayer ? 'active':''}`}>Black's turn</div>)}
            { !winner && 
            (<div className={`player-turn ${!currPlayer ? 'active': ''}`}>White's turn</div>)}
            
            <button onClick={reset} className='reset'>
            {
                winner ? <span>Play again</span> : <span>Reset</span>
            }
                <VscDebugRestart />
            </button>
            <div className={`game-result ${winner ? 'visible':''}`}>
                { winner ?
                    <span>{winner} wins!</span>
                    : 
                    <span>Game is running</span>
                }
            </div>
        </div>
    )
}

export default StatusBar;