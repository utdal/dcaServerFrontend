import React, { useEffect, useState } from 'react';

const DiTable = ({ dca, highlightRow = null, onRowClick = null }) => {
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

    return (
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
                    {dca.ranked_di.map((row, index) => (
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
    );
};

export default DiTable;
