import React, {useState} from "react";
import {Accordion, Badge, Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";

const CircleContainer = (props) => {
    const [xStart, setXstart] = useState(0);
    const [yStart, setYstart] = useState(0);
    const [radius, setRadius] = useState(0);
    const [isDot, setIsDot] = useState(false);
    const [isFigure, setIsFigure] = useState(false);
    const draw = () => {
        const settings = {
            xStart,
            yStart,
            radius,
            isDot,
            isFigure,
            color: props.board.fillStyle
        }
        props.setCallback(props.canvasObjects.type, settings);
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                    Нарисовать круг.
                    {props.canvasObjects.coordinates.length > 0 &&
                    <Badge className='ml-2' variant="warning">{props.canvasObjects.coordinates.length}</Badge>
                    }
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
                <Card.Body>
                    <Row>
                        <Col md={6}>
                            <label>Точка старта</label>
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
                            <label>Параметры</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Радиус</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onFocus={props.handleFocus}
                                    type="number"
                                    id="end-x"
                                    placeholder="Введите x"
                                    aria-label="Новый цвет"
                                    aria-describedby="basic-addon2"
                                    value={radius}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setRadius, props.width)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={12}>
                            <Form>
                                <div className="mb-3">
                                    <Form.Check
                                        inline
                                        custom
                                        disabled
                                        checked
                                        type='checkbox'
                                        id='circle-checkbox-checked'
                                        label='Контур'
                                    />
                                    <Form.Check
                                        inline
                                        custom
                                        type='checkbox'
                                        id='circle-checkbox'
                                        label='Фигура'
                                        onChange={() => setIsFigure(!isFigure)}
                                    />
                                    <Form.Check
                                        inline
                                        custom
                                        type='checkbox'
                                        id='circle-checkbox-dot'
                                        label='Точка'
                                        onChange={() => setIsDot(!isDot)}
                                    />
                                </div>
                            </Form>
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

export default CircleContainer;