"use client";
import { useEffect, useState } from 'react';

import './chessboard.css';
import getInitialBoard from './initialBoard';
import { isValidMove, getBlackPawnMoves, 
    getKnightMoves, getBishopMoves, getRookMoves, getQueenMoves,
     getKingMoves, getWhitePawnMoves, } from './validMoves';
import Piece from '../piece/piece';
import { PieceType, Coords } from './types';
import StatusBar from '../status/status';
import { isInCheck } from './inCheck';

const Board = () => {
    
    const [chessboard, setChessboard] = useState<Array<Array<PieceType>>>([]);
    const [validMoves, setValidMoves] = useState<Array<Coords>>([]);
    const [isMoving, setIsMoving] = useState(false);
    const [curr, setCurr] = useState<Coords>({x:-1,y:-1});
    const [currPlayer, setCurrPlayer] = useState(true);
    const [winner, setWinner] = useState<string | null>(null);
    const [isBlackInCheck, setBlackInCheck] = useState(false);
    const [isWhiteInCheck, setWhiteInCheck] = useState(false);

    useEffect(() => {
        initializeBoard();
    },[]);

    const initializeBoard = () => {
        const board = getInitialBoard();
        setChessboard(board);
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

    const showMoves = (row:number, col:number, piece:PieceType) => {
        if(winner) return;
        // if clicked again on same
        if(isMoving && curr.x == row && curr.y === col){
            setValidMoves([]);
            setIsMoving(false);
            return;
        }

        // is black in check
        if(currPlayer && isInCheck(chessboard,'black')){
            setBlackInCheck(true);
        }

        // is white in check
        if(!currPlayer && isInCheck(chessboard,'white')){
            setWhiteInCheck(true);
        }

        // if clicked on valid move, redirect to move function
        if(isMoving && isValidMove(validMoves,row,col)){
            move(row,col);
            setIsMoving(false);
            return;
        }
        // if wrong player
        if(!isMoving && (currPlayer && piece?.color === 'white') || (!currPlayer && piece?.color === 'black')){
            alert('wrong player');
            // setValidMoves([]);
            setIsMoving(false);
            return;
        }

        // if no piece is on clicked position, reset all and return
        if(!piece) {
            setValidMoves([]);
            setIsMoving(false);
            return;
        }
        // get valid moves for piece
        setCurr({x:row,y:col});
        let color = piece.color;
        let title = piece.title;
        switch(title){
            case 'king':
                let kingMoves = getKingMoves(chessboard,row,col);
                setValidMoves(kingMoves);
                break;
            case 'queen':
                let queenMoves = getQueenMoves(chessboard,row,col);
                setValidMoves(queenMoves);
                break;
            case 'rook':
                let rookMoves = getRookMoves(chessboard,row,col);
                setValidMoves(rookMoves);
                break;
            case 'bishop':
                let bishopMoves = getBishopMoves(chessboard,row,col);
                setValidMoves(bishopMoves);
                break;
            case 'knight':
                let knightMoves = getKnightMoves(chessboard,row,col);
                setValidMoves(knightMoves);
                break;
            case 'pawn':
                if(color === 'black'){
                    let blackPawnMoves = getBlackPawnMoves(chessboard,row,col);
                    setValidMoves(blackPawnMoves);
                }else{
                    let whitePawnMoves = getWhitePawnMoves(chessboard,row,col);
                    setValidMoves(whitePawnMoves);
                }
                break;
            default:
                setValidMoves([]);
        }
        setIsMoving(true);
    }

    const move = (x:number, y:number) => {
        if(!isMoving) return;
        if(isValidMove(validMoves,x,y)){
            let piece = chessboard[curr.x][curr.y];
            let prevPiece = chessboard[x][y];
            setChessboard((board) => {
                let prev = board;
                board[x][y] = piece;
                board[curr.x][curr.y] = null;
                
                if(currPlayer && isInCheck(board,'black')){
                    setBlackInCheck(true);
                    return prev;
                }else setBlackInCheck(false);

                if(!currPlayer && isInCheck(board,'white')){
                    setWhiteInCheck(true);
                    return prev;
                }else setBlackInCheck(false);

                if(prevPiece?.title === 'king'){
                    let wnr = prevPiece.color === 'black' ? 'white' : 'black';
                    setWinner(wnr);
                }
                return board;
            })
        }
        setValidMoves([]);
        setIsMoving(false);
        setCurrPlayer(!currPlayer);
    }

    return (
        <div className="board">
            <StatusBar winner={winner} currPlayer={currPlayer} reset={reset}/>
            {chessboard.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((piece, colIndex) => {
                        let color = (rowIndex+colIndex)%2 ? "white":"black";
                        let isValid = isValidMove(validMoves,rowIndex,colIndex);
                        let incheck='';
                        if(piece?.title === 'king'){
                            if(isBlackInCheck && piece.color === 'black')
                                incheck = 'incheck';
                            else if(isWhiteInCheck && piece.color === 'white')
                                incheck = 'incheck';
                        }
                        return(
                        <div key={colIndex} className={`square ${color} ${incheck}`}
                            onClick={() => showMoves(rowIndex,colIndex,piece)}
                        >
                            { isValid && <div className="green-dot"></div> }
                            { piece && 
                            (<Piece piece={piece}/>) }
                        </div>)
                    })}
                </div>
            ))}
        </div>
    )
}

export default Board;