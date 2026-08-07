import { useState } from 'react'
import reactLogo from './assets/react.svg'
import bandImg from './assets/Boppin Bruins_photo.png'
import bopitImg from './assets/bop it.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={bopitImg} className="base" width="170" height="179" alt="" />
          
        </div>
        <div>
          <h1>Introducing Bop It Reinvented!</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Picture of Band</h2>
          <img src={bandImg} alt="Picture of the band" />
        </div>

      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
