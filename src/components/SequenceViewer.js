import React from 'react';

const SequenceViewer = ({ sequence }) => {
    const containerStyle = {
        width: '100%',
        overflowX: 'auto', // Adds horizontal scroll if the sequence is too long
        whiteSpace: 'nowrap', // Prevents wrapping of characters to the next line
        border: '1px solid #ccc',
        padding: '8px',
        paddingBottom: '12px',
        backgroundColor: '#f9f9f9',
    };

    const sequenceStyle = {
        fontFamily: 'Courier New, Courier, monospace', // Monospace font for alignment
        fontSize: '16px',
        letterSpacing: '2px', // Adjust spacing between characters for readability
    };

    return (
        <div style={containerStyle}>
            <span style={sequenceStyle}>
                {sequence}
            </span>
        </div>
    );
};

export default SequenceViewer;