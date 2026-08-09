import {useState} from 'react'
import './App.css'
import bopitImg from './assets/dynamic-bop-it.png'
import {usePico} from './PicoContext'


export default function LiveVisual(){
    // get state and connect from PicoContext
    const {switchStatus, connectPico} = usePico()
      
    const switches = ['1','2','3']
    const activeEffects = Object.values(switchStatus)
    .filter((cls) => cls !== 'idle')
    .join(' ') || 'idle'

    return(
        <div>
            <h1>Our Live Visual</h1>
             {/* button calls connectPico */}
            <button onClick = {connectPico}>Connect Pico</button>
            <div className = {activeEffects}>
                <img src={bopitImg} width={150} style={{ transform: 'none' }}/>       
            </div>
            <div>
                {switches.map((id) => {
                    //extract key and class as string
                    const switchKey = `switches-${id}`
                    const activeClass = switchStatus[id] || 'idle'

                    return(
                        <div key = {switchKey} className = {activeClass}>
                            <p>Switch {id}: {activeClass.toUpperCase()}</p>
                        </div>
                    )
                })}
            </div>
            <Link to="/">Go back home</Link>
        </div>
    )
}