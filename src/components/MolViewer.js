import React, { useEffect, useRef } from 'react';
import * as $3Dmol from '3dmol/build/3Dmol.js';

const MolViewer = ({
    chain, mappedDi, structureContacts,
    selectedPairs = null,
    onPairSelect = null
}) => {
    const viewerRef = useRef(null);

    useEffect(() => {
        async function getPdb() {
            let element = viewerRef.current;
            let config = {};

            if (element) {
                let viewer = $3Dmol.createViewer(element, config);

                $3Dmol.download('pdb:' + structureContacts.pdb_id, viewer, { doAssembly: false }, (model) => {

                    chain = chain.substr(0, 1); //Need to fix chain labeling
                    model.removeAtoms(model.selectedAtoms({ chain: chain, invert: true }));

                    model.setStyle({}, { cartoon: { color: 'spectrum' } });

                    //Should probably store L somewhere in contacts model
                    const diCount = Math.round(mappedDi.mapped_di.length * 0.1);
                    mappedDi.topDiPairs(diCount).map(c => {
                        viewer.addCylinder({
                            start: { resi: c[0], atom: 'CA' },
                            end: { resi: c[1], atom: 'CA' },
                            radius: 0.2,
                            fromCap: 2, //2=Round
                            toCap: 2,
                            color: '#efbf04',
                            clickable: true,
                            hoverable: true,
                            callback: () => {
                                this.color.setHex(0x00FFFF00);
                                viewer.render();
                                //Run onPairSelect
                            },
                            hover_callback: (shape, viewer, event, container) => {
                                if (!shape.label) {
                                    shape.label = viewer.addLabel(
                                        c[0] + ',' + c[1] + ': DI=' + c[2].toFixed(3),
                                        { position: shape, backgroundColor: 'white', fontColor: 'black', fontSize: 15 }
                                    );
                                }
                            },
                            unhover_callback: (shape) => {
                                if (shape.label) {
                                    viewer.removeLabel(shape.label);
                                    delete shape.label;
                                }
                            }
                        });

                        model.setStyle(
                            { resi: [c[0], c[1]] },
                            { cartoon: { color: 'spectrum' }, stick: { radius: 0.2 } }
                        );
                    });

                    viewer.setHoverable(
                        {}, true, (atom, viewer, event, container) => {
                            if (!atom.label) {
                                atom.label = viewer.addLabel(
                                    atom.resn + ' (' + atom.resi + ')',
                                    { position: atom, backgroundColor: 'white', fontColor: 'black', fontSize: 15 }
                                );
                            }
                        }, (atom) => {
                            if (atom.label) {
                                viewer.removeLabel(atom.label);
                                delete atom.label;
                            }
                        }
                    );
                    viewer.setHoverDuration(100);

                    viewer.zoomTo();
                    viewer.render();
                });
            }
        }

        if (structureContacts) getPdb();
    }, [viewerRef, chain, mappedDi, structureContacts,
        selectedPairs, onPairSelect]);

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
