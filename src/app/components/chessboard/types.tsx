export type PieceType = {
    title: string,
    color: string,
} | null;

export type Coords = {
    x: number,
    y: number,
}

export type BoardType = Array<Array<PieceType>>;

export type mouseEvent = {
    preventDefault : () => {}
};