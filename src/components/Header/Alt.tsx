import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Alt.css'

export default function Alt() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href='#sapr'>САПР</Navbar.Brand>
                <Nav className="links">
                    <Nav.Link className='linkColor' href="#home">Препроцессор</Nav.Link>
                    <Nav.Link className='linkColor' href="#features">Процессор</Nav.Link>
                    <Nav.Link className='linkColor' href="#pricing">Постпроцессор</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}