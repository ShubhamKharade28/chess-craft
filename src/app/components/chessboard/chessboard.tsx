"use client";
import { useEffect } from 'react';

import './chessboard.css';
import getInitialBoard from './initialBoard';
import { isValidMove, getBlackPawnMoves, 
    getKnightMoves, getBishopMoves, getRookMoves, getQueenMoves,
     getKingMoves, getWhitePawnMoves, } from './validMoves';
import Piece from '../piece/piece';
import { PieceType, ChessBoardPropsTypes } from '../../types/types';
import { isInCheck } from './inCheck';

const Board = ({chessboard, setChessboard, 
    validMoves, setValidMoves,
    isMoving, setIsMoving,
    curr, setCurr,
    currPlayer, setCurrPlayer,
    winner, setWinner,
    isBlackInCheck, setBlackInCheck,
    isWhiteInCheck, setWhiteInCheck,
    role,
    emitBlackInCheckState, emitBoardState, emitCurrPlayerState, emitCurrPosState,
    emitWhiteInCheckState, emitWinnerState
    } : ChessBoardPropsTypes) => {

    useEffect(() => {
        initializeBoard();
    },[]);

    const initializeBoard = () => {
        const board = getInitialBoard();
        setChessboard(board);
    }

    const showMoves = (row:number, col:number, piece:PieceType) => {
        if(winner) return;
        // if clicked again on same

        if(currPlayer && role !== 'black') return;
        if(!currPlayer && role === 'black') return;

        if(isMoving && curr.x == row && curr.y === col){
            setValidMoves([]);
            setIsMoving(false);
            return;
        }

        // is black in check
        if(currPlayer && isInCheck(chessboard,'black')){
            emitBlackInCheckState(true);
        }

        // is white in check
        if(!currPlayer && isInCheck(chessboard,'white')){
            emitWhiteInCheckState(true);
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
        emitCurrPosState({x: row, y: col});
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
                    emitBoardState(prev);
                    return prev;
                }else emitBlackInCheckState(false);

                if(!currPlayer && isInCheck(board,'white')){
                    emitWhiteInCheckState(true);
                    return prev;
                }else emitBlackInCheckState(false);

                if(prevPiece?.title === 'king'){
                    let wnr = prevPiece.color === 'black' ? 'white' : 'black';
                    emitWinnerState(wnr);
                }

                emitBoardState(board);
                return board;
            });
            emitBoardState(chessboard);
        }
        setValidMoves([]);
        setIsMoving(false);
        emitCurrPlayerState(!currPlayer);
    }

    const isReverse = (role === 'black');

    return (
        <div className={isReverse ? "board reverse": "board normal" }>
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