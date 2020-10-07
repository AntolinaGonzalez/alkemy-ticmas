import NavBar from "../../../../components/navbar";
import Nav from "react-bootstrap/Nav";
import Layout from "../../../../components/layout"
import React, { useState, useEffect } from "react";
import { Button, Col, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";

EditSeccions.getInitialProps = async ({ query }) => {
  let id = query.id;
  let section = await axios.get(`${process.env.API_BASE_URL}/seccions/${id}`);
  let course = query.course;
  return { id, course, section:section.data};
};

function EditSeccions(props) {
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
                <Card.Header as="h5" className="card text-white" style={{ backgroundColor: "#FF1493", border: "#FF1493" }}>
                  Editar seccion
                </Card.Header>
                <Card.Body>
                  <Card.Title style={{color: 'darkviolet'}}>Formulario de edición</Card.Title>
                  <Card.Text style={{color:'salmon'}}>
                    Complete el siguiente formulario para editar la seccion:
                  </Card.Text>

                  <Form
                    method="PUT"
                    action={`../../../api/editsec/${props.id}?course=${props.course}`}
                  >
                    <Form.Group controlId="formGridTitle">
                      <Form.Control name="course" Value={props.course} style={{"display":"none"}}/>
                    </Form.Group>
                    <Form.Group controlId="formGridTitle">
                      <Form.Label style={{ color: "darkmagenta" }}>Titulo</Form.Label>
                      <Form.Control name="title" defaultValue={props.section.title} required/>
                    </Form.Group>
                    <Form.Group controlId="formGridDescription">
                      <Form.Label style={{ color: "darkmagenta" }}>Descripción</Form.Label>
                      <Form.Control
                        name="description"
                        as="textarea"
                        rows="3"
                        defaultValue={props.section.description}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formGridDescription">
                      <Form.Label style={{ color: "darkmagenta" }}>Contenido</Form.Label>
                      <Form.Control
                        name="content"
                        as="textarea"
                        rows="3"
                        defaultValue={props.section.content}
                        required
                      />
                    </Form.Group>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Button type="submit" style={{background:'darkviolet', border: 'darkviolet', borderRadius:'50px', width:'150px'}}>
                      Editar
                    </Button>{" "}
                    <Button  href={`/course/${props.course}`} style={{ borderRadius:'50px', width:'150px', marginLeft:'5px'}}>
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

export default EditSeccions;
