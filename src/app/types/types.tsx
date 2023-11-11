import { Dispatch, SetStateAction, ChangeEvent } from "react";

export type InputTextChange = ChangeEvent<HTMLInputElement>;

export type PieceType = {
    title: string,
    color: string,
} | null;

export type Coords = {
    x: number,
    y: number,
}

export type BoardType = Array<Array<PieceType>>;

export type ValidMovesType = Array<Coords>;

export type mouseEvent = {
    preventDefault : () => {}
};

export type ChessBoardPropsTypes = {
    chessboard: BoardType,
    setChessboard: Dispatch<SetStateAction<BoardType>>
    validMoves: ValidMovesType,
    setValidMoves : Dispatch<SetStateAction<ValidMovesType>>
    isMoving: boolean,
    setIsMoving: Dispatch<SetStateAction<boolean>>
    curr: Coords, 
    setCurr: Dispatch<SetStateAction<Coords>>
    currPlayer: boolean,
    setCurrPlayer: Dispatch<SetStateAction<boolean>>
    winner: string | null,
    setWinner: Dispatch<SetStateAction<string | null>>
    isBlackInCheck: boolean,
    setBlackInCheck: Dispatch<SetStateAction<boolean>>
    isWhiteInCheck: boolean,
    setWhiteInCheck: Dispatch<SetStateAction<boolean>>,
    role: string,
    
    emitBoardState: (x: BoardType) => void,
    emitCurrPosState: (x: Coords) => void,
    emitCurrPlayerState: (x: boolean) => void,
    emitWinnerState: (x: string | null) => void,
    emitBlackInCheckState: (x: boolean) =>  void,
    emitWhiteInCheckState: (x: boolean) => void,
}