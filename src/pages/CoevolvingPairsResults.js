import React from 'react';

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
        },
        header: {
            fontSize: '28px',
            color: '#333',
            marginBottom: '20px',
        },
        resultsSection: {
            display: 'flex',
            justifyContent: 'space-around',  // Space out the sections evenly
            flexWrap: 'wrap',                // Allow wrapping if there's not enough space
            gap: '20px',                     // Gap between sections
            maxWidth: '1200px',
            margin: '0 auto',
        },
        section: {
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            flex: '1 1 calc(50% - 40px)',  // Flex-grow, flex-shrink, and flex-basis for responsive layout
            minWidth: '300px',             // Minimum width for each section
            maxWidth: '500px',             // Maximum width for each section
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
            <h1 style={styles.header}>Coevolving Pairs Results</h1>
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
