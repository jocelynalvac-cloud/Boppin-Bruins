import bopitImg from './assets/dynamic-bop-it.png'
import jocelynImg from './assets/jocelyn.png'
import alexImg from './assets/alex.png'
import blakeImg from './assets/blake.png'
import sominImg from './assets/somin.png'
import shapestop from './assets/shapestop.webp'
import shapesmiddle from './assets/shapesmiddle.webp'
import shapesbottom from './assets/shapesbottom.png'

import {useRef, useState} from 'react'
import {motion} from 'framer-motion'
import bopitVideo from './assets/Hasbro Bop It Commercial_1080p.mp4'


import './App.css'
import ThreeDPage from './ThreeDPage'
import { Link } from 'react-router-dom'


const members = [
  {
    name: 'Alex',
    image: alexImg,
    bio: 'tempdesc: Alex is the lead guitarist of the band, known for his electrifying solos and stage presence.'
  },
  {
    name: 'Blake',
    image: blakeImg,
    bio: 'tempdesc: Blake is the drummer of the band, known for his powerful beats and rhythmic precision.'
  },
  {
    name: 'Somin',
    image: sominImg,
    bio: 'tempdesc: Somin brings strong vocals and creative energy to every performance.'
  },
  {
    name: 'Jocelyn',
    image: jocelynImg,
    bio: 'tempdesc: Jocelyn adds charm and style to the band with a memorable stage presence.'
  }
]

const ParallaxHero = () => {
  return (
    <div className="background-layer">
      <div className="shape-wrapper shape-wrapper-bottom">
        <motion.img
          src={shapesbottom}
          animate={{
            y: [0, -24, 0],
            x: [0, 12, 0],
            rotate: [0, 1.5, 0],
            opacity: [0.25, 0.38, 0.25]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="bg-shape"
        />
      </div>

      <div className="shape-wrapper shape-wrapper-middle">
        <motion.img
          src={shapesmiddle}
          animate={{
            y: [0, -18, 0],
            x: [0, -10, 0],
            rotate: [0, -2, 0],
            opacity: [0.30, 0.45, 0.30]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="bg-shape"
        />
      </div>


      
      <div className="shape-wrapper shape-wrapper-top">
        <motion.img
          src={shapestop}
          animate={{
            y: [0, -26, 0],
            x: [0, 8, 0],
            rotate: [0, 2, 0],
            opacity: [0.25, 0.40, 0.25]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="bg-shape"
        />
      </div>
    </div>
  )
}





export default function App() {
  const[isBopping, setIsBopping] = useState(false)
  const [isTwisting, setIsTwisting] = useState(false)
  const[isPulling, setIsPulling] = useState(false)
  const [openMember, setOpenMember]= useState(null)

  const videoRef = useRef(null)
  const[isVideoPlaying, setIsVideoPlaying] = useState(false)
  const[isVideoMuted, setIsVideoMuted] = useState(true)
  const[isVideoHovered, setIsVideoHovered] = useState(false)
  


  return ( 
    <>
    <ThreeDPage/>
    <div>
      <a href="/LiveVisual">Go to Next Page</a>
    </div>
    </>
  )
}
