import React from 'react';
import HomeButton from '../components/HomeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

const CoevolvingPairsResults = () => {
    const results = {
        contactMap: 'Contact Map data here',
        diPairs: 'DI Pairs data here'
    };

    const styles = {
        container: {
            textAlign: 'center',
            backgroundColor: '#e0e0e0',
            minHeight: '100vh',
            padding: '20px',
            paddingTop: '180px',
            position: 'relative',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#282c34',
            padding: '20px',
            fontSize: '28px',
            fontWeight: 'bold',
            color: 'white',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10,
        },
        topBar: {
            backgroundColor: '#ccc',
            color: '#333',
            padding: '10px',
            fontSize: '20px',
            position: 'fixed',
            top: '60px',
            left: 0,
            width: '100%',
            zIndex: 15,
        },
        resultsSection: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        section: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            flex: '1 1 calc(50% - 40px)',
            minWidth: '300px',
            maxWidth: '500px',
        },
        heading: {
            fontSize: '22px',
            marginBottom: '10px',
            color: '#444',
        },
        content: {
            fontSize: '16px',
            color: '#666',
        },
        downloadButton: {
            position: 'fixed',
            top: '120px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor: '#4CAF50', // Green color to make it more visible
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '20px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for a 3D effect
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            zIndex: 20,
        },
        downloadButtonHover: {
            backgroundColor: '#45A049',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
        },
        icon: {
            marginRight: '10px',
        },
    };

    const currentDate = new Date().toLocaleDateString();

    return (
        <div style={styles.container}>
            <button
                style={styles.downloadButton}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor;
                    e.currentTarget.style.boxShadow = styles.downloadButtonHover.boxShadow;
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor;
                    e.currentTarget.style.boxShadow = styles.downloadButton.boxShadow;
                }}
            >
                <FontAwesomeIcon icon={faArrowDown} style={styles.icon} />
                Download Results
            </button>
            <div style={styles.header}>
                <HomeButton />
                <span style={{ flex: 1, textAlign: 'center' }}>EVCouplings Results</span>
            </div>
            <div style={styles.topBar}>
                Task ({currentDate}) results
            </div>
            <div style={styles.resultsSection}>
                <div style={styles.section}>
                    <h2 style={styles.heading}>Contact Map</h2>
                    <div style={styles.content}>{results.contactMap}</div>
                </div>
                <div style={styles.section}>
                    <h2 style={styles.heading}>DI Pairs</h2>
                    <div style={styles.content}>{results.diPairs}</div>
                </div>
            </div>
        </div>
    );
};

export default CoevolvingPairsResults;
