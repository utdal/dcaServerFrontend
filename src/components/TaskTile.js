import React, { useEffect, useState } from 'react';
import { MSA, Task, EvolutionSimulation } from '../backend/api';
import {Link} from 'react-router-dom';

const TaskTile = ({ task_id, isSimulation = false, updateInterval = 5 }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [task, setTask] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    useEffect(() => {
        async function fetchTask() {
            setLoading(true);
            try {
                if (isSimulation) {
                    const sim = await EvolutionSimulation.fetch(task_id);
                    const pseudoTask = {
                        id: sim.id,
                        state: sim.completed ? 'SUCCESS' : 'PENDING',
                        percent: sim.completed ? 100 : 0,
                        successful: sim.completed,
                        name: 'evolution-simulation',
                        time_started: sim.created,
                        time_ended: sim.completed ? new Date() : null,
                        message: sim.completed ? 'Simulation finished' : 'Running…',
                        link: '',
                        getNiceName() { return 'Evolution Simulation'; }
                    };
                    setTask(pseudoTask);
                } else {
                    setTask(await Task.fetch(task_id));
                }
                setLastUpdated(Date.now());
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchTask();
    }, [task_id]);

    useEffect(() => {
        if (task && task.successful && task.name === 'api.tasks.compute_dca_task') {
            const existingTasks = JSON.parse(localStorage.getItem('dcaTasks')) || [];
            const taskEntry = { id: task.id, time: new Date().getTime() };
            existingTasks.push(taskEntry);
            localStorage.setItem('dcaTasks', JSON.stringify(existingTasks));
        }
    }, [task]);
    
    useEffect(() => {
        if (task) {
            const interval = setInterval(() => {
                if (isSimulation) {
                    EvolutionSimulation.fetch(task_id).then(sim => {
                        setTask(prev => ({
                            ...prev,
                            state: sim.completed ? 'SUCCESS' : 'PENDING',
                            percent: sim.completed ? 100 : 0,
                            successful: sim.completed,
                        }));
                        setLastUpdated(Date.now());
                    });
                } else {
                    task.update().then(() => setLastUpdated(Date.now()));
                }
            }, updateInterval * 1000);

            return () => clearInterval(interval);
        }
    }, [task, updateInterval, isSimulation]);

    const linkStyle = {
        fontSize: 12,
        color: '#0066cc',
        textDecoration: 'underline',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'inline',
        margin: 0,
        padding: 0,
    };

    const downloadMsa = async (id) => {
        const msa = await MSA.fetch(id);
        const url = msa.fasta;
        window.location.href = url;
    }

    const resultsLink = () => {

        if (task.name === 'api.tasks.generate_msa_task') {
            return (
                <button
                    onClick={() => downloadMsa(task.id)}
                    style={linkStyle}>
                    Download MSA
                </button>
            );
        } else if (task.name === 'api.tasks.compute_dca_task') {
            return (
                <a
                    href={'/coevolving-pairs-results?task_id=' + task.id}
                    style={linkStyle}
                    target='_blank'>
                    View DCA Results
                </a>
            );
        } else if (task.name === 'api.tasks.map_residues_task') {
            return (
                <a
                    href={'/coevolving-pairs-results?task_id=' + task.id}
                    style={linkStyle}
                    target='_blank'>
                    View Results
                </a>
            );
        } else if (task.name === 'api.tasks.generate_contacts_task') {
            return (
                <a
                    href={'/coevolving-pairs-results?structure_id=' + task.id}
                    style={linkStyle}
                    target='_blank'>
                    View Results
                </a>
            );
        }
        else if(task.name === 'evolution-simulation'){
            return (
                <Link
                    to={'/seec-results/?resultID=' + task.id}
                    style={linkStyle}

                >View Results</Link>
            )
        }
        return undefined;
    }

    return (
        <div style={{ 
            border: '2px solid #0066cc', 
            background: '#f0f8ff', 
            borderRadius: '10px', 
            padding: '20px', 
            margin: '20px' }}>
            {loading ? <>
                <p style={{ fontStyle: 'italic', color: '#0066cc' }}>Loading...</p>
            </> : (error ? <>
                <p style={{ color: 'maroon' }}>{error}</p>
            </> : <>
                <div style={{ fontWeight: 'bold', color: '#003366' }}>
                    {task.getNiceName() + ' (' + task.state + ' ' + task.percent + '%)'}
                </div>
                <div style={{ fontSize: '10px', fontStyle: 'italic', color: prefersDarkScheme.matches?'black':'#003366' }}>ID: {task.id}</div>
                {task.time_started ? <div style={{color: '#003366' }}><b>Started:</b> {task.time_started.toISOString()}</div> : undefined}
                {task.time_ended ? <div style={{color: '#003366' }}><b>Ended:</b> {task.time_ended.toISOString()}</div> : undefined}
                {task.message ? <div><i>{task.message}</i></div> : undefined}
                {task.successful ? resultsLink() : undefined}
                {lastUpdated ? <div style={{ fontSize: '10px', fontStyle: 'italic', color: '#003366' }}>
                    Last updated {new Date(lastUpdated).toISOString()}
                </div> : undefined}
            </>)}
        </div>
    );
};

export default TaskTile;
