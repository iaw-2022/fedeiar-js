import { Navbar, Nav, Container } from "react-bootstrap"; 
import { Outlet, Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <div>
            <Navbar className="navBg" bg="light" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/games">Games</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>
        </div>
    )
}

export default NavigationBar;