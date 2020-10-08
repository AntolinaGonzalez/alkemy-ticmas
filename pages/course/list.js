import {
  Row,
  Col,
  Nav,
  Jumbotron,
  Button,
  Form,
  Container,
  Modal,
  ListGroup,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import NavBar from "../../components/navbar";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";
import React, { useState } from "react";

Courses.getInitialProps = async () => {
  const courses = await axios.get(`${process.env.API_BASE_URL}/courses`, {
    headers: {
      Authorization: `Bearer ` + axios.defaults.headers.common.Authorization,
    },
  });
  console.log(courses.config.headers.Authorization)
  return {
    header:courses.config.headers.,
    courses: courses.data.courses,
    user: courses.data.user,
  };
};

export default function Courses(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [alert, setAlert] = useState(false);
  const handleCloseAlert = () => setAlert(false);
  const handleShowAlert = () => setAlert(true);
  
  if (props.user == "noUser") {
    return (
      <div className={styles.container}>
        <Layout>
          <NavBar Navigation>
            <Nav.Link style={{ color: "darkviolet" }} href="/">
              Salir
            </Nav.Link>
          </NavBar>
          <div
            style={{
              marginTop: "12vh",
              fontFamily: "Roboto",
              marginLeft: "0",
              marginRight: "0",
            }}
          >
            <Jumbotron className="bg-white">
              <h1>No estas logeado</h1>
              <h3>{props.user}</h3>
              <p>
                <Button
                  variant="success"
                  style={{
                    backgroundColor: "darkviolet",
                    border: "darkviolet",
                    borderRadius: "50px",
                    width: "250px",
                  }}
                  href="/"
                >
                  Login
                </Button>
              </p>
            </Jumbotron>
          </div>
        </Layout>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Layout>
        <NavBar Navigation>
          <Nav.Link style={{ color: "darkviolet" }} href="/">
            Salir
          </Nav.Link>
        </NavBar>
        <div style={{ marginTop: "12vh", fontFamily: "Roboto" }}>
          <Jumbotron className="bg-white">
            <h1>Bienvenido a TICMAS</h1>
            <Row className="justify-content">
              <Col>
                <h5>{props.user}</h5>
              </Col>
            </Row>
            <p>
              <Button
                variant="success"
                style={{
                  backgroundColor: "darkviolet",
                  border: "darkviolet",
                  borderRadius: "50px",
                  width: "250px",
                }}
                onClick={handleShow}
              >
                Agregar Curso
              </Button>
            </p>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "darkviolet" }}>
                  Nuevo Curso
                </Modal.Title>
              </Modal.Header>
              <Container>
                <Form method="POST" action="../api/createcourse">
                  <Form.Group controlId="">
                    <Form.Label style={{ color: "darkmagenta" }}>
                      Titulo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el titulo"
                      name="title"
                    />
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label style={{ color: "darkmagenta" }}>
                      Descripcion
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      name="description"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    style={{
                      background: "darkviolet",
                      border: "darkviolet",
                      borderRadius: "50px",
                      width: "150px",
                      marginLeft: "10%",
                    }}
                  >
                    Agregar
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    style={{
                      borderRadius: "50px",
                      width: "150px",
                      marginLeft: "10%",
                    }}
                  >
                    Cerrar
                  </Button>
                </Form>
              </Container>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </Jumbotron>
          <Row xs={1} md={3}>
            {props.courses.map((course) => (
              <Col className="px-2 mt-1">
                <ListGroup.Item
                  variant="success"
                  style={{
                    backgroundColor: "#f1eff8",
                    borderRadius: "10px",
                  }}
                >
                  <a
                    href="#"
                    style={{
                      textDecoration: "none",
                      fontFamily: "Roboto",
                      color: "#595194",
                      backgroundColor: "#f1eff8",
                    }}
                  >
                    <h1>{course.title}</h1>
                  </a>
                  <ListGroup.Item
                    style={{
                      borderRadius: "10px",
                    }}
                  >
                    {course.description}
                  </ListGroup.Item>
                  <Button
                    className="mt-4"
                    variant="info"
                    href={course._id}
                    style={{
                      backgroundColor: "#FF1493",
                      borderRadius: "50px",
                      border: "#FF1493",
                      width: "130px",
                    }}
                  >
                    {" "}
                    Ver curso{" "}
                  </Button>
                  <Button
                    variant="info"
                    className="ml-3 mt-4"
                    href={`edit/${course._id}`}
                    style={{
                      backgroundColor: "#6495ED",
                      borderRadius: "50px",
                      border: "#6495ED",
                      width: "130px",
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#FA8072",
                      border: "#FA8072",
                      borderRadius: "50px",
                      width: "130px",
                    }}
                    variant="danger"
                    className="ml-3 mt-4"
                    href={`../api/${course._id}`}
                    //onClick={handleShowAlert}
                  >
                    Borrar
                  </Button>
                  <Modal show={alert} onHide={handleCloseAlert}>
                    <Modal.Header closeButton>
                      <Modal.Title>Alert</Modal.Title>
                    </Modal.Header>
                    <Container style={{ marginTop: "20px" }}>
                      <p>Estas seguro de eliminar?</p>
                    </Container>
                    <Modal.Footer>
                      <Button variant="danger" href={`../api/${course._id}`}>
                        Eliminar
                      </Button>
                      <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </ListGroup.Item>
              </Col>
            ))}
          </Row>
        </div>
      </Layout>
    </div>
  );
}
