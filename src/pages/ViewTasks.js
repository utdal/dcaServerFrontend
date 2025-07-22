import React, { useState, useEffect } from 'react';
import HomeButton from '../components/HomeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { Task, EvolutionSimulation } from '../backend/api';
import TopBar from '../components/TopBar'
import TaskTile from '../components/TaskTile';
import { Link } from 'react-router-dom';

const ViewTasks = () => {
    const [message, setMessage] = useState(null);
    const [tasksList, setTasksList] = useState([]);
    const [isHovered, setIsHovered] = useState(false);


    const queryTaskIds = new URLSearchParams(useLocation().search).get('ids');

    useEffect(() => {
        async function setTasks() {
            if (queryTaskIds) {
                setTasksList(queryTaskIds.split(',').map(id => ({ id, isSimulation: false })));
            } else {
                try {
                    setMessage('Loading');

                    const tasks = await Task.fetchAll();

                    const simulations = await EvolutionSimulation.fetchAll();

                    const combined = [
                        ...tasks.map(t => ({ id: t.id, isSimulation: false })),
                        ...simulations.map(s => ({ id: s.id, isSimulation: true })),
                    ];

                    setTasksList(combined);
                    setMessage(null);
                } catch (error) {
                    setMessage('Error: ' + error.message);
                }
            }
        }

        setTasks();
    }, [queryTaskIds]);

    if (message) {
        return <p style={{ color: '#0066cc', fontStyle: 'italic' }}>{message}</p>;
    }

    return (
        <div>
            <TopBar>
                <li>
                    <Link to="/" style={{padding: '0', margin: '0'}}>
                        Home
                    </Link>
                </li>
            </TopBar>
        <div style={{ padding: '20px', backgroundColor: '#e6f2ff', borderRadius: '10px', margin: '20px' }}>
            <h1 style={{ color: '#003366' }}>Tasks</h1>
            {tasksList.length ? tasksList.map(item => (
                <TaskTile
                    key={item.id}
                    task_id={item.id}
                    isSimulation={item.isSimulation}
                />
            )) : (
                <p style={{ color: '#003366' }}>You have no tasks.</p>
            )}
        </div>
        </div>
    );
};

export default ViewTasks;
