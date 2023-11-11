"use client";
import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket/socket-client';

import './game.css';
import Board from "../components/chessboard/chessboard";
import { BoardType, Coords } from '../types/types';
import getInitialBoard from '../components/chessboard/initialBoard';
import StatusBar from '../components/status/status';
import ConnectingScreen from '../components/connecting/connecting';
import WaitScreen from '../components/waiting/waiting';

const Game = () => {
    // Hooks related to game states
    const [chessboard, setChessboard] = useState<BoardType>([]);
    const [validMoves, setValidMoves] = useState<Array<Coords>>([]);
    const [isMoving, setIsMoving] = useState(false);
    const [curr, setCurr] = useState<Coords>({x:-1,y:-1});
    const [currPlayer, setCurrPlayer] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isBlackInCheck, setBlackInCheck] = useState(false);
    const [isWhiteInCheck, setWhiteInCheck] = useState(false);

    // Hooks related to sockets
    const [isConnected, setIsConnected] = useState(false);
    const [room, setRoom] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [toStart, setToStart] = useState(false);
    const [opponent, setOpponent] = useState('');

    useEffect(() => {
        function onConnect(){
            setIsConnected(true);
            socket.emit('joinRoom');
        }
        function onDisconnect(){
            setIsConnected(false);
        }
        function onRoomJoined(userRoom: string){
            setRoom(userRoom);
            console.log(userRoom);
        }
        function onRoleAssigned(userRole: string){
            if(!room) {setRole(userRole);}
            console.log(userRole);
        }
        function onOpponentDisconnect(){
            setRole('black');
            setToStart(false);
            setOpponent('');
            reset();
        }
        function onStartGame(opp: string) {
            console.log('Game started');
            console.log(opp);
            setToStart(true);
            setOpponent(opp);
        }
        function onBoardStateChange(board: BoardType){
            // if(board == chessboard) return;
            console.log("Tried to change board state");
            setChessboard(board);
        }
        function onCurrChange(cur: Coords){
            // if(cur == curr) return;
            setCurr(cur);
        }
        function onCurrPlayerChange(curPlayer: boolean){
            // if(curPlayer == currPlayer) return;
            setCurrPlayer(curPlayer);
        }
        function onWinnerChange(winr: string){
            // if(winr == winner) return;
            setWinner(winr);
        }
        function onBlackCheckStateChange(val: boolean){
            // if(val == isBlackInCheck) return;
            setBlackInCheck(val);
        }
        function onWhiteCheckStateChange(val: boolean){
            // if(val == isWhiteInCheck) return;
            setWhiteInCheck(val);
        }

        connect();

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('roomAssigned', onRoomJoined)
        socket.on('roleAssigned', onRoleAssigned);
        socket.on('opponentDisconnect', onOpponentDisconnect);
        socket.on('startGame', onStartGame);
        socket.on('boardStateChange', onBoardStateChange);
        socket.on('currChange', onCurrChange);
        socket.on('currChange', onCurrChange);
        socket.on('currPlayerChange', onCurrPlayerChange);
        socket.on('winnerChange', onWinnerChange);
        socket.on('blackCheckStateChange', onBlackCheckStateChange);
        socket.on('whiteCheckStateChange', onWhiteCheckStateChange);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('roomJoined', onRoomJoined);
            socket.off('roleAssigned', onRoleAssigned);
            socket.off('opponentDisconnect', onOpponentDisconnect);
            socket.off('startGame', onStartGame);
            socket.off('boardStateChange', onBoardStateChange);
            socket.off('currChange', onCurrChange);
            socket.off('currChange', onCurrChange);
            socket.off('currPlayerChange', onCurrPlayerChange);
            socket.off('winnerChange', onWinnerChange);
            socket.off('blackCheckStateChange', onBlackCheckStateChange);
            socket.off('whiteCheckStateChange', onWhiteCheckStateChange);
        }
    }, [opponent]);

    const emitBoardState = (val: BoardType) =>{
        setChessboard(val);
        socket.emit('boardStateChange',{ room, val });
    }

    const emitCurrPosState = (val: Coords) => {
        setCurr(val);
        socket.emit('currChange', { room, val });
    }

    const emitCurrPlayerState = (val: boolean) => {
        setCurrPlayer(val);
        socket.emit('currPlayerChange', { room, val});
    }

    const emitWinnerState = (val: string | null) => {
        socket.emit('winnerChange', { room, val});
    }

    const emitBlackInCheckState = (val: boolean) => {
        socket.emit('blackCheckStateChange', { room, val });
    }

    const emitWhiteInCheckState = (val: boolean) => {
        socket.emit('whiteCheckStateChange', { room, val });
    }

    // Socket handling functions
    function connect() {
        socket.connect();
    }
    function disconnect() {
        socket.disconnect();
    }

    const reset = () => {
        setChessboard(getInitialBoard());
        setCurrPlayer(true);
        setIsMoving(false);
        setCurr({x:-1,y:-1});
        setValidMoves([]);
        setWinner(null);
        setWhiteInCheck(false);
        setBlackInCheck(false);
    }

    if(!isConnected){
        return (<div className='game'> <ConnectingScreen /> </div>);
    }

    else if(!toStart){
        return (<div className='game'> <WaitScreen room={room} role={role}/> </div>);
    }

    return (
        <div className="game">
            <StatusBar winner={winner} currPlayer={currPlayer} reset={reset}/>
            <Board 
                role={role}
                chessboard={chessboard} setChessboard={setChessboard}
                validMoves={validMoves} setValidMoves={setValidMoves}
                isMoving={isMoving} setIsMoving={setIsMoving}
                curr={curr} setCurr={setCurr}
                currPlayer={currPlayer} setCurrPlayer={setCurrPlayer}
                winner={winner} setWinner={setWinner}
                isBlackInCheck={isBlackInCheck} setBlackInCheck={setBlackInCheck}
                isWhiteInCheck={isWhiteInCheck} setWhiteInCheck={setWhiteInCheck}

                emitBoardState={emitBoardState}
                emitWhiteInCheckState={emitWhiteInCheckState}
                emitBlackInCheckState={emitBlackInCheckState}
                emitCurrPlayerState={emitCurrPlayerState}
                emitCurrPosState={emitCurrPosState}
                emitWinnerState={emitWinnerState}
            />
        </div>
    )
}

export default Game;