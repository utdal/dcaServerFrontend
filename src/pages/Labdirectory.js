import React from 'react';
import UnifiedTopBar from '../components/UnifiedTopBar';
import { motion } from 'framer-motion';
import Morcos from '../pages/labdirectoryphotos/morcos.png';
import Jose from '../pages/labdirectoryphotos/jose.png';
import Alejandro from '../pages/labdirectoryphotos/alejandro.png';
import Donald from '../pages/labdirectoryphotos/donald.png';
import Fariha from '../pages/labdirectoryphotos/fariha.png';
import Jonathan from '../pages/labdirectoryphotos/jonathan.png';
import labpicture from '../pages/labdirectoryphotos/labpicture.png';
import Luis from '../pages/labdirectoryphotos/luis.png';
import Marjan from '../pages/labdirectoryphotos/marjan.png';
import Rand from '../pages/labdirectoryphotos/rand.png';
import Shubham from '../pages/labdirectoryphotos/shubham.png';
import Sophia from '../pages/labdirectoryphotos/sophia.png';

const people = [
  {
    name: 'Dr. Faruck Morcos',
    title: 'Associate Professor',
    role: 'Principal Investigator',
    description: `Fellow, Cecil H. and Ida Green Professor in Systems Biology Science\nDepts. of Biological Sciences, Bioengineering (affiliate), Physics (affiliate)`,
    image: Morcos,
  },
  {
    name: 'Dr. Jose Alberto de la Paz',
    title: 'Postdoctoral Researcher',
    //role: 'Post Doc',
    description: `Dept. of Biological Sciences`,
    image: Jose,
  },
  {
    name: 'Sophia Alvarez',
    title: 'Graduate Student',
    role: 'Program',
    description: `Ph.D. Molecular and Cellular Biology`,
    image: Sophia,
  },
  {
    name: 'Fariha Hossain',
    title: 'Graduate Student',
    role: 'Program',
    description: `Ph.D. Molecular and Cellular Biology`,
    image: Fariha,
  },
  {
    name: 'Jonathan Martin',
    title: 'Graduate Student',
    role: 'Program',
    description: `Ph.D. Molecular and Cellular Biology`,
    image: Jonathan,
  },
  {
    name: 'Shubham Mittal',
    title: 'Graduate Student',
    role: 'Program',
    description: `Ph.D. Molecular and Cellular Biology`,
    image: Shubham,
  },
  {
    name: 'Marjan Nikpey',
    title: 'Graduate Student',
    role: 'Program',
    description: `Ph.D. Biomedical Engineering`,
    image: Marjan,
  },
  {
    name: 'Alejandro Valenciano',
    title: 'Graduate Student',
    role: 'Program',
    description: `M.S Biotechnology`,
    image: Alejandro,
  },
  {
    name: 'Rand Abouh Saleh',
    title: 'Undergraduate Student',
    role: 'Program',
    description: `Biology (BS), Computer Science (Minor)|Bioinformatics and Computational Biology (MS) Fast-Track`,
    image: Rand,
  },
  {
    name: 'Donald Tinsley',
    title: 'Undergraduate Student',
    role: 'Program',
    description: `Biology (BS)`,
    image: Donald,
  },
  {
    name: 'Luis Rogelio Hernandez',
    title: 'Undergraduate Student',
    role: 'Program',
    description: `Computer Science (BS), Math (Minor)`,
    image: Luis,
  },

  
];

const LabTeam = () => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const sectionStyle = {
    backgroundColor: prefersDarkScheme ? '#1e1e1e' : '#f4f8fc',
    borderRadius: '16px',
    padding: '30px',
    margin: '30px auto',
    maxWidth: '1000px',
    boxShadow: prefersDarkScheme
      ? '0 10px 25px rgba(255,255,255,0.1)'
      : '0 10px 25px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    color: '#ff6600',
    fontSize: '28px',
    marginBottom: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
  };

  const cardStyle = {
    backgroundColor: prefersDarkScheme ? '#2a2a2a' : '#fff',
    borderRadius: '12px',
    padding: '20px',
    maxWidth: '250px',
    textAlign: 'center',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  };

  const imgStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: '2px solid #ccc',
  };

  const textStyle = {
    color: prefersDarkScheme ? '#eee' : '#333',
    whiteSpace: 'pre-wrap',
    fontSize: '16px',
  };

  return (
    <div style={{ backgroundColor: prefersDarkScheme ? '#121212' : '#eaf1f8', minHeight: '100vh', paddingBottom: '80px' }}>
      <UnifiedTopBar />
      <div style={{ paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px' }}>
        <motion.div style={sectionStyle} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 style={headingStyle}>Morcos Lab Team</h2>
          <div style={containerStyle}>
            {people.map((person, index) => (
              <div key={index} style={cardStyle}>
                <img src={person.image} alt={person.name} style={imgStyle} />
                <h3 style={{ ...textStyle, fontWeight: 'bold', fontSize: '18px' }}>{person.name}</h3>
                <p style={textStyle}>{person.title}</p>
                <p style={{ ...textStyle, fontStyle: 'italic', fontSize: '14px' }}>{person.role}</p>
                <p style={textStyle}>{person.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LabTeam;
