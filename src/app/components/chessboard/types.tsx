export type PieceType = {
    title: string,
    color: string,
}

export type Coords = {
    x: number,
    y: number,
}

export type BoardType = Array<Array<PieceType>>;