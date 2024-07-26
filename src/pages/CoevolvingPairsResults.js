import React from 'react';
import HomeButton from '../components/HomeButton';

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
            paddingTop: '80px', // Add padding top to account for the fixed header
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
    };

    return (
        <div style={styles.container}>
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
