import { createContext, useState, useContext } from 'react'

const PicoContext = createContext(null)

export function PicoProvider({ children }) {

    //switches for sound effects
    const [switchStatus, setSwitchStatus] = useState({
        '1': 'idle',
        '2': 'idle',
        '3': 'idle'
    })

    //add more for later
    const [modelStatus, setModelStatus] = useState('')
    const [isConnected, setIsConnected] = useState(false)

    //connect pico
    const connectPico = async () => {
        try {
            console.log('1. Prompting user for serial port selection...')
            const port = await navigator.serial.requestPort()
            console.log('2. Opening port at 115200 baud...')
            await port.open({baudRate: 115200})

            setIsConnected(true)
            console.log('Port open, Listening for serial data')

            const reader = port.readable.getReader()
            const decoder = new TextDecoder()

            let buffer = '' // add buffer so that reading line is smooth

            while (true) {
                console.log('in the loop')
                const { value, done } = await reader.read()
                console.log('say something')
                if (done) break

                buffer += decoder.decode(value, {stream: true})
                const lines = buffer.split('\n')
                buffer = lines.pop()

                for (const line of lines) {
                    const cleanLine = line.trim()
                    if (!cleanLine) continue
                    console.log('Line received:', cleanLine) // debug using inspect console

                    // Matches input
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

                    // add more match for later input
                    //const audioMatch = cleanLine.match(/^PLAYING:\s*(.*)$/)
                    const audioMatch = cleanLine.match('PLAYING')
                    if (audioMatch){
                        // add changes you want to make here

                        //if specific track use this
                        //const trackName = audioMatch[1]
                        //setModelStatus(trackName)
                        setModelStatus('PLAYING')
                    }
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
    return(
        <PicoContext.Provider value={{ switchStatus, modelStatus, connectPico, isConnected, setModelStatus}}>
            {children}
        </PicoContext.Provider>
    )

}
export const usePico = () => useContext(PicoContext)
