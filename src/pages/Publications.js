import React from 'react';
import UnifiedTopBar from '../components/UnifiedTopBar';
import { motion } from 'framer-motion';

const publications = {
  2025: [
    {
      authors: "Qin Zhou, Jose Alberto de la Paz, Alexander D Stanowick, Xingcheng Lin, Faruck Morcos",
      title: "Characterizing DNA recognition preferences of transcription factors using global couplings and high-throughput sequencing",
      journal: "Nucleic Acids Research",
      citation: "53 (12), gkaf592, 2025",
      pdfLink: "https://academic.oup.com/nar/article/53/12/gkaf592/8180734?login=false"
    },
    {
      authors: "Fernando Montalvillo Ortega, Fariha Hossain, Vladimir V Volobouev, Gabriele Meloni, Hedieh Torabifard, Faruck Morcos",
      title: "Generative Landscapes and Dynamics to Design Multidomain Artificial Transmembrane Transporters",
      journal: "ACS Central Science",
      citation: "2025",
      pdfLink: "http://doi.org/10.1021/acscentsci.5c00708"
    },
    {
      authors: "Divyanshu Shukla, Jonathan Martin, Faruck Morcos, Davit A Potoyan",
      title: "Thermal Adaptation of Cytosolic Malate Dehydrogenase Revealed by Deep Learning and Coevolutionary Analysis",
      journal: "Journal of Chemical Theory and Computation",
      citation: "21 (6), 3277–3287, 2025",
      pdfLink: "http://doi.org/10.1021/acs.jctc.4c01774"
    }
  ]
};

const PublicationsPage = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const pageStyle = {
    backgroundColor: prefersDark ? '#121212' : '#f4f4f4',
    minHeight: '100vh',
    paddingBottom: '60px',
    color: prefersDark ? '#f5f5f5' : '#222'
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '100px 20px 0 20px'
  };

  const sectionStyle = {
    marginBottom: '50px'
  };

  const tileStyle = {
    backgroundColor: prefersDark ? '#1e1e1e' : '#ffffff',
    borderRadius: '14px',
    padding: '20px 25px',
    marginBottom: '30px',
    boxShadow: prefersDark
      ? '0 6px 15px rgba(255,255,255,0.05)'
      : '0 6px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  const headerStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '40px'
  };

  const yearHeaderStyle = {
    fontSize: '26px',
    fontWeight: 'bold',
    color: prefersDark ? '#ffa94d' : '#333',
    borderBottom: prefersDark ? '1px solid #444' : '1px solid #ccc',
    paddingBottom: '10px',
    marginBottom: '20px'
  };

  const authorStyle = {
    fontSize: '14px',
    color: prefersDark ? '#bbb' : '#555',
    marginBottom: '8px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '6px',
    color: prefersDark ? '#f0f0f0' : '#222'
  };

  const citationStyle = {
    fontStyle: 'italic',
    color: prefersDark ? '#aaa' : '#666',
    fontSize: '14px',
    marginBottom: '10px'
  };

  const linkStyle = {
    color: prefersDark ? '#4da6ff' : '#0066cc',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  };

  return (
    <div style={pageStyle}>
      <UnifiedTopBar />
      <main style={containerStyle}>
        <h1 style={headerStyle}>Journal Articles</h1>
        {Object.entries(publications).map(([year, items]) => (
          <section key={year} style={sectionStyle}>
            <h2 style={yearHeaderStyle}>{year}</h2>
            {items.map((pub, index) => (
              <motion.div
                key={index}
                style={tileStyle}
                whileHover={{ scale: 1.02 }}
              >
                <p style={authorStyle}>{pub.authors}</p>
                <h3 style={titleStyle}>{pub.title}</h3>
                <p style={citationStyle}>
                  {pub.journal}. {pub.citation}
                </p>
                <a
                  href={pub.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  View PDF
                </a>
              </motion.div>
            ))}
          </section>
        ))}
      </main>
    </div>
  );
};

export default PublicationsPage;
