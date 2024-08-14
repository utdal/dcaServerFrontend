import React, { useState, useEffect } from 'react';
import HomeButton from '../components/HomeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { Task } from '../backend/api'
import TaskTile from '../components/TaskTile'

const ViewTasks = () => {
    const [message, setMessage] = useState(null);
    const [taskIds, setTaskIds] = useState([]);

    const queryTaskIds = new URLSearchParams(useLocation().search).get('ids');

    useEffect(() => {
        async function setTasks() {
            if (queryTaskIds) setTaskIds(queryTaskIds.split(','));
            else {
                try {
                    setMessage('Loading');
                    const tasks = await Task.fetchAll();
                    setTaskIds(tasks.map(t => t.id));
                    setMessage(null);
                } catch (error) {
                    setMessage('Error: ' + error.message);
                }
            }
        }

        setTasks();
    }, [queryTaskIds]);

    if (message) {
        return <p>{message}</p>
    }

    return (
        <div>
            <h1>Tasks</h1>
            {taskIds ? taskIds.map(id => (
                <TaskTile key={id} task_id={id} />
            )) : (
                <p>You have no tasks.</p>
            )}
        </div>
    );
};

export default ViewTasks;
