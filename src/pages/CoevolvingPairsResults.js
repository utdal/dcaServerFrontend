import React, { useState, useEffect } from 'react';
import HomeButton from '../components/HomeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import ContactMap from '../components/ContactMap';
import DiTable from '../components/DiTable';
import { Task, DCA, MappedDi, StructureContacts } from '../backend/api';
import MolViewer from '../components/MolViewer';
import { CirclePlot } from '../components/CirclePlot';
import SequenceViewer from '../components/SequenceViewer';

const CoevolvingPairsResults = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dca, setDca] = useState(DCA.testObj);
    const [mappedDi, setMappedDi] = useState(MappedDi.testObj);
    const [structueContacts, setStructueContacts] = useState(StructureContacts.testObj);
    const [chain, setChain] = useState('AA');
    const [collapsedSections, setCollapsedSections] = useState({
        contactMap: false,
        diPairs: false,
        pdbViewer: false,
        circlePlot: false,
    });

    const query = new URLSearchParams(useLocation().search);
    const dcaId = query.get('dca');
    const mappedDiId = query.get('mapped_di');
    const structueContactsId = query.get('structure_contacts');

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                if (dcaId) setDca(await DCA.fetch(dcaId));
                if (mappedDiId) setMappedDi(await MappedDi.fetch(mappedDiId));
                if (structueContactsId) setStructueContacts(await StructureContacts.fetch(structueContactsId));
            } catch (error) {
                setError('Error: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [dcaId, mappedDiId, structueContactsId]);

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
            paddingTop: '120px',
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
            backgroundColor: '#fff',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            flex: '1 1 calc(50% - 40px)',
            minWidth: '300px',
            maxWidth: '500px',
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
        dropdown: {
            fontSize: '16px',
            margin: '0px auto',
        }
    };

    const availableChains = Object.keys(structueContacts.contacts).map(c => c.substring(0, 2));

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <HomeButton />
                <span style={{ flex: 1, textAlign: 'center' }}>Direct Coupling Analysis Results</span>
            </div>

            <div style={styles.resultsSection}>
                {loading ? (
                    <p style={{ fontStyle: 'italic', color: '#333' }}>Loading...</p>
                ) : error ? (
                    <p style={{ color: '#B71C1C', fontWeight: 'bold' }}>{error}</p>
                ) : (
                    <>
                        <select value={chain} onChange={e => setChain(e.target.value)} style={styles.dropdown}>
                            {availableChains.map(c => (
                                <option value={c} key={c}>Chain {c}</option>
                            ))}
                        </select>
                        <SequenceViewer sequence={"MRGAGAILRPAARGARDLNPRRDISSWLAQWFPRTPARSVVALKTPIKVELVAGKTYRWCVCGRSKKQPFCDGSHFFQRTGLSPLKFKAQETRMVALCTCKATQRPPYCDGTHRSERVQKAEVGSPL"} />

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
                                <ContactMap mappedDi={mappedDi} structureContacts={structueContacts} chain={chain} />
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
                                <MolViewer structureContacts={structueContacts} mappedDi={mappedDi} chain={chain} />
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
                                <CirclePlot mappedDi={mappedDi} chain={chain} />
                            </div>
                        </div>
                        <div style={styles.section}>
                            <h2
                                style={styles.heading}
                                onClick={() => toggleSection('diPairs')}
                            >
                                DI Table
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
                                <DiTable mappedDi={mappedDi} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CoevolvingPairsResults;
