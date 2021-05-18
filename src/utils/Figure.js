import {updateCanvas} from "./Board";
import reactCSS from "reactcss";
import {Button, Col} from "react-bootstrap";
import React from "react";

export const getStyles = (item) => {
    return reactCSS({
        'default': {
            color: {
                color: item.color,
                borderColor: item.color,
                whiteSpace: 'pre-line'
            }
        },
    });
}

export const deleteFigure = (type, key, deleteFigures = true, board, boardWidth, boardHeight, canvasObjects, setCallbackUtil, setCanvasObjects) => {
    let figures;
    updateCanvas(board, boardWidth, boardHeight);
    for (const i in canvasObjects) {
        if (i === type && deleteFigures) {
            canvasObjects[i].coordinates.splice(key, 1);
            figures = canvasObjects[i].coordinates;
        }
        for (let j in canvasObjects[i].coordinates) {
            setCallbackUtil(i, canvasObjects[i].coordinates[j]);
        }
    }
    setCanvasObjects({...canvasObjects, [type]: {...canvasObjects[type], coordinates: figures}});
}

export const getTextForFigure = (item, type) => {
    switch (type) {
        case 'dots':
            return `Координаты: [${item.xStart}; ${item.yStart}]`;
        case 'lines':
            return `Первая точка: [${item.xStart}; ${item.yStart}] Вторая точка: [${item.xEnd}; ${item.yEnd}]`;
        case 'rectangles':
            return `Начальная точка: [${item.xStart}; ${item.yStart}]` + "\n" +
                `Размеры: [${item.width}; ${item.height}]` + "\n" +
                `Тип: ${item.isFigure ? 'Фигура' : 'Контур'}`;
        case 'triangles':
            return (`Первая точка: [${item.xStart}; ${item.yStart}]` + "\n" +
                `Вторая точка: [${item.xSecond}; ${item.ySecond}]` + "\n" +
                `Третья точка: [${item.xThird}; ${item.yThird}]` + "\n" +
                `Тип: ${item.isFigure ? 'Фигура' : 'Контур'}`);
        case 'circles':
            return (`Начальная точка: [${item.xStart}; ${item.yStart}]` + "\n" +
                `Радиус: ${item.radius}` + "\n" +
                `Градусы: ${item.degrees}°` + "\n" +
                `${item.isDot ? 'С точкой \n' : ''}` +
                `Тип: ${item.isFigure ? 'Фигура' : 'Контур'}`);
        default:
            return null;
    }
}

export const getAllFigures = (object, deleteFigureUtil) => {
    return object.coordinates.map((item, index) => {
        const styles = getStyles(item);
        const text = getTextForFigure(item, object.type);
        return (
            <Col key={index} md={12} className="mt-2">
                <Button style={styles.color} block variant="outline-danger" onClick={() => deleteFigureUtil(object.type, index)}>
                    {text} <br/> Цвет: {item.color}
                </Button>
            </Col>
        );
    });
}