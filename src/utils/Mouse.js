import {drawDot, drawOnBoard} from "./Draw";
import {setCallback} from "./Utils";

let draw = false;

export const getMousePos = (e, board, canvas) => {
    let mouse = {xStart: 0, yStart: 0};
    let x, y;
    let rect = canvas.getBoundingClientRect();
    let top = rect.top;
    let bottom = rect.bottom;
    let left = rect.left;
    let right = rect.right;

    x = e.clientX - left;
    y = e.clientY - top;

    let width = right - left;

    if(canvas.width !== width) {
        let height = bottom - top;
        x = x * (canvas.width / width);
        y = y * (canvas.height / height);
    }

    mouse.xStart = Math.floor(x);
    mouse.yStart = Math.floor(y);
    return mouse;
}

export const mouseClick = (callBack, board, canvas) => {
    return (e) => {
        let mouse = getMousePos(e, board, canvas);
        const settings = {
            xStart: mouse.xStart,
            yStart: mouse.yStart,
            color: board.fillStyle
        }
        console.log(callBack)
        callBack('dots', settings);
    }
}

export const mouseDown = (board, canvas) => {
    return (e) => {
        let mouse = getMousePos(e, board, canvas);
        draw = true;
        board.beginPath();
        board.moveTo(mouse.xStart, mouse.yStart);
    }
}

export const mouseMove = (boardWidth, boardHeight, board, mouseCoords, canvas) => {
    return (e) => {
        let mouse = getMousePos(e, board, canvas);
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else { // старый IE
            document.selection.empty();
        }
        mouseCoords.style.top = parseInt(e.pageY - mouseCoords.offsetHeight / 2 - 30) + 'px';
        mouseCoords.style.left = parseInt(e.pageX - mouseCoords.offsetWidth / 2 + 20) + 'px';
        mouseCoords.innerHTML = `[${mouse.xStart}; ${mouse.yStart}]`;

        if (mouse.xStart >= boardWidth - 1 || mouse.xStart <= 1 || mouse.yStart >= boardHeight - 1 || mouse.yStart <= 1) {
            draw = false;
        }
        if (draw === true) {
            board.lineTo(mouse.xStart, mouse.yStart);
            board.stroke();
        }
    }
}

export const mouseUp = (board, canvas) => {
    return (e) => {
        let mouse = getMousePos(e, board, canvas);
        draw = false;
        board.lineTo(mouse.xStart, mouse.yStart);
        board.stroke();
        board.closePath();
    }
}

export const mouseOut = (mouseCoords) => {
    mouseCoords.innerHTML = '';
}