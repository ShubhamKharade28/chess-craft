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
    if(row==1 && row+2 < 8 && !board[row+2][col]){
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
                y: col+1,
            })
        }
    }
    return validMoves;
}

export const getKnightMoves = (board:BoardType, row: number, col: number) => {
    let currColor = board[row][col]?.color;
    const validMoves: Array<Coords> = [];
    let moves = [[2,-1],[2,1],[1,2],[1,-2],[-1,-2],[1,-2],[-2,-1],[-2,1]]
    moves.forEach((move) => {
        let x = move[0] + row;
        let y = move[1] + col;
        if(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(!piece || piece.color !== currColor){
                validMoves.push({x,y});
            }
        }
    });
    return validMoves;
}

export const getBishopMoves = (board: BoardType, row: number, col: number) => {
    let currColor = board[row][col]?.color;
    const validMoves: Array<Coords> = [];
    const moves = [[1,-1],[1,1],[-1,-1],[-1,1]];
    moves.forEach((move) => {
        let dx = move[0], dy = move[1];
        let x = row + dx;
        let y = col + dy;
        while(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(piece){
                if(piece.color !== currColor){
                    validMoves.push({x,y});
                }
                break;
            }
            validMoves.push({x,y});
            x += dx;
            y += dy;
        }
    });
    return validMoves;
}

export const getRookMoves = (board: BoardType, row: number, col: number) => {
    let currColor = board[row][col]?.color;
    const validMoves: Array<Coords> = [];
    const moves = [[-1,0],[1,0],[0,-1],[0,1]];
    moves.forEach((move) => {
        let dx = move[0], dy = move[1];
        let x = row + dx, y = col + dy;
        while(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(piece){
                if(piece.color !== currColor){
                    validMoves.push({x,y});
                }
                break;
            }
            validMoves.push({x,y});
            x += dx;
            y += dy;
        }
    });
    return validMoves;
}

export const getQueenMoves = (board: BoardType, row: number, col: number) => {
    let currColor = board[row][col]?.color;
    const validMoves: Array<Coords> = [];
    const moves = [[-1,0],[1,0],[0,-1],[0,1],[1,-1],[1,1],[-1,-1],[-1,1]];
    moves.forEach((move) => {
        let dx = move[0], dy = move[1];
        let x = row + dx, y = col + dy;
        while(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(piece){
                if(piece.color !== currColor){
                    validMoves.push({x,y});
                }
                break;
            }
            validMoves.push({x,y});
            x += dx;
            y += dy;
        }
    });
    return validMoves;
}

export const getKingMoves = (board: BoardType, row: number, col: number) => {
    let currColor = board[row][col]?.color;
    const validMoves: Array<Coords> = [];
    const moves = [[-1,0],[1,0],[0,-1],[0,1],[1,-1],[1,1],[-1,-1],[-1,1]];
    moves.forEach((move) => {
        let x = row + move[0], y = col + move[1];
        if(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(!piece || piece.color !== currColor){
                validMoves.push({x,y});
            }
        }
    });
    return validMoves;
}

export const getWhitePawnMoves = (board:BoardType, row:number, col:number) => {
    const validMoves:Array<Coords> = [];
    // one step front
    if(row-1 >= 0 && !board[row-1][col]){
        validMoves.push({
            x: row-1,
            y: col,
        })
        // two step front
        if(row==6 && row-2 < 8 && !board[row-2][col]){
            validMoves.push({
                x: row-2,
                y: col,
            })
        }
    }
    
    // left top corner 
    if(row-1 >= 0 && col-1 >= 0){
        let leftCornerPiece = board[row-1][col-1];
        if(leftCornerPiece && leftCornerPiece.color === 'black'){
            validMoves.push({
                x: row-1,
                y: col-1,
            })
        }
    }
    // right top corner
    if(row-1 >= 0 && col+1 < 8){
        let rightCornerPiece = board[row-1][col+1];
        if(rightCornerPiece && rightCornerPiece.color === 'black'){
            validMoves.push({
                x: row-1,
                y: col+1,
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