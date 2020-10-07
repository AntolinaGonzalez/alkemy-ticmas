import { Button, Col, Row, Container, Card, Form } from 'react-bootstrap';

function CreateCourse () {
    return (
        <div>
            <Container>
            <Row>
                    <Col>
                        <Card border="success">
                            <Card.Header as="h5" className="card bg-success text-white">
                                Editar curso
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>
                                    Formulario de edición
                                </Card.Title>
                                <Card.Text>
                                Complete el siguiente formulario para editar su nuevo curso:
                                </Card.Text>

                                <Form>
                                    <Form.Group controlId="formGridTitle">
                                        <Form.Label>Titulo</Form.Label>
                                        <Form.Control placeholder="Nuevo titulo del curso" />
                                    </Form.Group>

                                    <Form.Group controlId="formGridDescription">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control as="textarea" rows="3" placeholder="Nueva descripción del curso"/>
                                    </Form.Group>

                                    <Button variant="success" type="submit">
                                        Editar
                                    </Button>
                                    {' '}
                                    <Button variant="outline-info">
                                        Cancelar
                                    </Button>
                                </Form>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateCourse;