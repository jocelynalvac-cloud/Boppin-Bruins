import {useState} from 'react'
import {Link} from 'react-router-dom'
import './App.css'

export default function LiveVisual(){
    const [isOn, setIsOn] = useState(false)
      
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
                    if(cleanLine === 'ON') setIsOn(true)
                    if(cleanLine === 'OFF') setIsOn(false)
                }
            }
        } catch (err){
            console.error(err)
        }
    }
    return(
        <div>
            <h1>Our Live Visual</h1>
            <button onClick = {connectPico}>Connect Pico</button>
            <div className = {isOn ? 'shaking' : ''}>
            {isOn ? <p>ON</p>
            : <p>OFF</p>
            }
            </div>
            <a href="/">Go back home</a>
        </div>
    )
}