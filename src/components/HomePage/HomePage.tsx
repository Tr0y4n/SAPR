import React from 'react'
import logo from './anime.jpg'

export default function HomePage() {
    return(
        <div className="back">
           {<img src={logo} width="1536" height="695" alt="HomePage"/>}
           <h1>HomePage</h1>
        </div>
    )
} 