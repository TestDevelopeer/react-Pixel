import {Button, Card, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import React from "react";

const LineWidthContainer = (props) => {
    return (
        <Card>
            <Card.Header>Толщина линии.</Card.Header>
            <Card.Body>
                <Row>
                    <Col md={12}>
                        <InputGroup className="mb-3">
                            <FormControl
                                onFocus={props.handleFocus}
                                type="number"
                                id="change-pixel"
                                placeholder="Введите размер"
                                aria-label="Пиксель"
                                aria-describedby="basic-addon2"
                                value={props.pixelSize}
                                onChange={(e) => props.setPixelSize(e.target.value)}
                            />
                        </InputGroup>
                        <Button block variant="outline-success" onClick={() => props.setLineWidth(props.pixelSize, props.board)}>Установить</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default LineWidthContainer;