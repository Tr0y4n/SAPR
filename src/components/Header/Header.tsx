import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Header.css'
import Button from 'react-bootstrap/Button'
import { Link, useLocation } from 'react-router-dom'


export default function Header(props: any) {
    let location = useLocation();

    const handleDownload = async () => {
        let obj = {
          RodsTable: props.dr,
          LoadsTable: props.dl
        }
        const download = require('downloadjs');
        download(JSON.stringify(obj), 'construction.kpr');
      };

    return (
        <>
        <Navbar bg="dark" variant="dark" >
            <Navbar.Brand href="https://sites.google.com/site/vladchekanin/discipliny/komputernaa-mehanika-5-semestr">САПР</Navbar.Brand>

        <div className="links">
        <Button disabled={location.pathname === '/preprocessor'} variant="outlined">
            <Link className="link" to="/preprocessor">
                Препроцессор
            </Link>
        </Button>
        <Button disabled={location.pathname === '/processor'} variant="outlined">
            <Link className="link" to="/processor">
                Процессор
            </Link>
        </Button>
        <Button disabled={location.pathname === '/postprocessor'} variant="outlined">
            <Link className="link" to="/postprocessor">
                Постпроцессор
            </Link>
        </Button>
        </div>
        <div className="load">
        <Button disabled={location.pathname === '/uploading'} variant="outlined">
            <Link className="link" to="/uploading">
                Загрузить
            </Link>
        </Button>
        <Button onClick={handleDownload} variant="outlined primary">
            <Link className="link" to='/preprocessor'>
                Скачать
            </Link>
        </Button>
        </div>
    </Navbar>
        </>
    )
}