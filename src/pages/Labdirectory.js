import React from 'react';
import UnifiedTopBar from '../components/UnifiedTopBar';
import { motion } from 'framer-motion';
import Morcos from '../pages/labdirectoryphotos/morcos.png';
import Jose from '../pages/labdirectoryphotos/jose.png';
import Alejandro from '../pages/labdirectoryphotos/alejandro.png';
import Donald from '../pages/labdirectoryphotos/donald.png';
import Fariha from '../pages/labdirectoryphotos/fariha.png';
import Jonathan from '../pages/labdirectoryphotos/jonathan.png';
import Luis from '../pages/labdirectoryphotos/luis.png';
import Marjan from '../pages/labdirectoryphotos/marjan.png';
import Rand from '../pages/labdirectoryphotos/rand.png';
import Shubham from '../pages/labdirectoryphotos/shubham.png';
import Sophia from '../pages/labdirectoryphotos/sophia.png';

const groupedPeople = {
  Professor: [
    {
      name: 'Dr. Faruck Morcos',
      title: 'Associate Professor',
      role: 'Principal Investigator',
      description: `Fellow, Cecil H. and Ida Green Professor in Systems Biology Science\nDepts. of Biological Sciences, Bioengineering (affiliate), Physics (affiliate)`,
      image: Morcos,
    },
  ],
  'Postdoctoral Researchers': [
    {
      name: 'Dr. Jose Alberto de la Paz',
      title: 'Postdoctoral Researcher',
      role: '',
      description: `Dept. of Biological Sciences`,
      image: Jose,
    },
  ],
  'Graduate Students': [
    {
      name: 'Sophia Alvarez',
      title: 'Graduate Student',
      role: '',
      description: `Ph.D. Molecular and Cellular Biology`,
      image: Sophia,
    },
    {
      name: 'Fariha Hossain',
      title: 'Graduate Student',
      role: '',
      description: `Ph.D. Molecular and Cellular Biology`,
      image: Fariha,
    },
    {
      name: 'Jonathan Martin',
      title: 'Graduate Student',
      role: '',
      description: `Ph.D. Molecular and Cellular Biology`,
      image: Jonathan,
    },
    {
      name: 'Shubham Mittal',
      title: 'Graduate Student',
      role: '',
      description: `Ph.D. Molecular and Cellular Biology`,
      image: Shubham,
    },
    {
      name: 'Marjan Nikpey',
      title: 'Graduate Student',
      role: '',
      description: `Ph.D. Biomedical Engineering`,
      image: Marjan,
    },
    {
      name: 'Alejandro Valenciano',
      title: 'Graduate Student',
      role: '',
      description: `M.S Biotechnology`,
      image: Alejandro,
    },
  ],
  'Undergraduate Students': [
    {
      name: 'Rand Abouh Saleh',
      title: 'Undergraduate Student',
      role: '',
      description: `Biology (BS), Computer Science (Minor)\nBioinformatics and Computational Biology (MS) Fast-Track`,
      image: Rand,
    },
    {
      name: 'Donald Tinsley',
      title: 'Undergraduate Student',
      role: '',
      description: `Biology (BS)`,
      image: Donald,
    },
    {
      name: 'Luis Rogelio Hernandez',
      title: 'Undergraduate Student',
      role: '',
      description: `Computer Science (BS), Math (Minor)`,
      image: Luis,
    },
  ],
};

const LabTeam = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const styles = {
    page: {
      backgroundColor: prefersDark ? '#121212' : '#f4f8fc',
      color: prefersDark ? '#f5f5f5' : '#1a1a1a',
      minHeight: '100vh',
      paddingBottom: '60px',
    },
    section: {
      borderRadius: '16px',
      padding: '40px 30px',
      margin: '30px auto',
      maxWidth: '1100px',
      backgroundColor: prefersDark ? '#1e1e1e' : '#ffffff',
      boxShadow: prefersDark
        ? '0 8px 24px rgba(255,255,255,0.08)'
        : '0 8px 24px rgba(0,0,0,0.08)',
    },
    header: {
      fontSize: '32px',
      fontWeight: 700,
      textAlign: 'center',
      color: '#ff6600',
      marginBottom: '20px',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '32px',
    },
    card: {
      backgroundColor: prefersDark ? '#2a2a2a' : '#f9f9f9',
      borderRadius: '12px',
      padding: '25px 20px',
      maxWidth: '260px',
      textAlign: 'center',
      boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
    },
    image: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '15px',
      border: '2px solid #ccc',
    },
    name: {
      fontWeight: 600,
      fontSize: '18px',
      margin: '8px 0 4px',
    },
    title: {
      fontSize: '15px',
      fontStyle: 'italic',
      marginBottom: '6px',
    },
    description: {
      fontSize: '14px',
      whiteSpace: 'pre-wrap',
      lineHeight: 1.5,
    },
  };

  return (
    <div style={styles.page}>
      <UnifiedTopBar />
      <div style={{ paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {Object.entries(groupedPeople).map(([group, members]) => (
            <div key={group} style={styles.section}>
              <h2 style={styles.header}>{group}</h2>
              <div style={styles.container}>
                {members.map((person, index) => (
                  <div key={index} style={styles.card}>
                    <img src={person.image} alt={person.name} style={styles.image} />
                    <h3 style={styles.name}>{person.name}</h3>
                    <p style={styles.title}>{person.title}</p>
                    {person.role && <p style={styles.title}>{person.role}</p>}
                    <p style={styles.description}>{person.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LabTeam;
