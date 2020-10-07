import NavBar from "../../../../components/navbar";
import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Row,
  Container,
  Form,
  FormControl,
  Tab,
  InputGroup,
  FormLabel,
  FormGroup,
} from "react-bootstrap";

CreateContent.getInitialProps = async ({ query }) => {
  let course = query.course;
  let id = query.createContent;
  return { id, course };
};

export default function CreateContent(props) {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      <Container>
        <NavBar Navigation>
          <Nav.Link style={{color: 'darkviolet'}} href="/">
            Salir
          </Nav.Link>
        </NavBar>
        <div
          style={{
            marginTop: "13vh",
            marginBottom: "10vh",
            border: "3px solid darkviolet",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <Row variant="success" className="justify-content-md-center">
            <Col xs="auto">
              <Form
                method="POST"
                action={`../../../api/content/${props.id}?course=${props.course}`}
              >
                <div style={{ display: "flex" }}>
                <div style={{ marginRight: "30px", maxWidth: "45%" }}>
                <h1 className="text-center">Agregar Contenido</h1>
                <p className="text-center">
                  Complete el siguiente formulario para agregar nuevos
                  contenidos al curso
                </p>
                <Form.Group controlId="title">
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control
                    type="title"
                    placeholder="Introduzca titulo del nuevo contenido"
                    name="title"
                  />
                  <Form.Text className="text-muted">
                    Ej: Aprenda TypeScript en 2hs!
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Breve descripción del contenido</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Descripción del contenido"
                    name="description"
                  />
                </Form.Group>
                </div>

                <div style={{marginTop: "1.5%"}}>
                <h4 className="text-center">Subida de Archivos</h4>
                    <div
                      style={{
                        marginTop: "2%",
                        border: "1px solid #f1eff8",
                        padding: "20px",
                        borderRadius: "10px",
                        background: "#f1eff8",
                        boxShadow: "0 0 40px rgba(56, 46, 46, 0.1)"
                      }}
                    >
                      <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="first"
                      >
                        <Row>
                          <Col sm={4}>
                            <Nav variant="tabs" className="flex-column">
                              <Nav.Item>
                                <Nav.Link style={{ color: "#3b3663", fontWeight:"600"}} eventKey="first">Subir Archivos</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link style={{ color: "#3b3663", fontWeight:"600"}} eventKey="second">URL externos</Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Col>
                          <Col sm={8}>
                            <Tab.Content variant="success">
                              <Tab.Pane eventKey="first">
                                <p>Enriquezca el contenido</p>

                                <Form.File id="formcheck-api-regular">
                                  <Form.File.Label>
                                    Extensiones .jpg .pdf
                                  </Form.File.Label>
                                  <Form.File.Input name="image" />
                                  {/* <input
                                  type="file"
                                  name="image"
                                  value={selectedFile}
                                  onChange={(e) => setSelectedFile(e.target.files[0])}
                                /> */}
                                </Form.File>
                                <FormGroup>
                                  <FormLabel>Titulo del archivo</FormLabel>
                                  <FormControl
                                    type="title"
                                    placeholder="Ej: Organigrama de Apple"
                                    name="mediaTitle"
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <FormLabel>Descripcion</FormLabel>
                                  <FormControl
                                    as="textarea"
                                    rows="3"
                                    placeholder="Ej: Aqui se detallan los departamentos de Apple"
                                    name="mediaDescription"
                                  />
                                </FormGroup>
                              </Tab.Pane>
                              <Tab.Pane style={{width:"100%"}} eventKey="second">
                                <p>Comparta videos para fomentar el aprendizaje creativo</p>
                                <InputGroup className="mb-2">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text>Link</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl
                                    id="inlineFormInputGroup"
                                    name="url"
                                    placeholder="Ej: https://www.youtube.com/?gl=AR&hl=es-419"
                                  />
                                </InputGroup>

                                <FormGroup>
                                  <FormLabel>Titulo de URL</FormLabel>
                                  <FormControl
                                    type="title"
                                    placeholder="Ej: Tutorial cómo usar Docker"
                                    name="urlTitle"
                                  />
                                </FormGroup>
                                <FormGroup>
                                  <FormLabel>Descripcion</FormLabel>
                                  <FormControl
                                    as="textarea"
                                    rows="3"
                                    placeholder="Ej: Aprende a utilizar Docker desde cero."
                                    name="urlDescription"
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
                
                

                <div
                  style={{
                    borderTop: "3px solid grey",
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Button style={{background:"#FF1493", border: 'darkviolet', borderRadius:'50px', width:'250px'}} type="submit" className="mt-2 mr-4">
                    Crear
                  </Button>
                  <Button style={{background:"#FA8072", border: 'darkviolet', borderRadius:'50px', width:'250px'}} href="/" className="mt-2">
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
