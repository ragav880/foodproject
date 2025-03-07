import  { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="./">Home</Nav.Link> 
            {/* <Nav.Link href="./">create recipe</Nav.Link>       */}
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="./pages/login">Login</Nav.Link>
            <Nav.Link eventKey={2} as={NavLink} to="./pages/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
