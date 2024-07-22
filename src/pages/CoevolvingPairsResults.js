import React from 'react';

const CoevolvingPairsResults = () => {
    // Assume that results are obtained from the backend server
    const results = {
        contactMap: 'Contact Map data here',
        diPairs: 'DI Pairs data here'
    };

    return (
        <div className="coevolving-pairs-results">
            <h1>DCA Server</h1>
            <div className="results-section">
                <div className="contact-map">
                    <h2>Contact Map</h2>
                    <div>{results.contactMap}</div>
                </div>
                <div className="di-pairs">
                    <h2>DI Pairs</h2>
                    <div>{results.diPairs}</div>
                </div>
            </div>
        </div>
    );
};

export default CoevolvingPairsResults;