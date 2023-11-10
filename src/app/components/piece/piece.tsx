"use client";
import { PieceType } from "../chessboard/types";
import './piece.css';

import { FaChessKing,FaChessQueen, FaChessBishop,
    FaChessKnight, FaChessRook, FaChessPawn }
    from 'react-icons/fa';

const Piece = ({piece}: {piece:PieceType}) => {
    switch(piece?.title){
        case 'king': 
            return <FaChessKing className="piece" data-color={piece.color}/>
        case 'queen':
            return <FaChessQueen className="piece" data-color={piece.color}/>
        case 'knight':
            return <FaChessKnight className="piece" data-color={piece.color}/>
        case 'bishop':
            return <FaChessBishop className="piece" data-color={piece.color}/>
        case 'rook':
            return <FaChessRook className="piece" data-color={piece.color}/>
        case 'pawn':
            return <FaChessPawn className="piece" data-color={piece.color}/>
        default:
            return <span className="piece" data-color={piece?.color}>NA</span>;
    }
}

export default Piece;