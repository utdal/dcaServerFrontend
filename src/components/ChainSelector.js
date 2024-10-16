import React from 'react';
import SequenceViewer from '../components/SequenceViewer';

const ChainSelector = ({ structureContacts, chain, onChainChange = null }) => {

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
        if (onChainChange) onChainChange(e.target.value);
    };

    const availableChains = Object.keys(structureContacts.contacts).map(c => c.substring(0, 2));

    return (
        <div style={styles.wrapper}>
            <select value={chain} onChange={setChainCallback} style={styles.dropdown}>
                {availableChains.map(c => (
                    <option value={c} key={c}>Chain {c}</option>
                ))}
            </select>
            <SequenceViewer sequence={"MRGAGAILRPAARGARDLNPRRDISSWLAQWFPRTPARSVVALKTPIKVELVAGKTYRWCVCGRSKKQPFCDGSHFFQRTGLSPLKFKAQETRMVALCTCKATQRPPYCDGTHRSERVQKAEVGSPL"} />
        </div>
    );
};

export default ChainSelector;