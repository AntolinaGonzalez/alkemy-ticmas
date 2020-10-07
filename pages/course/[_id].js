import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavBar from "../../components/navbar";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";
import Nav from "react-bootstrap/Nav";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faVideo } from "@fortawesome/free-solid-svg-icons";
import ReactPlayer from "react-player";
import FilePreviewer from "react-file-previewer";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import axios from "axios";

Show.getInitialProps = async ({ query }) => {
  let id = query._id;
  let course = await axios.get(`${process.env.API_BASE_URL}/courses/${id}`);

  let sections = await axios.get(
    `${process.env.API_BASE_URL}/courses/${id}/sections`
  );

  let sectionData;

  if (query.section == undefined) {
    let section = await axios.get(
      `${process.env.API_BASE_URL}/courses/${id}/section`
    );
    sectionData = section;
  } else {
    sectionData = await axios.get(
      `${process.env.API_BASE_URL}/seccions/${query.section}`
    );
  }

  let contents;

  if (sectionData.data != "") {
    contents = await axios.get(
      `${process.env.API_BASE_URL}/seccions/${sectionData.data._id}/contents`
    );
    contents = contents.data;
  } else {
    contents = [];
  }

  return {
    id,
    course: course.data,
    sections: sections.data,
    sectionData: sectionData.data,
    contents: contents,
  };
};

export default function Show(props) {
  //  crear seccion
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //alerta al borrar curso
  const [alertCourse, setAlertCourse] = useState(false);
  const handleCloseAlertCourse = () => setAlertCourse(false);
  const handleShowAlertCourse = () => setAlertCourse(true);

  return (
    <div className={styles.container}>
      <Layout>
        <NavBar Navigation>
          <Nav.Link style={{ color: "darkviolet" }} href="/course/list">
            Cursos
          </Nav.Link>
          <Nav.Link style={{ color: "darkviolet" }} href="/">
            Salir
          </Nav.Link>
        </NavBar>
        <div style={{ marginTop: "10vh" }}>
          {/* Jumbotron de cursos */}
          <Jumbotron style={{ marginTop: "3%", backgroundColor: "white" }}>
            <h1>{props.course.title}</h1>
            <h4>{props.course.description}</h4>
            <Button
              variant="success"
              className="mt-4"
              onClick={handleShow}
              style={{
                backgroundColor: "darkviolet",
                border: "darkviolet",
                borderRadius: "50px",
                width: "250px",
              }}
            >
              Crear Seccion
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-5%",
              }}
            >
              <Button
                variant="info"
                className="ml-3 mt-4"
                href={`edit/${props.id}`}
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
                variant="danger"
                className="ml-3 mt-4"
                style={{ textAlign: "center" }}
                // href={`../api/${course._id}`}
                onClick={handleShowAlertCourse}
                style={{
                  backgroundColor: "#FA8072",
                  border: "#FA8072",
                  borderRadius: "50px",
                  width: "130px",
                }}
              >
                Borrar
              </Button>
            </div>
            {/* modal de alerta de curso*/}
            <Modal show={alertCourse} onHide={handleCloseAlertCourse}>
              <Modal.Header closeButton>
                <Modal.Title>Alert</Modal.Title>
              </Modal.Header>
              <Container style={{ marginTop: "20px" }}>
                <p>Estas seguro de eliminar?</p>
              </Container>
              <Modal.Footer>
                <Button variant="danger" href={`../api/${props.id}`}>
                  Eliminar
                </Button>
                <Button variant="secondary" onClick={handleCloseAlertCourse}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>

            {/* modal de nueva seccion */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nueva Sección</Modal.Title>
              </Modal.Header>
              <Container>
                <Form method="POST" action={`../api/section/${props.id}`}>
                  <Form.Group controlId="">
                    <Form.Label>Titulo</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el titulo"
                      name="title"
                    />
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Ingrese descripción"
                      name="description"
                    />
                  </Form.Group>
                  <Form.Group controlId="">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      placeholder="Contenido"
                      name="content"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Agregar
                  </Button>
                </Form>
              </Container>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </Jumbotron>

          {/* secciones y contenidos de un curso */}

          <List list={props} />
        </div>
      </Layout>
    </div>
  );
}

