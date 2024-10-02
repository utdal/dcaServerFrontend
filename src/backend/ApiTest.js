import React, { useState, useRef } from 'react';
import { generateMsa, computeDca, mapResidues, generateContacts } from './api';

const ApiTest = () => {
  const [sequence, setSequence] = useState("");
  const [pdbId, setPdbId] = useState("");

  const handleSubmit = async () => {
    if (!sequence) {
      alert("Please provide a sequence");
      return;
    }
    let tasks = [];

    const msaTask = await generateMsa(sequence);
    tasks.push(msaTask);

    const dcaTask = await computeDca(msaTask.id);
    tasks.push(dcaTask);

    if (pdbId) {
      const mapTask = await mapResidues(dcaTask.id, pdbId, 'A', 'A');
      tasks.push(mapTask);

      const contTask = await generateContacts(pdbId, true, 8);
      tasks.push(contTask);
    }


    const url = '/tasks?ids=' + tasks.map(t => t.id).join(',');
    window.open(url, '_blank');
  };

  const handleMSAUpload = () => {
  };

  const handlePdbUpload = () => {
  };

  return (
    <div>
      <p>
        Enter sequence or upload MSA:<br />
        <input
          type="file"
          onChange={handleMSAUpload}
        /><br />
        <textarea
          placeholder='Enter sequence or upload MSA'
          value={sequence}
          onChange={e => setSequence(e.target.value)}
          cols={100}
          rows={2}
        /><br />
      </p>

      <p>
        Enter PDB ID:
        <input
          type='text'
          value={pdbId}
          onChange={e => setPdbId(e.target.value)}
          size={5}
        /><br />
        or upload file:
        <input
          type="file"
          onChange={handlePdbUpload}
        />
      </p>

      <button onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};


export default ApiTest;