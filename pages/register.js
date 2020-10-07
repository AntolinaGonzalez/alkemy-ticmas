import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import NavBar from "../components/navbar"
import { Nav } from "react-bootstrap";

function Register() {
  return (
    <div className={styles.container}>
      <Layout>
          <NavBar>
          <Nav.Link href="/" style={{color: 'darkviolet'}} >Iniciar Sesion</Nav.Link>
          </NavBar>
          <Row variant="success" className="justify-content-md-center">
            <Col xs="auto">
              <Form method="POST" action="api/register">
                <h1 className="text-center" style={{color: 'darkviolet'}} >Bienvenido</h1>
                <p className="text-center" style={{color:'salmon'}}>
                  Complete el siguiente formulario para <br />
                  registrar una nueva cuenta
                </p>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{color:'darkmagenta'}}>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="Email" name="email" />
                  <Form.Text className="text-muted">
                    Nunca compartiremos su email con terceros.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label style={{color:'darkmagenta'}}>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                  />
                  <Form.Text className="text-muted">
                    Al hacer clic en "Registrar", aceptas nuestras
                    Condiciones,
                    <br />
                    la Política de datos y la Política de cookies.
                  </Form.Text>
                </Form.Group>
                <Button variant="success" type="submit" style={{background:'darkviolet', border: 'darkviolet', borderRadius:'50px', width:'350px'}}>
                  Registrar
                </Button>
                
              </Form>
            </Col>
          </Row>
      </Layout>
    </div>
  );
}

export default Register;