import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'
import {useLocation} from 'react-router-dom'

export default function Header() {
    let location = useLocation();
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="https://sites.google.com/site/vladchekanin/discipliny/komputernaa-mehanika-5-semestr">САПР</Navbar.Brand>
                <div className="links">
                    <Nav.Link disabled={location.pathname === '/pre'} className='linkColor' href="/pre">Препроцессор</Nav.Link>
                    <Nav.Link disabled={location.pathname === '/pro'} className='linkColor' href="/pro">Процессор</Nav.Link>
                    <Nav.Link disabled={location.pathname === '/post'} className='linkColor' href="/post">Постпроцессор</Nav.Link>
                </div>
            </Navbar>
        </>
    )
}