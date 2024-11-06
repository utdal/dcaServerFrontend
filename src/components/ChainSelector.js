import React, { useState } from 'react';
import SequenceViewer from '../components/SequenceViewer';

const ChainSelector = ({ structureContacts, chain, setChain }) => {

    const availableChains = Object.keys(structureContacts.contacts).map((c) => {
        const [c1, c2] = c.split(',').map(s => s.trim());
        if (c1 === c2) return [c, c1];
        return [c, c1 + ', ' + c2];
    }).sort((a, b) => a[1].split(',').length - b[1].split(',').length); //Sort singles first

    // useState(() => {
    //     if (structureContacts) {
    //         setChain(availableChains[0])
    //     }
    // }, [structureContacts])

    const styles = {
        wrapper: {
            padding: '20px 0px'
        },
        dropdown: {
            fontSize: '16px',
            margin: '0px auto 10px',
        }
    };

    const setChainCallback = (e) => {
        setChain(e.target.value);
    };

    return (
        <div style={styles.wrapper}>
            <select value={chain} onChange={setChainCallback} style={styles.dropdown}>
                {availableChains.map(c => (
                    <option value={c[0]} key={c[0]}>Chain {c[1]}</option>
                ))}
            </select>
            {/* Need to save sequence in a model somewhere */}
            {/* <SequenceViewer sequence={"MRGAGAILRPAARGARDLNPRRDISSWLAQWFPRTPARSVVALKTPIKVELVAGKTYRWCVCGRSKKQPFCDGSHFFQRTGLSPLKFKAQETRMVALCTCKATQRPPYCDGTHRSERVQKAEVGSPL"} /> */}
        </div>
    );
};

export default ChainSelector;