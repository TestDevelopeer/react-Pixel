import {Accordion, Badge, Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";

const DotContainer = (props) => {
    const [xStart, setX] = useState(0);
    const [yStart, setY] = useState(0);

    const draw = () => {
        const settings = {
            xStart,
            yStart,
            color: props.board.fillStyle
        }
        props.setCallback(props.canvasObjects.type, settings);
    }
    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Нарисовать точку.
                    {props.canvasObjects.coordinates.length > 0 &&
                        <Badge className='ml-2' variant="warning">{props.canvasObjects.coordinates.length}</Badge>
                    }
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Row>
                        <Col md={12}>
                            <label htmlFor="change-y">Координаты</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">X</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onFocus={props.handleFocus}
                                    type="number"
                                    id="change-x"
                                    placeholder="Введите X"
                                    aria-label="Координата X"
                                    aria-describedby="basic-addon2"
                                    value={xStart}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setX, props.width)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={12}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Y</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl onFocus={props.handleFocus}
                                    type="number"
                                    id="change-y"
                                    placeholder="Введите Y"
                                    aria-label="Координата Y"
                                    aria-describedby="basic-addon2"
                                    value={yStart}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setY, props.height)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={12}>
                            <Button block variant="outline-primary" onClick={draw}>Нарисовать</Button>
                        </Col>
                    </Row>
                    {props.deleteAccordion(props.canvasObjects)}
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}

export default DotContainer;