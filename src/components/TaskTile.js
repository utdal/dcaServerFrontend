import React, { useEffect, useState } from 'react';
import { Task } from '../backend/api'

const TaskTile = ({ task_id, updateInterval = 10 }) => {
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
    }, [task]);

    const resultsLink = () => {
        if (task.name === 'api.tasks.compute_dca_task') {
            return (
                <a
                    href={'/coevolving-pairs-results?task_id=' + task.id}
                    style={{ color: 'blue', textDecoration: 'underline' }}>
                    View DCA Results
                </a>
            );
        }
        return undefined;
    }

    return (
        <div style={{ border: '1px solid black', background: '#eee', margin: '20px' }}>
            {loading ? <>
                <p style={{ fontStyle: 'italic' }}>Loading...</p>
            </> : (error ? <>
                <p style={{ color: 'maroon' }}>{error}</p>
            </> : <>
                <div style={{ fontWeight: 'bold' }}>{task.getNiceName() + ' (' + task.state + ')'}</div>
                <div style={{ fontSize: '10px', fontStyle: 'italic' }}>ID: {task.id}</div>
                <div>Started: {task.time_started.toISOString()}</div>
                <div>Percent: {task.percent} {task.message}%</div>
                <div>Ended: {task.time_ended.toISOString()}</div>
                {task.successful ? resultsLink() : undefined}
            </>)}
        </div>
    );
};

export default TaskTile;
