import { BoardType } from "../../types/types";

export const isInCheck = (board: BoardType,color: string):boolean => {
    let kingPos = [-1,-1];
    let enemyColor = (color === 'black') ? 'white':'black';
	let ans = false;

    // Get position of king of corresponding color
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            let piece = board[i][j];
            if(piece?.title === 'king' && piece.color === color){
                kingPos = [i,j];
                break;
            }
        }
    }
    // Check for all possible checks
    // 1. Rook and Queen, along vertical and horital paths
    let moves = [[-1,0],[-1,1],[1,0],[1,1]];
    moves.forEach((move) => {
        let dx = move[0], dy = move[1];
        let x = kingPos[0] + dx;
        let y = kingPos[1] + dy;
        while(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(piece){
                if(piece.color === enemyColor && (piece.title === 'queen' || piece.title === 'rook')){
                    ans = true;
                }
                break;
            }
            x += dx;
            y += dy;
        }
    })
    if(ans) return ans;

    // 2. Bishop and Queen, along cross paths
    moves = [[-1,-1],[-1,1],[1,-1],[1,1]];
    moves.forEach((move) => {
        let dx = move[0], dy = move[1];
        let x = kingPos[0] + dx;
        let y = kingPos[1] + dy;
        while(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(piece){
                if(piece.color === enemyColor && (piece.title === 'queen' || piece.title === 'bishop')){
                    ans = true;
                }
                break;
            }
            x += dx;
            y += dy;
        }
    });
    if(ans) return ans;

    // 3. King, along all 8 directions 
    moves = [[-1,0],[-1,1],[1,0],[1,1],[-1,-1],[-1,1],[1,-1],[1,1]];
    moves.forEach((move) => {
        let x = move[0] + kingPos[0];
        let y = move[1] + kingPos[1];
        if(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(piece && piece.color === enemyColor && piece.title === 'king'){
                ans = true;
            }
        }
    });
    if(ans) return ans;

    // 4. Knights
    moves = [[-2,-1],[-2,1],[2,-1],[2,1]];
    moves.forEach((move) => {
        let x = move[0] + kingPos[0];
        let y = move[1] + kingPos[1];
        if(x >= 0 && x < 8 && y >= 0 && y < 8){
            let piece = board[x][y];
            if(piece && piece.color === enemyColor && piece.title === 'king'){
				ans = true;
            }
        }
    });
    if(ans) return ans;

    // 5. Pawns
	if(color === 'white'){
		moves = [[-1,-1],[-1,1]];
	}else{
		moves = [[1,-1],[1,1]];
	}
	
	moves.forEach((move) => {
		let x = move[0] + kingPos[0];
		let y = move[1] + kingPos[1];
		if(x >= 0 && x < 8 && y >= 0 && y < 8){
			let piece = board[x][y];
			if(piece && piece.color === enemyColor && piece.title === 'pawn'){
				ans = true;
			}
		}
	});
	
    return ans;
}