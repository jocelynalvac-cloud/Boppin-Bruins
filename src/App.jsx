import { useState } from 'react'
import bandImg from './assets/band.png'
import bopitImg from './assets/bop it.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={bopitImg} className="base band-photo" alt="Band photo" />
          
        </div>
      
          <h1>Introducing Bop It Reinvented!</h1>
          
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          
          <h2>Picture of Band</h2>
          <img src={bandImg} className="band-photo" alt="Band photo" />
          
        </div>
        <div id="social">
          
          <h2>Member Introductions</h2>
          <p>Meet the members of the band and learn about their musical journey.</p>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
