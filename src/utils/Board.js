export const setLineWidth = (pixelSize, board) => {
    board.lineWidth = pixelSize;
}

export const setColor = (color, board) => {
    board.fillStyle = color;
    board.strokeStyle = color;
}

export const updateCanvas = (board, boardWidth, boardHeight) => {
    board.clearRect(0, 0, boardWidth, boardHeight);
}