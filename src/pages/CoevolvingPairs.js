import React, { useState, useRef } from 'react';
import HomeButton from '../components/HomeButton';
import { generateMsa, computeDca } from '../backend/api';

const CoevolvingPairs = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Tab1');
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExamplesMenu, setShowExamplesMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [msaOnly, setMsaOnly] = useState(false);
  const [saveMsaId, setSaveMsaId] = useState(false);
  const existingTab = useRef(null);

  const validateInput = (value) => value.length >= 3;

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.length <= 700) {
      setInputValue(value);
      setIsValid(validateInput(value));
      setShowError(false);
    }
  };

  const handleBlur = () => {
    setIsValid(validateInput(inputValue));
    setShowError(true);
  };

  const handleExampleClick = (example) => {
    if (example.length <= 700) {
      setInputValue(example);
      setIsValid(true);
      setShowError(false);
      setShowExamplesMenu(false);
    }
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleSubmitClick = () => {
    if (isValid) {
      setShowModal(true);
    }
  };

  const handleSubmit = async () => {
    setShowModal(false);
    setIsSubmitting(true);
    console.log('Submitted:', inputValue);
    try {
      const msaTask = await generateMsa(inputValue);
      if (saveMsaId) {
        const blob = new Blob([msaTask.id], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'msa_id.txt';
        a.click();
        window.URL.revokeObjectURL(url);
      }
      if (!msaOnly) {
        const dcaTask = await computeDca(msaTask.id);
        const lastTaskIds = JSON.parse(localStorage.getItem('lastTaskIds')) || [];
        const newLastTaskId = { id: dcaTask.id, time: new Date().getTime() };
        lastTaskIds.push(newLastTaskId);
        localStorage.setItem('lastTaskIds', JSON.stringify(lastTaskIds));
        console.log('Updated lastTaskIds in localStorage:', lastTaskIds);
        const url = '/tasks?ids=' + msaTask.id + ',' + dcaTask.id;
        window.open(url, '_blank');
      } else {
        const url = '/tasks?ids=' + msaTask.id;
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        if (text.length <= 700) {
          setInputValue(text);
          setIsValid(validateInput(text));
          setShowError(false);
        } else {
          alert("File content exceeds the 700 character limit.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleMsaOnlyChange = () => setMsaOnly((prev) => !prev);

  const handleSaveMsaIdChange = () => setSaveMsaId((prev) => !prev);

  const handleDcaTaskListClick = () => {
    window.open('/dca-task-list', '_blank');
  };

  const styles = {
    app: {
      textAlign: 'center',
      backgroundColor: '#d0d8e8',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'auto',
    },
    header: {
      backgroundColor: '#282c34',
      padding: '20px',
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerText: {
      textAlign: 'center',
      flex: 1,
      marginRight: '-100px', 
    },
    contentContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: '20px',
    },
    container: {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      width: '90%',
      maxWidth: '1200px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      marginTop: '100px',
      textAlign: 'center',
      flexGrow: 1,
      position: 'relative',
      height: 'auto',
      minHeight: 'calc(100vh - 100px)',
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #ccc',
      marginBottom: '20px',
      justifyContent: 'center',
    },
    tab: {
      padding: '15px 25px',
      cursor: 'pointer',
      flex: 1,
      textAlign: 'center',
      border: '2px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#e0e0e0',
      margin: '0 5px',
      transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    activeTab: {
      transform: 'translateY(-10px)',
      zIndex: 1,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#d0d0d0',
    },
    inputContainer: {
      marginBottom: '20px',
    },
    inputTextBox: {
      width: '100%',
      height: '100px',
      padding: '10px',
      border: '1px solid black',
      borderRadius: '4px',
      borderColor: showError && !isValid ? 'red' : 'black',
      boxSizing: 'border-box',
    },
    invalidSequence: {
      color: 'red',
      fontWeight: 'bold',
      marginTop: '10px',
      display: showError && !isValid ? 'block' : 'none',
    },
    submitButton: {
      backgroundColor: '#87CEEB',
      color: 'white',
      cursor: isValid ? 'pointer' : 'not-allowed',
      opacity: isValid ? 1 : 0.5,
      marginTop: '20px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      boxShadow: isSubmitting ? '0 2px 4px rgba(0, 0, 0, 0.5)' : '0 4px 8px rgba(0, 0, 0, 0.2)',
      transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
      transition: 'transform 0.1s ease, box-shadow 0.1s ease, background-color 0.1s ease',
    },
    button: {
      padding: '10px 20px',
      marginRight: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#e0e0e0', // Updated to light grey
      color: '#000', // Updated text color for contrast
      marginTop: '10px',
      transition: 'background-color 0.3s ease',
    },
    examplesMenu: {
      marginTop: '10px',
      position: 'absolute',
      backgroundColor: '#ffffff',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '10px',
      textAlign: 'left',
      zIndex: 1000,
      minWidth: '200px',
      display: 'inline-block',
    },
    examplesOption: {
      padding: '10px',
      cursor: 'pointer',
      borderBottom: '1px solid #ddd',
      transition: 'background-color 0.3s ease',
      whiteSpace: 'nowrap',
    },
    examplesOptionLast: {
      padding: '10px',
      cursor: 'pointer',
    },
    fileInput: {
      marginTop: '10px',
    },
    settingsMenu: {
      marginTop: '20px',
      marginRight: '200px',
      textAlign: 'left',
      padding: '5px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#e0e0e0',
      width: '100%',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxHeight: '300px',
      overflowY: 'auto',
    },
    settingsOption: {
      padding: '10px',
      cursor: 'pointer',
      borderBottom: '1px solid #ccc',
    },
    settingsOptionLast: {
      padding: '10px',
      cursor: 'pointer',
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
    },
    modalButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    modalButton: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    modalSubmitButton: {
      backgroundColor: '#87CEEB',
      color: 'white',
    },
    modalCancelButton: {
      backgroundColor: '#e0e0e0',
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <HomeButton />
        <span style={styles.headerText}>MSA-DCA</span>
        <button
  style={{
    backgroundColor: '#e0e0e0', 
    color: '#333', 
    border: '1px solid #ccc', 
    borderRadius: '5px', 
    padding: '10px 20px', 
    cursor: 'pointer', 
    marginRight: '100px', 
    fontSize: '16px' 
  }}
  onClick={handleDcaTaskListClick}
>
  DCA Task List
</button>

      </div>
      <div style={styles.container}>
        <div style={styles.tabs}>
          <div
            style={activeTab === 'Tab1' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => handleTabClick('Tab1')}
          >
            Input
          </div>
          <div
            style={activeTab === 'Tab2' ? { ...styles.tab, ...styles.activeTab } : styles.tab}
            onClick={() => handleTabClick('Tab2')}
          >
            Settings
          </div>
        </div>
        {activeTab === 'Tab1' && (
          <>
            <div style={styles.inputContainer}>
              <textarea
                style={styles.inputTextBox}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Enter sequence"
              />
              {showError && !isValid && (
                <div style={styles.invalidSequence}>
                  Please enter a valid sequence (at least 3 characters)
                </div>
              )}
            </div>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
            <button
              style={styles.button} 
              onClick={() => setShowExamplesMenu((prev) => !prev)}
            >
              Examples
            </button>
            {showExamplesMenu && (
              <div style={styles.examplesMenu}>
                <div
                  style={styles.examplesOption}
                  onClick={() => handleExampleClick('Example 1')}
                >
                  Example 1
                </div>
                <div
                  style={styles.examplesOption}
                  onClick={() => handleExampleClick('Example 2')}
                >
                  Example 2
                </div>
                <div
                  style={styles.examplesOption}
                  onClick={() => handleExampleClick('ATGCGTACGTAGCTAGCTAG')}
                >
                  ATGCGTACGTAGCTAGCTAG
                </div>
              </div>
            )}
            <button
              style={styles.submitButton}
              onClick={handleSubmitClick}
              disabled={!isValid}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </>
        )}
        {activeTab === 'Tab2' && (
          <div style={styles.settingsMenu}>
            <div
              style={styles.settingsOption}
              onClick={handleMsaOnlyChange}
            >
              <input
                type="checkbox"
                id="msaOnly"
                name="msaOnly"
                checked={msaOnly}
                readOnly
              />
              <label htmlFor="msaOnly">MSA Only</label>
            </div>
            <div
              style={styles.settingsOptionLast}
              onClick={handleSaveMsaIdChange}
            >
              <input
                type="checkbox"
                id="saveMsaId"
                name="saveMsaId"
                checked={saveMsaId}
                readOnly
              />
              <label htmlFor="saveMsaId">Save MSA ID</label>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <>
          <div style={styles.modalOverlay} onClick={handleCancel}></div>
          <div style={styles.modal}>
            <div>Are you sure you want to submit?</div>
            <div style={styles.modalButtons}>
              <button
                style={{ ...styles.modalButton, ...styles.modalSubmitButton }}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                style={{ ...styles.modalButton, ...styles.modalCancelButton }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CoevolvingPairs;