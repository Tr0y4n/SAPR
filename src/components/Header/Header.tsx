import React from 'react'
import './Header.css'
import { Button } from '@material-ui/core';

export default function Header() {
    return (
        <header className='line'>
            <Button className="button" variant="contained" size="large" color="secondary">Препроцессор</Button>
            <Button className="button" variant="contained" size="large" color="secondary">Процессор</Button>
            <Button className="button" variant="contained" size="large" color="primary">Постпроцессор</Button>
        </header>
    )
}