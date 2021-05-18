import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";

const ClearContainer = (props) => {
    const clearBoard = () => {
        props.updateCanvas(props.board, props.boardWidth, props.boardHeight);
        props.setCanvasObjects(props.defaultFigures);
    }
    return (
        <Card>
            <Card.Header>Очистить.</Card.Header>
            <Card.Body>
                <Row>
                    <Col md={12}>
                        <Button block variant="outline-success" onClick={clearBoard}>Очистить</Button>
                    </Col>
                    <Col md={12} className='mt-3'>
                        <Button block variant="outline-success" onClick={() => props.deleteFigure('', null, false)}>Очистить кисть</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ClearContainer;