function List(props) {
  // alerta al borrar
  const [alert, setAlert] = useState(false);
  const handleCloseAlert = () => setAlert(false);
  const handleShowAlert = () => setAlert(true);

  //  mostrar contenido
  const [content, setContent] = useState(false);
  const handleCloseContent = () => setContent(false);
  const handleShowContent = () => setContent(true);

  if (props.list.sections.length === 0) {
    return null;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <div>
        <ListGroup style={{ width: "18rem" }}>
          <ListGroup.Item
            className="active"
            style={{
              backgroundColor: "white",
              color: "black",
              border: "white",
              fontSize: "30px",
            }}
          >
            Secciones
          </ListGroup.Item>
          {props.list.sections.map((section) => (
            <SectionSelected
              section={section}
              data={props.list.sectionData._id}
              course={props.list.course._id}
            />
          ))}
        </ListGroup>
      </div>
      <div>
        {/* contenidos */}
        <Jumbotron
          style={{
            padding: "5vh",
            backgroundColor: "white",
            borderBottomColor: "black",
            borderBottom: "2px",
          }}
        >
          {/* contenidos */}

          <h1>{props.list.sectionData.title}</h1>
          <h4 className="mt-4">{props.list.sectionData.description}</h4>
          <h4>{props.list.sectionData.content}</h4>
          <p>
            <Button
              className="mt-4"
              variant="success"
              href={`/course/section/content/${props.list.sectionData._id}?course=${props.list.course._id}`}
              style={{
                backgroundColor: "darkviolet",
                border: "darkviolet",
                borderRadius: "50px",
                width: "250px",
              }}
            >
              Agregar Contenido
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "-5%",
              }}
            >
              <Button
                variant="info"
                className="ml-3 mt-4"
                href={`/course/section/edit/${props.list.sectionData._id}?course=${props.list.course._id}`}
                style={{
                  backgroundColor: "#6495ED",
                  borderRadius: "50px",
                  border: "#6495ED",
                  width: "130px",
                }}
              >
                Editar
              </Button>
              {/* borrar contenido */}
              <Button
                variant="danger"
                className="ml-3 mt-4"
                style={{ textAlign: "center" }}
                // href={`../api/${course._id}`}
                onClick={handleShowAlert}
                style={{
                  backgroundColor: "#FA8072",
                  borderRadius: "50px",
                  border: "#FA8072",
                  width: "130px",
                }}
              >
                Borrar
              </Button>
              {/* editar contenido */}

              {/* modal alerta de eliminar seccion */}
              <Modal show={alert} onHide={handleCloseAlert}>
                <Modal.Header closeButton>
                  <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Container style={{ marginTop: "20px" }}>
                  <p>Estas seguro de eliminar?</p>
                </Container>
                <Modal.Footer>
                  <Button
                    variant="danger"
                    href={`../api/section/delete/${props.list.sectionData._id}?course=${props.list.course._id}`}
                  >
                    Eliminar
                  </Button>
                  <Button variant="secondary" onClick={handleCloseAlert}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </p>
        </Jumbotron>
        {props.list.contents.map((content) => (
          <Card
            className="text-center mb-4"
            style={{
              background: "#f1eff8",
              boxShadow: "0 0 40px rgba(56, 46, 46, 0.1)",
              borderRadius: "10px",
            }}
          >
            <Card.Header as="h4">{content.title}</Card.Header>
            <Card.Body
              style={{
                backgroundColor: "#f1eff8",
                borderRadius: "10px",
              }}
            >
              <Card.Title>{content.description}</Card.Title>
              <Card>
                <Card.Text>Contenido</Card.Text>

                <div className="contenedorContenidos">
                  <div className="contenedorGrid">
                    {content.media.map((contenido) => (
                      <ul className="list-unstyled">
                        <ContentMedia content={contenido} />
                        
                      </ul>
                    ))}
                  </div>
                </div>
              </Card>
              <Button
                variant="info"
                className="mr-4 mt-4"
                href={`/course/section/content/edit/${content._id}?course=${props.list.course._id}`}
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
                variant="danger"
                className="mt-4"
                href={`../../api/content/delete/${content._id}?course=${props.list.course._id}`}
                style={{
                  backgroundColor: "#FA8072",
                  borderRadius: "50px",
                  border: "#FA8072",
                  width: "130px",
                }}
              >
                Eliminar
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <style jsx>
        {`
          .bodyContent {
            border-left: 2px solid grey;
            margin: 10px 10px 0 10px;
            height: 100px;
          }
          .bodyContent h5 {
            border-bottom: 2px solid grey;
          }
          .mediaContent {
            width: 200px;
            height: 100px;
            margin: 10px 0 0 10px;
            display: flex;
            border: 2px solid black;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}

function ContentMedia(content) {
  console.log("este es", content.content.title);
  if (!content.content.title) {
    return null;
  }
  return (
    <ul className="list-unstyled">
      <Media as="li">
        <div className="mediaContent">
          {/* <PreviewComponent value={"video"} /> */}
          <ReactPlayer
            url={content.content.url}
            className="react-player m-0 p-0 b-0"
            autoplay="false"
            width="200px"
            height="100px"
            controls
          />
        </div>
        <Media.Body>
          <div className="bodyContent">
            <h5>{content.content.title}</h5>
            <p>{content.content.description}</p>
          </div>
        </Media.Body>
      </Media>
     
      <style jsx>
        {`
          .bodyContent {
            border-left: 2px solid grey;
            margin: 10px 10px 0 10px;
            height: 100px;
          }
          .bodyContent h5 {
            border-bottom: 2px solid grey;
          }
          .mediaContent {
            width: 200px;
            height: 100px;
            margin: 10px 0 0 10px;
            display: flex;
            border: 2px solid black;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        `}
      </style>
    </ul>
  );
}

function MediaIcon(props) {
  switch (props.value) {
    case "Admin":
      return <FontAwesomeIcon icon={faCamera} />;
    case "Manager":
      return <FontAwesomeIcon icon={faVideo} />;
    default:
      return <FontAwesomeIcon icon={faUser} />;
  }
}

function SectionSelected(section) {
  console.log("section", section.section._id);
  console.log("url", section.data);
  console.log("curso", section.course);
  if (section.data === section.section._id) {
    return (
      <ListGroup.Item
        action
        href={`./${section.course}?section=${section.section._id}`}
        style={{ backgroundColor: "#6495ED", color: "white" }}
      >
        {section.section.title}
      </ListGroup.Item>
    );
  }
  return (
    <ListGroup.Item
      action
      href={`./${section.course}?section=${section.section._id}`}
    >
      {section.section.title}
    </ListGroup.Item>
  );
}
function PreviewComponent(props) {
  switch (props.value) {
    case "video":
      return (
        <ReactPlayer
          url={contenido.url}
          className="react-player m-0 p-0 b-0"
          playing
          width="200px"
          height="100px"
          controls
        />
      );

    case "url":
      return (
        <a target="_blank" href="https://www.ticmas.com/">
          Link
        </a>
      );

    default:
      return (
        <FilePreviewer
          width={800}
          className="m-0 p-0 b-0"
          file={{
            url:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
          }}
        />
      );
  }
}
