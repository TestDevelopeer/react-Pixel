import {Accordion, Badge, Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";

const LineContainer = (props) => {
    const [xStart, setXstart] = useState(0);
    const [yStart, setYstart] = useState(0);

    const [xEnd, setXend] = useState(0);
    const [yEnd, setYend] = useState(0);

    const draw = () => {
        const settings = {
            xStart,
            yStart,
            xEnd,
            yEnd,
            color: props.board.fillStyle
        }
        props.setCallback(props.canvasObjects.type, settings);
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Нарисовать линию.
                    {props.canvasObjects.coordinates.length > 0 &&
                    <Badge className='ml-2' variant="warning">{props.canvasObjects.coordinates.length}</Badge>
                    }
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <label>Начало</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">X</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onFocus={props.handleFocus}
                                    type="number"
                                    id="start-x"
                                    placeholder="Введите x"
                                    aria-label="Новый цвет"
                                    aria-describedby="basic-addon2"
                                    value={xStart}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setXstart, props.width)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Y</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onFocus={props.handleFocus}
                                    type="number"
                                    id="start-y"
                                    placeholder="Введите y"
                                    aria-label="Новый цвет"
                                    aria-describedby="basic-addon2"
                                    value={yStart}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setYstart, props.height)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={6}>
                            <label>Конец</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">X</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onFocus={props.handleFocus}
                                    type="number"
                                    id="end-x"
                                    placeholder="Введите x"
                                    aria-label="Новый цвет"
                                    aria-describedby="basic-addon2"
                                    value={xEnd}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setXend, props.width)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Y</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onFocus={props.handleFocus}
                                    type="number"
                                    id="end-y"
                                    placeholder="Введите y"
                                    aria-label="Новый цвет"
                                    aria-describedby="basic-addon2"
                                    value={yEnd}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setYend, props.height)}
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

export default LineContainer;