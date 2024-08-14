import React, { useEffect, useRef } from 'react';
import * as $3Dmol from '3dmol/build/3Dmol.js';

const PdbViewer = ({ pdb }) => {
    const viewerRef = useRef(null);

    useEffect(() => {
        async function getPdb() {
            let element = viewerRef.current;
            let config = {};

            if (element) {
                let viewer = $3Dmol.createViewer(element, config);

                try {
                    const response = await fetch('https://files.rcsb.org/view/' + pdb + '.pdb');

                    if (!response.ok) {
                        throw new Error('Bad network response');
                    }

                    const result = await response.text();

                    viewer.addModel(result, "pdb");
                    viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
                    viewer.zoomTo(); // Center the model within the viewer
                    viewer.render();
                    viewer.zoom(1.2, 1000);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getPdb();
    }, [pdb, viewerRef]);

    const viewerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '300px', // Adjust height as needed
        position: 'relative',
    };

    return (
        <div style={viewerContainerStyle}>
            <div ref={viewerRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default PdbViewer;
