import NavBar from "../../../components/navbar";
import Layout from "../../../components/layout";
import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";
import { Button, Col, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";

EditCourse.getInitialProps = async ({ query }) => {
  let id = query._id;
  let course = await axios.get(`${process.env.API_BASE_URL}/courses/${id}`);
  return { id, course: course.data };
};

function EditCourse(props) {
  return (
    <Layout>
      <div>
        <Container>
          <NavBar Navigation>
            <Nav.Link style={{color: 'darkviolet'}} href="/">
              Salir
            </Nav.Link>
          </NavBar>
          <div style={{ marginTop: "10vh" }}>
            <Row>
              <Col>
                <Card style={{ borderColor: "#FF1493" }}>
                  <Card.Header
                    as="h5"
                    className="card text-white"
                    style={{ backgroundColor: "#FF1493", border: "#FF1493" }}
                  >
                    Editar curso
                  </Card.Header>
                  <Card.Body>
                    <Card.Title style={{color: 'darkviolet'}}>Formulario de edición</Card.Title>
                    <Card.Text style={{color:'salmon'}}>
                      Complete el siguiente formulario para editar su curso:
                    </Card.Text>

                    <Form method="PUT" action={`../../api/edit/${props.id}`}>
                      <Form.Group controlId="formGridTitle">
                        <Form.Label style={{ color: "darkmagenta" }}>
                          Título
                        </Form.Label>
                        <Form.Control
                          name="title"
                          defaultValue={props.course.title}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="formGridDescription" >
                        <Form.Label style={{ color: "darkmagenta" }} >
                          Descripción
                        </Form.Label>
                        <Form.Control
                          name="description"
                          as="textarea"
                          rows="3"
                          defaultValue={props.course.description}
                          required
                        />
                      </Form.Group>
                      <div style={{display:'flex', justifyContent:'flex-end'}}>
                      <Button  type="submit" style={{background:'darkviolet', border: 'darkviolet', borderRadius:'50px', width:'150px'}}>
                        Editar
                      </Button>{" "}
                      <Button  href="/course/list" style={{ borderRadius:'50px', width:'150px', marginLeft:'5px'}}>
                        Cancelar
                      </Button>
                      </div>
                      
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Layout>
  );
}

export default EditCourse;
