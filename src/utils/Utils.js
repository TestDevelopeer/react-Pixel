import {drawCircle, drawDot, drawLine, drawOnBoard, drawRectangle, drawTriangle} from "./Draw";

export const changeCoordinate = (coordinate, setter, equal) => {
    coordinate = parseInt(coordinate);
    if (coordinate >= 0 && coordinate <= equal) {
        setter(coordinate);
    } else if (coordinate <= 0) {
        setter(0);
    } else if (coordinate >= equal) {
        setter(equal);
    } else {
        setter('');
    }
}

export const setCallback = (type, settings, setCanvasObjects, canvasObjects, colorBoard, board, pixelSize) => {
    setCanvasObjects({
        ...canvasObjects,
        [type]: {
            ...canvasObjects[type],
            coordinates: [...canvasObjects[type].coordinates, settings]
        }
    });
    switch (type) {
        case 'dots':
            return drawOnBoard(drawDot, settings, colorBoard, board, pixelSize);
        case 'lines':
            return drawOnBoard(drawLine, settings, colorBoard, board, pixelSize);
        case 'rectangles':
            return drawOnBoard(drawRectangle, settings, colorBoard, board, pixelSize);
        case 'triangles':
            return drawOnBoard(drawTriangle, settings, colorBoard, board, pixelSize);
        case 'circles':
            return drawOnBoard(drawCircle, settings, colorBoard, board, pixelSize);
        default:
            return null;
    }
}

export const swap = (a, b) => {
    let t = a;
    a = b;
    b = t;
    return [a, b];
}