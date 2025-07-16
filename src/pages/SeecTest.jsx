import React, { useState, useEffect } from "react";

export default function EvolutionSimulationForm() {
  const [msaFile, setMsaFile] = useState(null);
  const [ntSequence, setNtSequence] = useState("");
  const [steps, setSteps] = useState(100);
  const [temperature, setTemperature] = useState(1.0);
  const [taskId, setTaskId] = useState(null);
  const [simulationId, setSimulationId] = useState(null);
  const [result, setResult] = useState(null);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:8000/api/evolution-simulations/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setTaskId(null);
    setSimulationId(null);

    if (!msaFile) {
      setError("Please select an MSA file.");
      return;
    }
    if (!ntSequence.trim()) {
      setError("Please enter nucleotide sequence text.");
      return;
    }

    const formData = new FormData();
    formData.append("msa_file", msaFile);
    formData.append("nt_sequence", ntSequence);
    formData.append("steps", steps);
    formData.append("temperature", temperature);

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        body: formData,
        credentials: "include", 
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.error || "Failed to start simulation.");
        return;
      }

      const data = await response.json();
      setTaskId(data.task_id);
      setSimulationId(data.simulation_id);
      setPolling(true);
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  useEffect(() => {
    if (!polling || !simulationId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}${simulationId}/`);
        if (!res.ok) throw new Error("Failed to fetch simulation results.");
        const data = await res.json();

        if (data.completed) {
          setResult(data);
          setPolling(false);
        }
      } catch (e) {
        setError(e.message);
        setPolling(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [polling, simulationId]);

  return (
    <div>
      <h2>Evolution Simulation</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>MSA File (.fasta): </label>
          <input
            type="file"
            accept=".fasta,.fa"
            onChange={(e) => setMsaFile(e.target.files[0])}
          />
        </div>

        <div>
          <label>Nucleotide Sequence:</label>
          <textarea
            rows={6}
            value={ntSequence}
            onChange={(e) => setNtSequence(e.target.value)}
            placeholder="Enter nucleotide sequence text here"
          />
        </div>

        <div>
          <label>Steps:</label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            min={1}
          />
        </div>

        <div>
          <label>Temperature:</label>
          <input
            type="number"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            min={0}
          />
        </div>

        <button type="submit">Run Simulation</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {taskId && (
        <p>
          Simulation started. Task ID: <b>{taskId}</b>
        </p>
      )}

      {polling && <p>Waiting for results...</p>}

      {result && (
        <div>
          <h3>Simulation Result JSON:</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              maxHeight: "400px",
              overflowY: "auto",
              backgroundColor: "#eee",
              padding: "10px",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
