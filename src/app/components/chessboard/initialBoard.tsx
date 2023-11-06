const getInitialBoard = () => {
    const numCols = 8, numRows = 8;
    // empty 8 x 8 chessboard
    const board = new Array(numRows);
    for(let i=0;i<numRows;i++){
        board[i] = new Array(numCols).fill(null);
    }

    // setting up piece positions
    const pieces = ['rook','knight','bishop','queen','king','bishop','knight','rook'];
    for(let i=0;i<numCols;i++){
        board[0][i] = {
            title: pieces[i],
            color: 'black',
        }

        board[7][i] = {
            title: pieces[i],
            color: 'white',
        }
    }

    for(let i=0;i<numCols;i++){
        board[1][i] = {
            title: 'pawn',
            color: 'black',
        }

        board[6][i] = {
            title: 'pawn',
            color: 'white',
        }
    }

    return board;
}

export default getInitialBoard;