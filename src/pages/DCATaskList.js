import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeButton from '../components/HomeButton'; 

const DcaTaskList = () => {
    const [taskIds, setTaskIds] = useState([]);

    useEffect(() => {
        const lastTaskIdsFromStorage = JSON.parse(localStorage.getItem('lastTaskIds')) || [];
        const now = new Date().getTime();
        const last24Hours = 24 * 60 * 60 * 1000;
        const recentTaskIds = lastTaskIdsFromStorage.filter(task => now - task.time <= last24Hours);
        setTaskIds(recentTaskIds);
    }, []);

    const taskItemStyle = {
        marginBottom: '10px',
        padding: '10px',
        border: '2px solid #0066cc',
        borderRadius: '10px',
        background: '#f0f8ff',
        color: '#003366',
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#282c34',
        padding: '20px',
        color: 'white',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 10,
    };

    const containerStyle = {
        padding: '20px',
        marginTop: '80px', 
    };

    return (
        <>
            <div style={headerStyle}>
                <HomeButton />
                <span style={{ flex: 1, textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
                    Recent DCA Tasks
                </span>
            </div>
            <div style={containerStyle}>
                <h2 style={{ color: '#003366' }}>Recent DCA Tasks from the Last 24 Hours</h2>
                {taskIds.length > 0 ? (
                    taskIds.map((task) => (
                        <div key={task.id} style={taskItemStyle}>
                            <Link to={`/coevolving-pairs-results?task_id=${task.id}`} style={{ color: '#0066cc', textDecoration: 'underline' }}>
                                Task ID: {task.id}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No recent DCA tasks found.</p>
                )}
            </div>
        </>
    );
};

export default DcaTaskList;
