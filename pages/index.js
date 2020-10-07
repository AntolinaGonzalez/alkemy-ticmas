import  Nav  from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavBar from "../components/navbar";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { Col,Row } from "react-bootstrap";



export default function Login() {
  return (
    <div className={styles.container}>
      <Layout>
        <NavBar Navigation>
          <Nav.Link  href="/register" style={{color:'darkviolet'}}>
            Registrarse
          </Nav.Link>
        </NavBar>
        <Row variant="success" className="justify-content-md-center" >
            <Col xs="auto" >
            <Form method="GET" action="api/login" >
            <h1 className="text-center" style={{color: 'darkviolet'}}>Iniciar Sesión</h1>
                <p className="text-center" style={{color:'salmon'}}>
                  ¡Bienvenido nuevamente!
                </p>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{color:'darkmagenta'}}>Correo Electronico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Introduzca correo"
                  name="email"
                />
                <Form.Text className="text-muted">
                  No compartiremos tu correo con nadie.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{color:'darkmagenta'}}>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                />
              </Form.Group>
              <Button variant="success" type="submit" style={{background:'darkviolet', border: 'darkviolet', borderRadius:'50px', width:'250px'}}>
                Log in
              </Button>
            </Form>
            </Col>
        </Row>
      </Layout>
    </div>
  );
}