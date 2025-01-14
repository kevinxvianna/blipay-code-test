import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactBootstrapNavbar from 'react-bootstrap/Navbar';
import { ROUTER_PATHS } from '../../constants';

export const Navbar: React.FC = () => {
  return (
    <ReactBootstrapNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <ReactBootstrapNavbar.Brand href={`${ROUTER_PATHS.HOME}`}>
          Blipay's Code Test
        </ReactBootstrapNavbar.Brand>
        <ReactBootstrapNavbar.Toggle aria-controls="basic-Navbar-nav" />
        <ReactBootstrapNavbar.Collapse id="basic-Navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href={`${ROUTER_PATHS.HOME}`}>Home</Nav.Link>
            <Nav.Link href={`${ROUTER_PATHS.PERSON}`}>Pessoa física</Nav.Link>
            <Nav.Link href={`${ROUTER_PATHS.COMPANY}`}>
              Pessoa jurídica
            </Nav.Link>

            <Nav.Link href={`${ROUTER_PATHS.SIMULATIONS_LIST}`}>
              Lista de simulações
            </Nav.Link>
          </Nav>
        </ReactBootstrapNavbar.Collapse>
      </Container>
    </ReactBootstrapNavbar>
  );
};

export default Navbar;
