import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBar from '../components/TopBar'
import TaskTile from '../components/TaskTile';
import { Link } from 'react-router-dom';

const ViewTasks = () => {
    const [message, setMessage] = useState(null);
    const [tasksList, setTasksList] = useState([]);
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const COLORS = prefersDarkScheme ? {
        primary: '#fdf7f3',
        bg: 'transparent',
        cardBg: '#2a2a2a',
        text: '#fdf7f3',
        danger: '#cc0000',
    } : {
        primary: '#e87500',
        bg: 'transparent',
        cardBg: '#fff0e6',
        text: '#1f1f1f',
        danger: '#cc0000',
    };



    const queryTaskIds = new URLSearchParams(useLocation().search).get('ids');

    useEffect(() => {
        async function setTasks() {
            if (queryTaskIds) {
                setTasksList(queryTaskIds.split(',').map(id => ({ id, isSimulation: false })));
            } else {
                try {
                    setMessage('Loading');

                    if (!localStorage.getItem('tasks')){
                        localStorage.setItem('tasks', JSON.stringify([]));
                    }
                
                    const combined = JSON.parse(localStorage.getItem('tasks'));
                    console.log(combined);
                    setTasksList(combined);
                    setMessage(null);

                } catch (error) {
                    setMessage('Error: ' + error.message);
                }
            }
        }

        setTasks();
    }, [queryTaskIds]);

    const handleDeleteTask = (id) => {
        const updated = tasksList.filter((t) => t.id !== id);
        setTasksList(updated);
        localStorage.setItem('tasks', JSON.stringify(updated));
    };

    if (message) {
        return (
            <div>
                <TopBar>
                    <li>
                        <Link to="/" style={{padding: '0', margin: '0'}}>
                            Home
                        </Link>
                    </li>
                </TopBar>
                <p style={{ color: COLORS.primary, fontStyle: 'italic', marginTop: '50px'}}>{message}</p>
            </div>
        );
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
        <div style={{ padding: '20px', backgroundColor: COLORS.cardBg, borderRadius: '10px', margin: '20px', marginTop: '50px'}}>
            <h1 style={{ color: COLORS.primary }}>Tasks</h1>
            {tasksList.length ? tasksList.map(item => (
                <TaskTile
                    key={item.id}
                    task_id={item.id}
                    contactsId={item.contactsId}
                    mappedId={item.mappedId}
                    isSimulation={item.isSimulation}
                    onDelete={handleDeleteTask}
                />
                )) : (
                    <p style={{ color: COLORS.text }}>You have no tasks.</p>
                )}
            </div>
        </div>
    );
};

export default ViewTasks;
