import bandImg from './assets/band.png'
import bopitImg from './assets/bop it.png'
import jocelynImg from './assets/jocelyn.png'
import alexImg from './assets/alex.png'
import blakeImg from './assets/blake.png'
import sominImg from './assets/somin.png'

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

function App() {
  return (
    <div className="outer">
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

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  )
}

export default App
