
import React, { useState } from 'react';
import HomeButton from '../components/HomeButton';

const LGL = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Tab1');
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateInput = (value) => {
    return value.length >= 3;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setIsValid(validateInput(value));
    setShowError(false);
  };

  const handleBlur = () => {
    const valid = validateInput(inputValue);
    setIsValid(valid);
    setShowError(true);
  };

  const handleExampleClick = (example) => {
    setInputValue(example);
    setIsValid(true);
    setShowError(false);
    setShowMenu(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmitClick = () => {
    if (isValid) {
      setIsSubmitting(true);
      console.log('Submitted:', inputValue);
      setTimeout(() => setIsSubmitting(false), 300);
    }
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
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
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
    },
    container: {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      width: '90%',
      maxWidth: '1200px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      marginTop: '100px',
      textAlign: 'center',
      flexGrow: 1,
      position: 'relative',
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
      transition: 'transform 0.3s ease, z-index 0.3s ease, background-color 0.3s ease',
    },
    activeTab: {
      transform: 'translateY(-10px)',
      zIndex: 1,
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
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
    button: {
      padding: '10px 20px',
      marginRight: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#e0e0e0',
      marginTop: '10px',
      transition: 'background-color 0.3s ease',
    },
    submitButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      cursor: isValid ? 'pointer' : 'not-allowed',
      opacity: isValid ? 1 : 0.5,
      marginTop: '20px',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      boxShadow: isSubmitting ? '0px 2px 4px rgba(0, 0, 0, 0.5)' : '0px 4px 8px rgba(0, 0, 0, 0.2)',
      transform: isSubmitting ? 'scale(0.98)' : 'scale(1)',
      transition: 'transform 0.1s ease, box-shadow 0.1s ease, background-color 0.1s ease',
      backgroundColor: isSubmitting ? '#87CEEB' : '#87CEEB',
    },
    menu: {
      marginTop: '10px',
    },
    settingsMenu: {
      marginTop: '20px',
      textAlign: 'left',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#e0e0e0',
      width: '100%',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
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
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <HomeButton />
        <span style={{ flex: 1, textAlign: 'center' }}>Latent Generative Landscape Generation</span>
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
              <div style={styles.invalidSequence}>Invalid Sequence</div>
            </div>
            <button
              style={styles.button}
              onClick={() => handleExampleClick('Example 1')}
            >
              Example 1
            </button>
            <button
              style={styles.button}
              onClick={() => handleExampleClick('Example 2')}
            >
              Example 2
            </button>
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
            <div style={styles.settingsOption} onClick={() => setShowMenu(!showMenu)}>
              Settings Option 1
            </div>
            {showMenu && (
              <div>
                <div style={styles.settingsOption}>Settings Sub-Option 1</div>
                <div style={styles.settingsOptionLast}>Settings Sub-Option 2</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LGL;
