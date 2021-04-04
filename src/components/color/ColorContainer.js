import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import reactCSS from 'reactcss';
import {SketchPicker} from 'react-color';

const ColorContainer = (props) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const changeColor = (color) => {
        console.log(color)
        props.board.fillStyle = color;
        props.board.strokeStyle = color;
    }
    useEffect(() => {
        changeColor(props.colorBoard);
    }, [props.colorBoard]);
    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };
    const handleClose = () => {
        setDisplayColorPicker(false);
    };
    const handleChange = (color) => {
        props.setColorBoard(color.hex)
        changeColor(color.hex);
    };
    const styles = reactCSS({
        'default': {
            color: {
                width: '100%',
                height: '25px',
                borderRadius: '2px',
                background: props.colorBoard,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
                bottom: '45px'
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            }
        }
    });
    return (
        <Card>
            <Card.Header>Сменить цвет.</Card.Header>
            <Card.Body>
                <Row>
                    <Col md={12}>
                        <div>
                            <div style={styles.swatch} onClick={handleClick}>
                                <div style={styles.color}/>
                            </div>
                            {displayColorPicker ? <div style={styles.popover}>
                                <div style={styles.cover} onClick={handleClose}/>
                                <SketchPicker color={props.colorBoard} onChange={handleChange}/>
                            </div> : null}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default ColorContainer;