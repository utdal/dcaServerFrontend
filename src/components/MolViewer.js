import React, { useEffect, useRef } from 'react';
import * as $3Dmol from '3dmol/build/3Dmol.js';

const MolViewer = ({ mappedDi, structureContacts, chain }) => {
    const viewerRef = useRef(null);

    useEffect(() => {
        async function getPdb() {
            let element = viewerRef.current;
            let config = {};

            if (element) {
                let viewer = $3Dmol.createViewer(element, config);

                try {
                    const response = await fetch('https://files.rcsb.org/view/' + structureContacts.pdb_id + '.pdb');

                    if (!response.ok) {
                        throw new Error('Bad network response');
                    }

                    const result = await response.text();

                    const model = viewer.addModel(result, "pdb");

                    mappedDi.topDiPairs(20).map(c => {
                        viewer.addLine({
                            dashed: false,
                            start: { resi: c[0], chain: 'A' },
                            end: { resi: c[1], chain: 'A' },
                            color: 'red'
                        });
                    });

                    viewer.setStyle({}, { cartoon: { color: 'spectrum' } });
                    viewer.zoomTo(); // Center the model within the viewer
                    viewer.render();
                    viewer.zoom(1.2, 1000);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        if (structureContacts) getPdb();
    }, [structureContacts, viewerRef]);

    const styles = {
        viewerContainer: {
            width: '100%',
            height: '100%', // Adjust height as needed
            position: 'relative',
        },
    };

    return (
        <div style={styles.viewerContainer}>
            <div ref={viewerRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
    );
};

export default MolViewer;
