import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavbarComponent() {
    return (
        <Navbar bg='light' expand='sm' className='justify-content-between'>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>
                    LCS Drive
                </Navbar.Brand>
                <Nav.Link as={Link} to='/user'>
                    Profile
                </Nav.Link>
            </Container>
        </Navbar>
    )
}
