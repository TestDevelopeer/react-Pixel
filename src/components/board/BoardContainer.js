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
import LineWidthContainer from "../linewidth/ClearContainer";
import {mouseClick, mouseDown, mouseMove, mouseOut, mouseUp} from "../../utils/Mouse";
import {setColor, setLineWidth, updateCanvas} from "../../utils/Board";
import {canvasStyles, defaultFigures} from "../../config/Config";
import {changeCoordinate, setCallback} from "../../utils/Utils";
import {deleteFigure, getAllFigures} from "../../utils/Figure";

const BoardContainer = () => {
    const handleFocus = (event) => event.target.select();
    const canvas = useRef(null);
    const [board, setBoard] = useState(null);
    const [boardWidth, setBoardWidth] = useState(1280);
    const [boardHeight, setBoardHeight] = useState(720);
    const [colorBoard, setColorBoard] = useState("#000");
    const [pixelSize, setPixelSize] = useState(1);
    const [canvasObjects, setCanvasObjects] = useState(defaultFigures);
    let mouseCoords = document.getElementById('mouseInfo');

    useEffect(() => {
        if (canvas.current !== null) {
            setBoard(canvas.current.getContext('2d'));
        }
        if (board !== null) {
            updateCanvas(board, boardWidth, boardHeight);
            /*canvas.current.onmousedown = mouseDown(board, canvas.current);
            canvas.current.onmouseup = mouseUp(board, canvas.current);
            canvas.current.onclick = mouseClick(setCallbackUtil, board, canvas.current);*/
            canvas.current.onmousemove = mouseMove(boardWidth, boardHeight, board, mouseCoords, canvas.current);
            canvas.current.onmouseout = mouseOut(mouseCoords);
        }
    }, [board]);

    const setCallbackUtil = (type, settings) => {
        setCallback(type, settings, setCanvasObjects, canvasObjects, colorBoard, board, pixelSize);
    }
    const deleteFigureUtil = (type, key, deleteFigures = true) => {
        deleteFigure(type, key, deleteFigures, board, boardWidth, boardHeight, canvasObjects, setCallbackUtil, setCanvasObjects);
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
                                        {getAllFigures(canvasObjects, deleteFigureUtil)}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Col>
                        </Row>
                    </Card>
                </Accordion>}
            </>
        )
    }

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
                                    <ClearContainer deleteFigure={deleteFigureUtil} setCanvasObjects={setCanvasObjects}
                                                    defaultFigures={defaultFigures}
                                                    updateCanvas={updateCanvas} board={board} boardWidth={boardWidth} boardHeight={boardHeight}/>
                                </Col>
                                <Col md={2}>
                                    <LineWidthContainer pixelSize={pixelSize} setPixelSize={setPixelSize} setLineWidth={setLineWidth} board={board}
                                                        handleFocus={handleFocus}/>
                                </Col>
                                <Col md={2}>
                                    <ColorContainer colorBoard={colorBoard} setColorBoard={setColorBoard} board={board}/>
                                </Col>
                                <Col md={4}>
                                    <ResolutionContainer setColor={setColor} board={board} colorBoard={colorBoard} handleFocus={handleFocus}
                                                         setCanvasObjects={setCanvasObjects} defaultFigures={defaultFigures}
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
                                    <DotContainer handleFocus={handleFocus} canvasObjects={canvasObjects.dots}
                                                  setCallback={setCallbackUtil} changeCoordinate={changeCoordinate} deleteAccordion={deleteAccordion}
                                                  width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <LineContainer handleFocus={handleFocus} canvasObjects={canvasObjects.lines}
                                                   setCallback={setCallbackUtil} changeCoordinate={changeCoordinate} deleteAccordion={deleteAccordion}
                                                   width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <RectangleContainer handleFocus={handleFocus} canvasObjects={canvasObjects.rectangles}
                                                        setCallback={setCallbackUtil} changeCoordinate={changeCoordinate}
                                                        deleteAccordion={deleteAccordion}
                                                        width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <TriangleContainer handleFocus={handleFocus} canvasObjects={canvasObjects.triangles}
                                                       setCallback={setCallbackUtil} changeCoordinate={changeCoordinate}
                                                       deleteAccordion={deleteAccordion}
                                                       width={boardWidth} height={boardHeight} board={board}/>
                                </Col>
                            </Row>
                        </Accordion>
                        <Accordion>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <CircleContainer handleFocus={handleFocus} canvasObjects={canvasObjects.circles}
                                                     setCallback={setCallbackUtil} changeCoordinate={changeCoordinate}
                                                     deleteAccordion={deleteAccordion}
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