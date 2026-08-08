import {useState} from 'react'
import './App.css'
import bopitImg from './assets/dynamic-bop-it.png'


export default function LiveVisual(){
    //set default css class name
    const [switchStatus, setSwitchStatus] = useState({
        '1': 'idle',
        '2': 'idle',
        '3': 'idle'
    })
      
    //connect Pico
    const connectPico = async () => {
        try{
            const port = await navigator.serial.requestPort()
            await port.open({baudRate: 115200})

            const textDecoder = new TextDecoderStream()
            port.readable.pipeTo(textDecoder.writable)
            const reader = textDecoder.readable.getReader()

            let buffer = '' //add buffer so that reading line is smooth

            while (true) {
                const {value, done} = await reader.read()
                if (done) break

                buffer += value
                const lines = buffer.split('\n')
                buffer = lines.pop()

                for (const line of lines) {
                    const cleanLine = line.trim()
                    if (!cleanLine) continue
                    console.log('Line received:', cleanLine) //debug using double click, inspect, console
                    // matches input
                    const match = cleanLine.match(/^(\d+)(ON|OFF)$/)
                    if (match) {
                        const [, id, state] = match
                        
                        let cssClass = 'idle'
                        if (state === 'ON') {
                            if (id === '1') cssClass = 'shaking'
                            if (id === '2') cssClass = 'echo'
                            if (id === '3') cssClass = 'swirl'
                        }
                        if (state === 'OFF') cssClass = 'idle'

                        setSwitchStatus((prev) => ({
                            ...prev,
                            [id]: cssClass
                        }))
                    }
                }
            }
        } catch (err){
            console.error(err)
        }
    }

    const switches = ['1','2','3']
    const activeEffects = Object.values(switchStatus)
    .filter((cls) => cls !== 'idle')
    .join(' ') || 'idle'

    return(
        <div>
            <h1>Our Live Visual</h1>
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
            <a href="/">Go back home</a>
        </div>
    )
}