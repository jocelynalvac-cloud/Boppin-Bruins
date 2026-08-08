import bandImg from './assets/band.png'
import bopitImg from './assets/dynamic-bop-it.png'
import jocelynImg from './assets/jocelyn.png'
import alexImg from './assets/alex.png'
import blakeImg from './assets/blake.png'
import sominImg from './assets/somin.png'
import shapestop from './assets/shapestop.webp'
import shapesmiddle from './assets/shapesmiddle.webp'
import shapesbottom from './assets/shapesbottom.png'

import {useState} from 'react'
import {motion} from 'framer-motion'



import './App.css'

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
  return (
    <div className="outer">
      <section className="hero-section">
        <ParallaxHero />
        <div id="center">
          <div className="hero">
            <div className="bopit-interactive">
              <motion.img 
                src={bopitImg} className="bopit" alt="Bop It" 
                animate={{
                  scale: isBopping ? 0.97 : 1,
                  y: isBopping ? 5 : 0,
                  x: isPulling ? [0, 25, 14, 0] : 0,
                  rotate: isTwisting ? [0, -12, -5, 0] : 0
                }}
                transition={{
                  rotate: {
                    duration: 0.5,
                    ease: 'easeInOut'
                  },
                  x: {
                    duration: 0.5,
                    ease: 'easeInOut'
                  },
                  scale: {
                    duration: 0.1,
                    ease: 'easeOut'
                  },
                  y: {
                    duration: 0.1,
                    ease: 'easeOut'
                  }
                  
                }}

              />
               
                
              <button
                className="bop-hotspot"
                onClick={() => {
                  setIsBopping(true)
                  setTimeout(() => setIsBopping(false), 180)
                }}
                aria-label="Bop the Bop It"
                
              />
              <button
                className="twist-hotspot"
                onClick={() => {
                  setIsTwisting(true)
                  setTimeout(() => setIsTwisting(false), 600)
                }}
                aria-label="Twist the Bop It"
              />
              <button
                className="pull-hotspot"
                onClick={() => {
                  setIsPulling(true)
                  setTimeout(() => setIsPulling(false), 550)
                }}
                aria-label="Pull the Bop It"
              />

            </div>
          </div>
        </div>

        <h1>Introducing Bop It Reinvented!</h1>
      </section>

 

      <section className="team-section">
        <div className="band-section">
          <h2>Picture of Band</h2>
          <img src={bandImg} className="band-photo" alt="Band photo" />
        </div>

        <div className="member-section">
          <h2>Member Introductions</h2>
          <p>Meet the members of the band and learn about their musical journey.</p>
          <div className="gallery">
            {members.map((member) => (
              <div className="gallery-item" key={member.name}>
                <div className="gallery-button">
                  <img src={member.image} alt={member.name} />
                  <div className="description">{member.name}</div>
                </div>
                <div className="dropdown">
                  <div className="dropdown-content">
                    <p>{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      
    </div>
  )
}
