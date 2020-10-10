import React from 'react'
import './Header.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    return (
        <header className='line'>
            <Button variant = 'secondary' size = 'lg'>Препроцессор</Button>{' '}
            <Button variant = 'outline-dark' size = 'lg'>Процессор</Button>{' '}
            <Button variant = 'outline-danger' size = 'lg'>Постпроцессор</Button>{' '}
        </header>
    )
}