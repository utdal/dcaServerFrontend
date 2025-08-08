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

    const downloadCSV = () => {
        const header = ["Index", "Residue 1", "Residue 2", "DI Score"];
        const rows = pairs.map((row, index) => [
            index + 1,
            row[0] + 1,
            row[1] + 1,
            row[2].toFixed(5)
        ]);

        const csvContent = [header, ...rows]
            .map(e => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "di_pairs.csv");
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div style={{ fontWeight: 'bold' }}>
                {selectedDi ? "Top " + pairs.length + " Selected DI Pairs" : "Top " + pairs.length + " DI Pairs"}
            </div>

            <div style={{ margin: '20px auto', overflowY: 'scroll', maxHeight: '360px', border: '1px solid #ddd' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                                <td style={rowStyle}>{row[0] + 1}</td>
                                <td style={rowStyle}>{row[1] + 1}</td>
                                <td style={rowStyle}>{row[2].toFixed(5)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {!selectedDi&&(
            <button
                onClick={downloadCSV}
                style={{
                    margin: '10px 0',
                    padding: '8px 16px',
                    backgroundColor: '#FF6600',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            >
                Download All as CSV
            </button>
            )
        }
        </div>
    );
};

export default DiTable;
