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
            paddingTop: '120px', // Increased padding top to accommodate the header and button
            position: 'relative', // Added for positioning the button
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
            top: '80px', // Adjusted position to ensure it's not covered by the header
            right: '20px',
            padding: '15px', // Increased padding for a slightly larger button
            backgroundColor: '#ccc', // Grey color
            color: '#333',
            border: 'none',
            borderRadius: '8px', // Slightly larger border radius for a smoother look
            cursor: 'pointer',
            fontSize: '24px', // Increased font size for better visibility
            transition: 'background-color 0.3s ease',
            zIndex: 20,
        },
        downloadButtonHover: {
            backgroundColor: '#aaa', // Darker grey on hover
        }
    };

    return (
        <div style={styles.container}>
            <button
                style={styles.downloadButton}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor}
            >
                <FontAwesomeIcon icon={faArrowDown} /> {/* Font Awesome download arrow */}
            </button>
            <div style={styles.header}>
                <HomeButton />
                <span style={{ flex: 1, textAlign: 'center' }}>EVCouplings Results</span>
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
