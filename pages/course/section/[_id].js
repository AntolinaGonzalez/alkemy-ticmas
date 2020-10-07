import { Card, Jumbotron, Button, ListGroup, Container, Nav, ListGroupItem, Modal, Col } from "react-bootstrap";
import React, { useState, useEffect} from "react";
import NavBar from "../../../components/navbar";
import styles from "../../../styles/Home.module.css";
import {useRouter} from "next/router";
import axios from "axios";
import ReactPlayer from "react-player";
import FilePreviewer from "react-file-previewer";

Section.getInitialProps = async ({query}) => {
  let id = query._id;
  let section = await axios.get(`${process.env.API_BASE_URL}/seccions/${id}`);
  return {id, section:section.data};
};

export default function Section(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // let loadData = async () => {
  //   let url = `${process.env.API_BASE_URL}/seccions/${props.id}`;

  const router = useRouter();
  const {_id} = router.query;
  let loadData = async () => {
    let url = `${process.env.API_BASE_URL}/seccions/${props.id}`;

    await axios.get(url).then((res) => {
      setData(res.data);
      console.log("este es el console.log", res.data);
    });
  };

  let loadContent = async () => {
    let url = `${process.env.API_BASE_URL}/seccions/${props.id}/contents`;
    await axios.get(url).then((res) => {
      setContent(res.data)
    })
  };

  useEffect(() => {
    loadData();
    loadContent();
  }, []);

  // useEffect(() => {
  //   loadData();
  //   /* loadContent() */
  // }, []);
  return (
    <div className={styles.container}>
      <Container>
        <NavBar Navigation>
          <Nav.Link color="green" href="/">
            Salir
          </Nav.Link>
        </NavBar>

        <div style={{marginTop: "10vh"}}>
          <Jumbotron style={{padding: "5vh"}}>
            <h1>{data.title}</h1>
            <h4 className="mt-4">{data.description}</h4>
            <p className="mt-4">{data.content}</p>
            <p>
              <Button
                className="mt-4"
                variant="success"
                href={`/course/section/content/${data._id}`}
              >
                Agregar Contenido
              </Button>
            </p>
          </Jumbotron>
          {content.map((content) => (
            <Card className="text-center mb-4" bg="light" border="success">
              <Card.Header as="h4">{content.title}</Card.Header>
              <Card.Body>
                <Card.Title>{content.description} </Card.Title>
                <Card.Text>Links del contenido: </Card.Text>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}

                

                <ListGroup className="list-group-flush">

                


                

                  <ListGroupItem>
                    <Card.Link href="#" onClick={handleShow}>
                      {content.media.map((contenido) => contenido.description)}
                    </Card.Link>
                  </ListGroupItem>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    className="text-center"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title><h2>{content.media.map((contenido) => contenido.title)}</h2></Modal.Title>
                    </Modal.Header>
                    <Container className="mt-2 m-0 p-0 b-0">
                      <p>{content.media.map((contenido) => contenido.description)}</p>

                      <Col className="justify-content-center">
                        <PreviewComponent value={"video"} />
                      </Col>
                    </Container>
                    {<Modal.Footer className="justify-content-center">
                      <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                      </Button>
                    </Modal.Footer>}
                  </Modal>



                
                </ListGroup> 
                
                {/* El botón por el momento envía el ID de la sección, debería enviar el ID del CONTENIDO*/}
                <Button
                  variant="info"
                  className="mr-4 mt-4"
                  href={`/course/section/content/edit/${content._id}`}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  className="mt-4"
                  href={`../../api/content/delete/${content._id}`}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

function PreviewComponent(props) {
  switch (props.value) {
    case "video":
      return (
        <ReactPlayer
          url="https://www.youtube.com/watch?v=Tn6QYliFBcs"
          className="react-player m-0 p-0 b-0"
          playing
          width="465px"
          height="360px"
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
          className="m-0 mt-2 p-0 b-0"
          file={{
            url:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
          }}
        />
      );
  }
}

function MediaIcon(props) {
  let icon = {
    'Admin' : 'faCamera',
    'Manager' : 'faVideo',
    '' : '',
  }

  return <FontAwesomeIcon icon={icon[props.value]}/>;
}
