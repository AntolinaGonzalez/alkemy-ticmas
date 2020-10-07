import { Navbar, Nav, Container } from 'react-bootstrap';

function Navigation ({children}) {
    return (
        <div>
            <Container>
                <Navbar collapseOnSelect bg="white" fixed="top">
                    <Navbar.Brand href="/" >
                    <img
                        alt=""
                        src="/logoTICMAS.svg"
                        width="180px"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                        <Nav>{children}</Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </div>
    )
}

export default Navigation;