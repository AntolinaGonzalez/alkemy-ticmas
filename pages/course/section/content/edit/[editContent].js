import NavBar from "components/navbar";
import Nav from "react-bootstrap/Nav";
import React, {useState, useEffect} from "react";
import Tab from "react-bootstrap/Tab";
import FormGroup from "react-bootstrap/FormGroup";
import { FormLabel, FormControl, InputGroup } from "react-bootstrap";
import {
  Button,
  Col,
  Row,
  Container,
  Form,
} from 'react-bootstrap';
import axios from 'axios'

EditContent.getInitialProps = async ({query}) => {
  let course = query.course
  let id = query.editContent
  let content = await axios.get(`${process.env.API_BASE_URL}/contents/${id}`);
  return {id, course,content: content.data}
}

export default function EditContent(props) {
console.log(props.content)
  return (
    <div>
      <Container>
        <NavBar Navigation>
          <Nav.Link style={{color: 'darkviolet'}} href="/">
            Salir
          </Nav.Link>
        </NavBar>
        <div style={{
          marginTop: "13vh",
          marginBottom: "10vh",
          border: "3px solid darkviolet",
          borderRadius: "20px",
          padding: "20px",
        }}>
          <Row variant="success" className="justify-content-md-center">
            <Col xs="auto">
              {/* ESTO DEBE ENVIAR EL ID dEL CONTENIDO*/}
              <Form method="PUT" action={`../../../../api/content/edit/${props.id}?course=${props.course}`}>
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "30px", maxWidth: "45%" }}>
                  <h1 className="text-center">Editar Contenido</h1>
                <p className="text-center">
                  Complete el siguiente formulario para editar el contenido del curso
                </p>
                <Form.Group controlId="title">
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control
                    type="title"
                    name="title" placeholder="Nuevo titulo"
                    defaultValue={props.content.title}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control type="hidden" value={props.course} name="course_id"/>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea" rows="3"
                    name="description"
                    placeholder="Nueva Descripcion"
                    defaultValue={props.content.description}
                  />
                </Form.Group>
                  </div>

                  <div style={{marginTop: "1.5%"}}>
                  <h4 className="text-center">Subida de Nuevos Archivos</h4>
                <div style={{
                  marginTop: "2%",
                  border: "1px solid #f0fffc",
                  padding: "20px",
                  borderRadius: "10px",
                  background: "#f0fffc",
                  boxShadow: "0 0 40px rgba(56, 46, 46, 0.1)"
                }}>
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                      <Col sm={4}>
                        <Nav variant="tabs" className="flex-column">
                          <Nav.Item>
                            <Nav.Link style={{ color: "#3b3663", fontWeight:"600"}}  eventKey="first">Editar Archivo</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link style={{ color: "#3b3663", fontWeight:"600"}}  eventKey="second">Editar URL</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                      <Col sm={8}>
                        <Tab.Content variant="success">
                          <Tab.Pane eventKey="first">
                            <p>Enriquezca el contenido</p>

                            <Form.File id="formcheck-api-regular">
                              <Form.File.Label defaultValue={props.content.media[0].url}>Extensiones .jpg .pdf</Form.File.Label>
                              <Form.File.Input name="image"/>
                            </Form.File>

                            <FormGroup>
                              <FormLabel>
                                Titulo del archivo
                              </FormLabel>
                              <FormControl
                                type="title"
                                placeholder="Ej: Organigrama de Apple"
                                name="mediaTitle"
                                defaultValue={props.content.media[0].title}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>
                                Descripcion
                              </FormLabel>
                              <FormControl
                                as="textarea"
                                rows="3"
                                placeholder="Ej: Aqui se detallan los departamentos de Apple"
                                name="mediaDescription"
                                defaultValue={props.content.media[0].description}
                              />
                            </FormGroup>

                          </Tab.Pane>
                          <Tab.Pane style={{width:"100%"}} eventKey="second">
                            <p>Comparta videos para fomentar el aprendizaje creativo</p>
                            <InputGroup className="mb-2">
                              <InputGroup.Prepend>
                                <InputGroup.Text>Link</InputGroup.Text>
                              </InputGroup.Prepend>
                              <FormControl name="url" id="inlineFormInputGroup"
                                           placeholder="Ej: https://www.youtube.com/?gl=AR&hl=es-419"
                                           defaultValue={props.content.media[1].url}/>
                            </InputGroup>

                            <FormGroup>
                              <FormLabel>
                                Titulo de URL
                              </FormLabel>
                              <FormControl
                                type="title"
                                placeholder="Ej: Tutorial cómo usar Docker"
                                name="urlTitle"
                                defaultValue={props.content.media[1].title}
                              />
                            </FormGroup>
                            <FormGroup>
                              <FormLabel>
                                Descripcion
                              </FormLabel>
                              <FormControl
                                as="textarea"
                                rows="3"
                                placeholder="Ej: Aprende a utilizar Docker desde cero."
                                name="urlDescription"
                                defaultValue={props.content.media[1].description}
                              />
                            </FormGroup>

                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
                  </div>
                </div>

                <div style={{
                    borderTop: "3px solid grey",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center"
                  }}>
                <Button style={{background:"#FF1493", border: 'darkviolet', borderRadius:'50px', width:'250px'}} type="submit" className="mt-2 mr-4">
                  Editar
                </Button>
                <Button style={{background:"#FA8072", border: 'darkviolet', borderRadius:'50px', width:'250px'}} href={`/course/${props.course}`} className="mt-2">
                  Cancelar
                </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}