import {Accordion, Badge, Button, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React, {useState} from "react";

const TriangleContainer = (props) => {
    const [xStart, setXstart] = useState(0);
    const [yStart, setYstart] = useState(0);

    const [xSecond, setXsecond] = useState(0);
    const [ySecond, setYsecond] = useState(0);

    const [xThird, setXthird] = useState(0);
    const [yThird, setYthird] = useState(0);

    const [isFigure, setIsFigure] = useState(false);

    const draw = () => {
        const settings = {
            xStart,
            yStart,
            xSecond,
            ySecond,
            xThird,
            yThird,
            isFigure,
            color: props.board.fillStyle
        }
        console.log(props.canvasObjects.type, settings)
        props.setCallback(props.canvasObjects.type, settings);
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                    Нарисовать треугольник.
                    {props.canvasObjects.coordinates.length > 0 &&
                    <Badge className='ml-2' variant="warning">{props.canvasObjects.coordinates.length}</Badge>
                    }
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
                <Card.Body>
                    <Row>
                        <Col md={4}>
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
                        <Col md={4}>
                            <label>Вторая точка</label>
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
                                    value={xSecond}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setXsecond, props.width)}
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
                                    value={ySecond}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setYsecond, props.height)}
                                />
                            </InputGroup>
                        </Col>
                        <Col md={4}>
                            <label>Третья точка</label>
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
                                    value={xThird}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setXthird, props.width)}
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
                                    value={yThird}
                                    onChange={(e) => props.changeCoordinate(e.target.value, setYthird, props.height)}
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
                                        id='triangle-checkbox-checked'
                                        label='Контур'
                                    />
                                    <Form.Check
                                        inline
                                        custom
                                        type='checkbox'
                                        id='triangle-checkbox'
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

export default TriangleContainer;