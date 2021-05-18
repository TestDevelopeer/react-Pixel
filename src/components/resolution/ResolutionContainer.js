import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";

const ResolutionContainer = (props) => {
    const [boardWidth, setBoardWidth] = useState(props.boardWidth);
    const [boardHeight, setBoardHeight] = useState(props.boardHeight);

    const changeResolution = () => {
        props.setBoardWidth(boardWidth);
        props.setBoardHeight(boardHeight);
        props.setCanvasObjects(props.defaultFigures);
        props.setColor(props.colorBoard, props.board);
    }
    return (
        <Card>
            <Card.Header>Сменить разрешение.</Card.Header>
            <Card.Body>
                <Row>
                    <Col md={4}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">X</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onFocus={props.handleFocus}
                                type="number"
                                id="change-x"
                                placeholder="Введите X"
                                aria-label="Координата X"
                                aria-describedby="basic-addon2"
                                value={boardWidth}
                                onChange={(e) => setBoardWidth(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Y</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                onFocus={props.handleFocus}
                                type="number"
                                id="change-y"
                                placeholder="Введите Y"
                                aria-label="Координата Y"
                                aria-describedby="basic-addon2"
                                value={boardHeight}
                                onChange={(e) => setBoardHeight(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <Col md={4}>
                        <Button block variant="outline-success" onClick={changeResolution}>Сменить</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ResolutionContainer;