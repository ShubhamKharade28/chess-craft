"use client";
import { useEffect, useState } from 'react';

import '@/styles/chessboard.css';
import getInitialBoard from './initialBoard';
import { isValidMove, getBlackPawnMoves } from './validMoves';
import Piece from '../piece/piece';

import { PieceType, Coords } from './types';

const Board = () => {
    
    const [chessboard, setChessboard] = useState<Array<Array<PieceType>>>([]);
    const [validMoves, setValidMoves] = useState<Array<Coords>>([]);

    useEffect(() => {
        initializeBoard();
    },[])

    const initializeBoard = () => {
        const board = getInitialBoard();
        setChessboard(board);
    }

    const showMoves = (row:number, col:number, piece:PieceType) => {
        if(!piece) {
            setValidMoves([]);
            return;
        }
        let color = piece.color;
        let title = piece.title;
        if(color === 'black'){
            switch(title){
                case 'pawn':
                    let blackPawnMoves = getBlackPawnMoves(chessboard,row,col);
                    console.log(blackPawnMoves);
                    setValidMoves(blackPawnMoves);
                    break;
                default:
                    setValidMoves([]);
            }
        }else{
            switch(title){
                default:
                    setValidMoves([]);
            }
        }
    }

    return (
        <div className="board">
            {chessboard.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((piece, colIndex) => {
                        let color = (rowIndex+colIndex)%2 ? "white":"black";
                        let isValid = isValidMove(validMoves,rowIndex,colIndex);
                        return(
                        <div key={colIndex} className={`square ${color}`}
                            onClick={() => showMoves(rowIndex,colIndex,piece)}
                        >
                            { isValid && <div className="green-dot"></div> }
                            { piece && 
                            (<div >
                                <Piece piece={piece}/>
                            </div>) }
                        </div>)
                    })}
                </div>
            ))}
        </div>
    )
}

export default Board;