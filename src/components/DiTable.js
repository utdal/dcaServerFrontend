import React, { useEffect, useState } from 'react';

const DiTable = ({ mappedDi, selectedDi = null, highlightRow = null, onRowClick = null }) => {
    const rowStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
        color: 'black'
    };

    const headerStyle = {
        ...rowStyle,
        backgroundColor: '#f2f2f2'
    };

    let pairs;
    if (selectedDi) {
        pairs = selectedDi.map(i => mappedDi.mapped_di[i]);
    } else {
        pairs = mappedDi.mapped_di;
    }

    return (
        <div>
            <div style={{ fontWeight: 'bold' }}>
                {selectedDi ? "Top " + pairs.length + " Selected DI Pairs" : "Top " + pairs.length + " DI Pairs"}
            </div>

            <div style={{ margin: '20px auto', overflowY: 'scroll', maxHeight: '360px', border: '1px solid #ddd' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', }}>
                    <thead>
                        <tr>
                            <th style={headerStyle}>Index</th>
                            <th style={headerStyle}>Residue 1</th>
                            <th style={headerStyle}>Residue 2</th>
                            <th style={headerStyle}>DI Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pairs.map((row, index) => (
                            <tr
                                key={index}
                                onClick={() => {
                                    if (onRowClick) onRowClick(index);
                                }}
                                style={{
                                    background: (index === highlightRow) ? '#ddd' : 'none',
                                    textDecoration: (index === highlightRow) ? 'underline' : 'none'
                                }}
                            >
                                <td style={rowStyle}>{index + 1}</td>
                                <td style={rowStyle}>{row[0]}</td>
                                <td style={rowStyle}>{row[1]}</td>
                                <td style={rowStyle}>{row[2].toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DiTable;
