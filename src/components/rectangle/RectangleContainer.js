import {Accordion, Badge, Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";

const RectangleContainer = (props) => {
    const [xStart, setXstart] = useState(0);
    const [yStart, setYstart] = useState(0);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [isFigure, setIsFigure] = useState(false);

    const draw = () => {
        const settings = {
            xStart,
            yStart,
            width,
            height,
            isFigure,
            color: props.board.fillStyle
        }
        props.setCallback(props.canvasObjects.type, settings);
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    Нарисовать прямоугольник.
                    {props.canvasObjects.coordinates.length > 0 &&
                    <Badge className='ml-2' variant="warning">{props.canvasObjects.coordinates.length}</Badge>
                    }
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
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
                                    aria-label="Пикселей по X"
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
                                    aria-label="Пикселей по Y"
                                    aria-describedby="basic-addon2"
                                    value={yStart}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setYstart, props.height)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={6}>
                            <label>Размеры</label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Ширина</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onFocus={props.handleFocus}
                                    type="number"
                                    id="end-x"
                                    placeholder="Введите x"
                                    aria-label="Новый цвет"
                                    aria-describedby="basic-addon2"
                                    value={width}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setWidth, props.width)}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">Высота</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    onFocus={props.handleFocus}
                                    type="number"
                                    id="end-y"
                                    placeholder="Введите y"
                                    aria-label="Новый цвет"
                                    aria-describedby="basic-addon2"
                                    value={height}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setHeight, props.height)}
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
                                        id='rectangle-checkbox-checked'
                                        label='Контур'
                                    />
                                    <Form.Check
                                        inline
                                        custom
                                        type='checkbox'
                                        id='rectangle-checkbox'
                                        label='Фигура'
                                        onChange={() => setIsFigure(!isFigure)}
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

export default RectangleContainer;