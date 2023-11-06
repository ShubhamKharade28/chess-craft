import { BoardType,Coords } from "./types";

export const getBlackPawnMoves = (board:BoardType, row:number, col:number) => {
    const validMoves:Array<Coords> = [];
    
    // one step front
    if(row+1<8 && !board[row+1][col]){
        validMoves.push({
            x: row+1,
            y: col,
        })
    }

    // two step front
    if(row==1 && row+2 < 8 && !board[row+1][col]){
        validMoves.push({
            x: row+2,
            y: col,
        })
    }
    
    // left top corner 
    if(row+1 < 8 && col-1 >= 0){
        let leftCornerPiece = board[row+1][col-1];
        if(leftCornerPiece && leftCornerPiece.color === 'white'){
            validMoves.push({
                x: row+1,
                y: col-1,
            })
        }
    }

    // right top corner
    if(row+1 < 8 && col+1 < 8){
        let rightCornerPiece = board[row+1][col+1];
        if(rightCornerPiece && rightCornerPiece.color === 'white'){
            validMoves.push({
                x: row+1,
                y: col-1,
            })
        }
    }
    return validMoves;
}

export const isValidMove = (validMoves: Array<Coords>, x: number, y: number) => {
    for(let i=0;i<validMoves.length;i++){
        if(validMoves[i].x == x && validMoves[i].y == y)
            return true;
    }
    return false;
}