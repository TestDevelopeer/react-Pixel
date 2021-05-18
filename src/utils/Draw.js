import {setColor} from "./Board";
import {swap} from "./Utils";

export const drawOnBoard = (call, settings, colorBoard, board, pixelSize) => {
    setColor(settings.color, board);
    call(settings, board, pixelSize);
    setColor(colorBoard, board);
}

export const drawDot = (settings, board, pixelSize) => {
    (settings.isDot && settings.isFigure) && setColor('#fff', board);
    board.fillRect(settings.xStart, settings.yStart, pixelSize, pixelSize);
}

export const drawLine = (settings, board, pixelSize) => {
    const deltaX = Math.abs(settings.xEnd - settings.xStart);
    const deltaY = Math.abs(settings.yEnd - settings.yStart);
    const signX = settings.xStart < settings.xEnd ? 1 : -1;
    const signY = settings.yStart < settings.yEnd ? 1 : -1;
    let error = deltaX - deltaY;
    drawDot({xStart: settings.xEnd, yStart: settings.yEnd}, board, pixelSize);
    while (settings.xStart !== settings.xEnd || settings.yStart !== settings.yEnd) {
        drawDot({xStart: settings.xStart, yStart: settings.yStart}, board, pixelSize);
        let error2 = error * 2;
        if (error2 > -deltaY) {
            error -= deltaY;
            settings.xStart += signX;
        }
        if (error2 < deltaX) {
            error += deltaX;
            settings.yStart += signY;
        }
    }
}

export const drawRectangle = (settings, board, pixelSize) => {
    let lines = [
        {start: [settings.xStart, settings.yStart], end: [settings.xStart + settings.width, settings.yStart]},
        {start: [settings.xStart + settings.width, settings.yStart], end: [settings.xStart + settings.width, settings.yStart + settings.height]},
        {start: [settings.xStart + settings.width, settings.yStart + settings.height], end: [settings.xStart, settings.yStart + settings.height]},
        {start: [settings.xStart, settings.yStart + settings.height], end: [settings.xStart, settings.yStart]}
    ];
    for (let i in lines) {
        drawLine({xStart: lines[i].start[0], yStart: lines[i].start[1], xEnd: lines[i].end[0], yEnd: lines[i].end[1]}, board, pixelSize);
    }
    if (settings.isFigure) {
        for (let i = settings.xStart; i <= settings.xStart + settings.width; i++) {
            for (let j = settings.yStart; j <= settings.yStart + settings.height; j++) {
                drawDot({xStart: i, yStart: j}, board, pixelSize);
            }
        }
    }
}

