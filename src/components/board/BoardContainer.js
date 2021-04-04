import React, {useEffect, useRef, useState} from 'react';
import s from './BoardContainer.module.css';
import {Accordion, Button, Card, Col, Container, Row} from "react-bootstrap";
import DotContainer from "../dot/DotContainer";
import ColorContainer from "../color/ColorContainer";
import LineContainer from "../line/LineContainer";
import ClearContainer from "../clear/ClearContainer";
import ResolutionContainer from "../resolution/ResolutionContainer";
import RectangleContainer from "../rectangle/RectangleContainer";
import TriangleContainer from "../triangle/TriangleContainer";
import CircleContainer from "../circle/CircleContainer";
import reactCSS from 'reactcss';
import LineWidthContainer from "../linewidth/ClearContainer";

const BoardContainer = () => {
    const handleFocus = (event) => event.target.select();
    const canvas = useRef(null);
    const [board, setBoard] = useState(null);
    const [boardWidth, setBoardWidth] = useState(1280);
    const [boardHeight, setBoardHeight] = useState(720);
    const [colorBoard, setColorBoard] = useState("#000");
    const canvasStyles = {
        width: 1280 + 'px',
        height: 720 + 'px'
    };
    let draw = false;
    const getMousePos = (e) => {
        let mouse = {xStart: 0, yStart: 0};
        if (e.offsetX) {
            mouse.xStart = e.offsetX;
            mouse.yStart = e.offsetY;
        } else if (e.layerX) {
            mouse.xStart = e.layerX;
            mouse.yStart = e.layerY;
        }
        return mouse;
    }
    const mouseDown = (e) => {
        let mouse = getMousePos(e);
        draw = true;
        board.beginPath();
        board.moveTo(mouse.xStart, mouse.yStart);
    }
    let mouseCoords = document.getElementById('mouseInfo');
    const mouseMove = (e) => {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else { // старый IE
            document.selection.empty();
        }
        mouseCoords.style.top = parseInt(e.pageY - mouseCoords.offsetHeight / 2 - 30) + 'px';
        mouseCoords.style.left = parseInt(e.pageX - mouseCoords.offsetWidth / 2 + 20) + 'px';
        mouseCoords.innerHTML = `[${parseInt(e.pageX - mouseCoords.offsetWidth / 2)}; ${parseInt(e.pageY - mouseCoords.offsetHeight / 2)}]`;
        let mouse = getMousePos(e);
        if (mouse.xStart >= boardWidth - 1 || mouse.xStart <= 1 || mouse.yStart >= boardHeight - 1 || mouse.yStart <= 1) {
            draw = false;
        }
        if (draw === true) {
            board.lineTo(mouse.xStart, mouse.yStart);
            board.stroke();
        }
    }
    const mouseUp = (e) => {
        let mouse = getMousePos(e);
        board.lineTo(mouse.xStart, mouse.yStart);
        board.stroke();
        board.closePath();
        draw = false;
    }
    const mouseOut = (e) => {
        mouseCoords.innerHTML = '';
    }
    const setLineWidth = (pixelSize) => {
        board.lineWidth = pixelSize;
    }
    useEffect(() => {
        if (canvas.current !== null) {
            setBoard(canvas.current.getContext('2d'));
        }
        if (board !== null) {
            updateCanvas();
            canvas.current.onmousedown = mouseDown;
            canvas.current.onmouseup = mouseUp;
            canvas.current.onmousemove = mouseMove;
            canvas.current.onmouseout = mouseOut;
        }
    }, [board]);

    /*Основные функции доски*/
    const updateCanvas = () => {
        board.clearRect(0, 0, boardWidth, boardHeight);
    }
    const setColor = (color) => {
        board.fillStyle = color;
        board.strokeStyle = color;
    }
    /*Основные функции доски ---*/
    /*Утилиты*/
    const changeCoordinate = (coordinate, setter, equal) => {
        if (parseInt(coordinate) >= 0 && parseInt(coordinate) <= equal) {
            setter(coordinate);
        } else if (parseInt(coordinate) <= 0) {
            setter(0);
        } else if (parseInt(coordinate) >= equal) {
            setter(equal);
        } else {
            setter('');
        }
    }
    const drawOnBoard = (call, settings) => {
        setColor(settings.color);
        call(settings);
        setColor(colorBoard);
    }
    /*Утилиты ---*/
    /*Фунции рисования на доске*/
    const drawDot = (settings) => {
        (settings.isDot && settings.isFigure) && setColor('#fff');
        console.log(board)
        board.fillRect(settings.xStart, settings.yStart, 1, 1);
        setColor(settings.color);
    }

    const drawLine = (settings) => {
        board.beginPath();
        board.moveTo(settings.xStart, settings.yStart);
        board.lineTo(settings.xEnd, settings.yEnd);
        board.stroke();
    }

    const drawRectangle = (settings) => {
        !settings.isFigure ?
            board.strokeRect(settings.xStart, settings.yStart, settings.width, settings.height) :
            board.fillRect(settings.xStart, settings.yStart, settings.width, settings.height);
    }

    const drawTriangle = (settings) => {
        board.beginPath();
        board.moveTo(settings.xStart, settings.yStart);
        board.lineTo(settings.xSecond, settings.ySecond);
        board.lineTo(settings.xThird, settings.yThird);
        board.lineTo(settings.xStart, settings.yStart);
        !settings.isFigure ? board.stroke() : board.fill();
    }

    const drawCircle = (settings) => {
        board.beginPath();
        board.arc(settings.xStart, settings.yStart, settings.radius, 0, settings.radians, false);
        !settings.isFigure ? board.stroke() : board.fill();
        settings.isDot && drawDot(settings);
    }
    /*Фунции рисования на доске ---*/
    /*Утилиты*/
    const setCallback = async (type, settings) => {
        setCanvasObjects({
            ...canvasObjects,
            [type]: {
                ...canvasObjects[type],
                coordinates: [...canvasObjects[type].coordinates, settings]
            }
        });
        switch (type) {
            case 'dots':
                return drawOnBoard(drawDot, settings);
            case 'lines':
                return drawOnBoard(drawLine, settings);
            case 'rectangles':
                return drawOnBoard(drawRectangle, settings);
            case 'triangles':
                return drawOnBoard(drawTriangle, settings);
            case 'circles':
                return drawOnBoard(drawCircle, settings);
            default:
                return null;
        }
    }
    /*Утилиты ---*/
    /*Конфиг*/
    const defaultFigures = {
        dots: {
            coordinates: [],
            type: 'dots'
        },
        lines: {
            coordinates: [],
            type: 'lines'
        },
        rectangles: {
            coordinates: [],
            type: 'rectangles'
        },
        triangles: {
            coordinates: [],
            type: 'triangles'
        },
        circles: {
            coordinates: [],
            type: 'circles'
        }
    }
    /*Конфиг ---*/
    const [canvasObjects, setCanvasObjects] = useState(defaultFigures);
    /*Утилиты*/
    const deleteFigure = (type, key, deleteFigures = true) => {
        let figures;
        updateCanvas();
        for (const i in canvasObjects) {
            if (i === type && deleteFigures) {
                canvasObjects[i].coordinates.splice(key, 1);
                figures = canvasObjects[i].coordinates;
            }
            for (let j in canvasObjects[i].coordinates) {
                setCallback(i, canvasObjects[i].coordinates[j]);
            }
        }
        setCanvasObjects({...canvasObjects, [type]: {...canvasObjects[type], coordinates: figures}});
    }
    /*Утилиты ---*/
    /*Утилиты*/
    const getStyles = (item) => {
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
    const getTextForFigure = (item, type) => {
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
    const getAllFigures = (object) => {
        return object.coordinates.map((item, index) => {
            const styles = getStyles(item);
            const text = getTextForFigure(item, object.type);
            return (
                <Col key={index} md={12} className="mt-2">
                    <Button style={styles.color} block variant="outline-danger" onClick={() => deleteFigure(object.type, index)}>
                        {text} <br/> Цвет: {item.color}
                    </Button>
                </Col>
            );
        });
    }

    const deleteAccordion = (canvasObjects) => {
        return (
            <>
                {canvasObjects.coordinates.length > 0 &&
                <Accordion className="mt-3">
                    <Card bg='Light'>
                        <Row>
                            <Col md={12}>
                                <Accordion.Toggle as={Button} block variant="outline-info" eventKey={canvasObjects.type}>
                                    Удалить точки:
                                </Accordion.Toggle>
                            </Col>
                            <Col md={12}>
                                <Accordion.Collapse eventKey={canvasObjects.type}>
                                    <Card.Body>
                                        {getAllFigures(canvasObjects)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Col>
                        </Row>
                    </Card>
                </Accordion>}
            </>
        )
    }
    /*Утилиты ---*/
    return (
        <Container fluid>
            <Row className="mt-3 mb-3">
                <Col md={9}>
                    <div className="position-fixed">
                        <div className={s.board}>
                            <div id='mouseInfo' className={s.square}/>
                            <canvas id='myCanvas' ref={canvas} style={canvasStyles} width={boardWidth} height={boardHeight}/>
                        </div>
                        {board !== null && <>
                            <Row className="mt-3">
                                <Col md={2}>
                                    <ClearContainer deleteFigure={deleteFigure} setCanvasObjects={setCanvasObjects} defaultFigures={defaultFigures}
                                                    updateCanvas={updateCanvas}/>
                                </Col>
                                <Col md={2}>
                                    <LineWidthContainer setLineWidth={setLineWidth} handleFocus={handleFocus}/>
                                </Col>
                                <Col md={2}>
                                    <ColorContainer colorBoard={colorBoard} setColorBoard={setColorBoard} board={board}/>
                                </Col>
                                <Col md={6}>
                                    <ResolutionContainer handleFocus={handleFocus} setCanvasObjects={setCanvasObjects} defaultFigures={defaultFigures}
                                                         boardWidth={boardWidth}
                                                         boardHeight={boardHeight} setBoardWidth={setBoardWidth}
                                                         setBoardHeight={setBoardHeight}/>
                                </Col>
                            </Row>
                        </>}
                    </div>
                </Col>
                <Col md={3}>
                    {board !== null && <>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <DotContainer handleFocus={handleFocus} canvasObjects={canvasObjects.dots} getAllFigures={getAllFigures}
                                                  setCallback={setCallback} changeCoordinate={changeCoordinate} deleteAccordion={deleteAccordion}
                                                  width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <LineContainer handleFocus={handleFocus} canvasObjects={canvasObjects.lines} getAllFigures={getAllFigures}
                                                   setCallback={setCallback} changeCoordinate={changeCoordinate} deleteAccordion={deleteAccordion}
                                                   width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <RectangleContainer handleFocus={handleFocus} canvasObjects={canvasObjects.rectangles}
                                                        getAllFigures={getAllFigures}
                                                        setCallback={setCallback} changeCoordinate={changeCoordinate}
                                                        deleteAccordion={deleteAccordion}
                                                        width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <TriangleContainer handleFocus={handleFocus} canvasObjects={canvasObjects.triangles} getAllFigures={getAllFigures}
                                                       setCallback={setCallback} changeCoordinate={changeCoordinate} deleteAccordion={deleteAccordion}
                                                       width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <CircleContainer handleFocus={handleFocus} canvasObjects={canvasObjects.circles} getAllFigures={getAllFigures}
                                                     setCallback={setCallback} changeCoordinate={changeCoordinate} deleteAccordion={deleteAccordion}
                                                     width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                    </>}
                </Col>
            </Row>
        </Container>
    );
}

export default BoardContainer;