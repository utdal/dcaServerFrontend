import React, { useState, useEffect } from 'react';
import HomeButton from '../components/HomeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import ContactMap from '../components/ContactMap';
import DiTable from '../components/DiTable';
import { Task, DCA } from '../backend/api';
import PdbViewer from '../components/MolViewer';
import { CirclePlot } from '../components/CirclePlot';

const CoevolvingPairsResults = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dca, setDca] = useState(null);
    const [selectedDi, setSelectedDi] = useState(null);
    const [collapsedSections, setCollapsedSections] = useState({
        contactMap: false,
        diPairs: false,
        pdbViewer: false,
        circlePlot: false,
    });

    const query = new URLSearchParams(useLocation().search);
    const task_id = query.get('task_id');

    useEffect(() => {
        async function fetchDCA() {
            setLoading(true);
            try {
                setDca(await DCA.fetch(task_id));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDCA();
    }, [task_id]);

    const handleDownload = () => {
        if (dca) {
            const dataStr = JSON.stringify(dca, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `dca_results_${task_id}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            URL.revokeObjectURL(url);
        }
    };

    const toggleSection = (section) => {
        setCollapsedSections(prevState => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    const styles = {
        container: {
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
            padding: '20px',
            paddingTop: '160px',
            fontFamily: '"Roboto", sans-serif',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0D47A1',
            padding: '15px 25px',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ffffff',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10,
        },
        topBar: {
            backgroundColor: '#BBDEFB',
            color: '#0D47A1',
            padding: '10px 0',
            fontSize: '20px',
            textAlign: 'center',
            position: 'fixed',
            top: '60px',
            left: 0,
            width: '100%',
            zIndex: 15,
        },
        resultsSection: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        section: {
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            flex: '1 1 calc(48% - 20px)',
            minWidth: '320px',
            transition: 'transform 0.3s ease',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '15px',
            color: '#0D47A1',
            borderBottom: '2px solid #0D47A1',
            paddingBottom: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        content: {
            fontSize: '16px',
            color: '#333',
            transition: 'max-height 0.3s ease-out',
            overflow: 'hidden',
        },
        contentExpanded: {
            maxHeight: '1000px', 
        },
        contentCollapsed: {
            maxHeight: '0',
            padding: '0',
        },
        downloadButton: {
            position: 'fixed',
            top: '120px',
            right: '20px',
            padding: '15px 25px',
            backgroundColor: '#0D47A1',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontSize: '18px',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            zIndex: 20,
        },
        downloadButtonHover: {
            backgroundColor: '#0A417A',
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
        },
        icon: {
            marginRight: '10px',
        },
        arrowIcon: {
            transition: 'transform 0.3s ease',
        },
        arrowUp: {
            transform: 'rotate(180deg)',
        },
        arrowDown: {
            transform: 'rotate(0deg)',
        },
    };

    return (
        <div style={styles.container}>
            <button
                style={styles.downloadButton}
                onClick={handleDownload}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor;
                    e.currentTarget.style.boxShadow = styles.downloadButtonHover.boxShadow;
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor;
                    e.currentTarget.style.boxShadow = styles.downloadButton.boxShadow;
                }}
            >
                <FontAwesomeIcon icon={faArrowDown} style={styles.icon} />
                Download Results
            </button>
            <div style={styles.header}>
                <HomeButton />
                <span style={{ flex: 1, textAlign: 'center' }}>DCA Results</span>
            </div>
            <div style={styles.topBar}>
                Task ({task_id || ''}) results
            </div>
            <div style={styles.resultsSection}>
                {loading ? (
                    <p style={{ fontStyle: 'italic', color: '#333' }}>Loading...</p>
                ) : error ? (
                    <p style={{ color: '#B71C1C', fontWeight: 'bold' }}>{error}</p>
                ) : (
                    <>
                        <div style={styles.section}>
                            <h2
                                style={styles.heading}
                                onClick={() => toggleSection('contactMap')}
                            >
                                Contact Map
                                <FontAwesomeIcon
                                    icon={faArrowDown}
                                    style={{
                                        ...styles.arrowIcon,
                                        ...(collapsedSections.contactMap ? styles.arrowUp : styles.arrowDown),
                                    }}
                                />
                            </h2>
                            <div
                                style={{
                                    ...styles.content,
                                    ...(collapsedSections.contactMap ? styles.contentCollapsed : styles.contentExpanded),
                                }}
                            >
                                <ContactMap dca={dca} highlightPoint={selectedDi} onPointClick={setSelectedDi} />
                            </div>
                        </div>
                        <div style={styles.section}>
                            <h2
                                style={styles.heading}
                                onClick={() => toggleSection('diPairs')}
                            >
                                DI Pairs
                                <FontAwesomeIcon
                                    icon={faArrowDown}
                                    style={{
                                        ...styles.arrowIcon,
                                        ...(collapsedSections.diPairs ? styles.arrowUp : styles.arrowDown),
                                    }}
                                />
                            </h2>
                            <div
                                style={{
                                    ...styles.content,
                                    ...(collapsedSections.diPairs ? styles.contentCollapsed : styles.contentExpanded),
                                }}
                            >
                                <DiTable dca={dca} highlightRow={selectedDi} onRowClick={setSelectedDi} />
                            </div>
                        </div>
                        <div style={styles.section}>
                            <h2
                                style={styles.heading}
                                onClick={() => toggleSection('pdbViewer')}
                            >
                                3D View
                                <FontAwesomeIcon
                                    icon={faArrowDown}
                                    style={{
                                        ...styles.arrowIcon,
                                        ...(collapsedSections.pdbViewer ? styles.arrowUp : styles.arrowDown),
                                    }}
                                />
                            </h2>
                            <div
                                style={{
                                    ...styles.content,
                                    ...(collapsedSections.pdbViewer ? styles.contentCollapsed : styles.contentExpanded),
                                }}
                            >
                                <PdbViewer pdb={'1gfl'} />
                            </div>
                        </div>
                        <div style={styles.section}>
                            <h2
                                style={styles.heading}
                                onClick={() => toggleSection('circlePlot')}
                            >
                                Circle Plot
                                <FontAwesomeIcon
                                    icon={faArrowDown}
                                    style={{
                                        ...styles.arrowIcon,
                                        ...(collapsedSections.circlePlot ? styles.arrowUp : styles.arrowDown),
                                    }}
                                />
                            </h2>
                            <div
                                style={{
                                    ...styles.content,
                                    ...(collapsedSections.circlePlot ? styles.contentCollapsed : styles.contentExpanded),
                                }}
                            >
                                <CirclePlot dca={dca}/>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CoevolvingPairsResults;
