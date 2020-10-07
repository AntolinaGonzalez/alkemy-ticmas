import { Button, Col, Row, Container, Card, ListGroup } from 'react-bootstrap';

function Dashboard () {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Header as="h5" style={{ background: "#28df99", color: "#fff" }}>
                    Dashboard
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Últimos cursos:
                    </Card.Text>

                    <ListGroup.Item action href="#">Curso 1</ListGroup.Item>
                    <ListGroup.Item action href="#">Curso 2</ListGroup.Item>
                    <ListGroup.Item action href="#">Curso 3</ListGroup.Item>
                    <ListGroup.Item action href="#">Curso 4</ListGroup.Item>
                    <ListGroup.Item action href="#">Curso 5</ListGroup.Item>
                    <ListGroup.Item action href="#">Curso 6</ListGroup.Item>
                    <p></p>
                    <Button href="#" variant="outline-success" block>
                        Crear nuevo curso    
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Dashboard;