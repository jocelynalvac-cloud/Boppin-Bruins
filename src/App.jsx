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
    bio: 'Alex is the lead guitarist of the band, known for his electrifying solos and stage presence.'
  },
  {
    name: 'Blake',
    image: blakeImg,
    bio: 'Blake is the drummer of the band, known for his powerful beats and rhythmic precision.'
  },
  {
    name: 'Somin',
    image: sominImg,
    bio: 'Somin brings strong vocals and creative energy to every performance.'
  },
  {
    name: 'Jocelyn',
    image: jocelynImg,
    bio: 'Jocelyn adds charm and style to the band with a memorable stage presence.'
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
      
      <div className="outer">
        <div style={{ position: 'relative', zIndex: 10, padding: '20px 0 0 20px' }}>
          <Link to="/LiveVisual">Go to Next Page</Link>
        </div>
        
        <ParallaxHero />
        <ThreeDPage/>
        
        <section className="hero-section">
        
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
            <div className="video-container">
              <div className="video-frame"
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
              >
                <video
                  ref={videoRef}
                  className="hero-video"
                  src={bopitVideo}
                  muted={isVideoMuted}
                  loop
                  playsInline
                  onClick={() => {
                    if (isVideoPlaying) {
                      videoRef.current.pause()
                      setIsVideoPlaying(false)
                    } else {
                      videoRef.current.play()
                      setIsVideoPlaying(true)
                    }
                  }}       
                />
                <button
                  className={`video-play-button ${
                    isVideoPlaying && !isVideoHovered ? 'video-controls-hidden' : ''
                  }`}
                  aria-label={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                  onClick={() => {
                    if (videoRef.current) {
                      if (isVideoPlaying) {
                        videoRef.current.pause()
                        setIsVideoPlaying(false)
                      } else {
                        videoRef.current.play()
                        setIsVideoPlaying(true)
                      }
                    }
                  }}
                >
                  {isVideoPlaying ? '❚❚' : '▶'}
                </button>
                <button
                  className={`video-sound-button ${isVideoPlaying && !isVideoHovered ? 'video-controls-hidden' : '' 
                  }`}
                  aria-label={isVideoMuted ? 'Turn sound on' : 'Mute Video'}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !isVideoMuted
                      setIsVideoMuted(!isVideoMuted)
                    }
                  }}
                >
                  {isVideoMuted ? '🔇' : '🔊'}
                </button>
              </div> 
            </div>       


          </div>
        </div>

        
      </section>

      <section className="team-section">
        <div className="member-section">
          <h2>Our Instrument</h2>
          <p>
            Our instrument is based on the classic game Bop-It and includes sound effects 
            that were added through frequency modulation.
          </p>
        </div>
      </section>



      <section className="team-section">
        

        <div className="member-section">
          <h2>Member Introductions</h2>
          <p>Meet the members of the band and learn about their musical journey.</p>
          <div className="gallery">
            {members.map((member) => (
              <div className="gallery-item" key={member.name}>
                <button
                  className="gallery-button"
                  onClick={() =>
                    setOpenMember(openMember === member.name ? null : member.name)
                  }
                  aria-expanded={openMember === member.name}
                >
                  <img src={member.image} alt={member.name} />
                  <div className="description">{member.name}</div>
                </button>

                <div className="dropdown">
                  <div
                    className={`dropdown-content ${
                      openMember === member.name ? 'dropdown-open' : ''
                    }`}
                  >
                    <p>{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="team-section">
      <div className="member-section">
        <h2>Setlist</h2>
        <p>Here are some of the songs we perform:</p>
        <ul>
          <li>Twinkle Twinkle Little Star</li>
          <li>Happy Birthday</li>
          <li>Mary Had a Little Lamb</li>
        </ul>
      </div>
    </section>

      </div>
      
    </>
  )
}
