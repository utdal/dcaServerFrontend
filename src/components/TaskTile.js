import React, { useEffect, useState } from 'react';
import { MSA, Task } from '../backend/api';

const TaskTile = ({ task_id, updateInterval = 5 }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [task, setTask] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        async function fetchTask() {
            setLoading(true);
            try {
                setTask(await Task.fetch(task_id));
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
        if (task) {
            const interval = setInterval(() => {
                task.update();
                setLastUpdated(Date.now());
            }, updateInterval * 1000);

            return () => clearInterval(interval);
        }
    }, [task, updateInterval]);

    const linkStyle = {
        fontSize: 16,
        color: '#0066cc',  // Updated color
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
                <div style={{ fontSize: '10px', fontStyle: 'italic', color: '#003366' }}>ID: {task.id}</div>
                {task.time_started ? <div><b>Started:</b> {task.time_started.toISOString()}</div> : undefined}
                {task.time_ended ? <div><b>Ended:</b> {task.time_ended.toISOString()}</div> : undefined}
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