export const drawTriangle = (settings, board, pixelSize) => {
    let lines = [
        {start: [settings.xStart, settings.yStart], end: [settings.xSecond, settings.ySecond]},
        {start: [settings.xSecond, settings.ySecond], end: [settings.xThird, settings.yThird]},
        {start: [settings.xThird, settings.yThird], end: [settings.xStart, settings.yStart]}
    ];
    for (let i in lines) {
        drawLine({xStart: lines[i].start[0], yStart: lines[i].start[1], xEnd: lines[i].end[0], yEnd: lines[i].end[1]}, board, pixelSize);
    }
    if (settings.isFigure) {
        // Упорядочиваем точки p1(x1, y1), p2(x2, y2), p3(x3, y3)
        if (settings.ySecond < settings.yStart) {
            [settings.yStart, settings.ySecond] = swap(settings.yStart, settings.ySecond);
            [settings.xStart, settings.xSecond] = swap(settings.xStart, settings.xSecond);
        } // точки p1, p2 упорядочены
        if (settings.yThird < settings.yStart) {
            [settings.yStart, settings.yThird] = swap(settings.yStart, settings.yThird);
            [settings.xStart, settings.xThird] = swap(settings.xStart, settings.xThird);
        } // точки p1, p3 упорядочены
        // теперь p1 самая верхняя
        // осталось упорядочить p2 и p3
        if (settings.ySecond > settings.yThird) {
            [settings.ySecond, settings.yThird] = swap(settings.ySecond, settings.yThird);
            [settings.xSecond, settings.xThird] = swap(settings.xSecond, settings.xThird);
        }

        let dx13, dx12, dx23;

        if (settings.yThird !== settings.yStart) {
            dx13 = settings.xThird - settings.xStart;
            dx13 /= (settings.yThird - settings.yStart);
        } else {
            dx13 = 0;
        }

        if (settings.ySecond !== settings.yStart) {
            dx12 = settings.xSecond - settings.xStart;
            dx12 /= (settings.ySecond - settings.yStart);
        } else {
            dx12 = 0;
        }

        if (settings.yThird !== settings.ySecond) {
            dx23 = settings.xThird - settings.xSecond;
            dx23 /= (settings.yThird - settings.ySecond);
        } else {
            dx23 = 0;
        }

        // "рабочие точки"
        // изначально они находятся в верхней точке
        let wx1 = settings.xStart;
        let wx2 = wx1;

        // сохраняем приращение dx13 в другой переменной
        let _dx13 = dx13;

        // упорядочиваем приращения таким образом, чтобы
        // в процессе работы алгоритмы
        // точка wx1 была всегда левее wx2
        if (dx13 > dx12) {
            [dx13, dx12] = swap(dx13, dx12);
        }

        // растеризуем верхний полутреугольник
        for (let i = settings.yStart; i < settings.ySecond; i++){
            // рисуем горизонтальную линию между рабочими
            // точками
            for (let j = wx1; j <= wx2; j++){
                drawDot({xStart: j, yStart: i}, board, pixelSize);
            }
            wx1 += dx13;
            wx2 += dx12;
        }

        // вырожденный случай, когда верхнего полутреугольника нет
        // надо разнести рабочие точки по оси x, т.к. изначально они совпадают
        if (settings.yStart === settings.ySecond){
            wx1 = settings.xStart;
            wx2 = settings.xSecond;
        }

        // упорядочиваем приращения
        // (используем сохраненное приращение)
        if (_dx13 < dx23) {
            [_dx13, dx23] = swap(_dx13, dx23);
        }

        // растеризуем нижний полутреугольник
        for (let i = settings.ySecond; i <= settings.yThird; i++){
            // рисуем горизонтальную линию между рабочими
            // точками
            for (let j = wx1; j <= wx2; j++){
                drawDot({xStart: j, yStart: i}, board, pixelSize);
            }
            wx1 += _dx13;
            wx2 += dx23;
        }
    }
}

export const drawCircle = (settings, board, pixelSize) => {
    // алгоритм Брезенхэма для окружностей
    // radius - радиус окружности, X1, Y1 - координаты центра
    let xRange = [settings.xStart - settings.radius, settings.xStart + settings.radius];
    let yRange = [settings.yStart - settings.radius, settings.yStart + settings.radius];
    let x = 0;
    let y = settings.radius;
    let delta = 1 - 2 * settings.radius;
    let error = 0;
    while (y >= 0) {
        drawDot({xStart: settings.xStart + x, yStart: settings.yStart + y}, board, pixelSize);
        drawDot({xStart: settings.xStart + x, yStart: settings.yStart - y}, board, pixelSize);
        drawDot({xStart: settings.xStart - x, yStart: settings.yStart + y}, board, pixelSize);
        drawDot({xStart: settings.xStart - x, yStart: settings.yStart - y}, board, pixelSize);
        error = 2 * (delta + y) - 1;
        if ((delta < 0) && (error <= 0)) {
            delta += 2 * ++x + 1;
        } else if ((delta > 0) && (error > 0)) {
            delta -= 2 * --y + 1;
        } else {
            delta += 2 * (++x - --y);
        }
    }
    if (settings.isFigure) {
        for (let i = xRange[0]; i <= xRange[1]; i++) {
            for (let j = yRange[0]; j <= yRange[1]; j++) {
                if ((Math.pow((i - settings.xStart), 2) + Math.pow((j - settings.yStart), 2)) <= Math.pow(settings.radius, 2)) {
                    drawDot({xStart: i, yStart: j}, board, pixelSize);
                }
            }
        }
    }
    settings.isDot && drawDot(settings, board, pixelSize);
}