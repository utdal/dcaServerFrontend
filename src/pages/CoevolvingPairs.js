import React, { useState } from 'react';

const CoevolvingPairs = () => {
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    container: {
      backgroundColor: '#f8f8f8',
      padding: '20px',
      width: '600px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      marginTop: '50px',
      textAlign: 'center',
      position: 'relative'
    },
    header: {
      backgroundColor: '#d0d8e8',
      padding: '20px',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #ccc',
      marginBottom: '20px',
      position: 'relative',
      justifyContent: 'center'
    },
    tab: {
      padding: '15px 25px',
      cursor: 'pointer',
      flex: 1,
      textAlign: 'center',
      border: '2px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f8f8f8',
      margin: '0 5px',
      transition: 'transform 0.3s ease, z-index 0.3s ease, background-color 0.3s ease',
      zIndex: (tab) => (tab === activeTab ? 1 : 0),
      transform: (tab) => (tab === activeTab ? 'translateY(-10px)' : 'translateY(0)'),
      boxShadow: (tab) => (tab === activeTab ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none'),
      backgroundColor: (tab) => (tab === activeTab ? '#e0e0e0' : '#f8f8f8')
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
    },
    invalidSequence: {
      color: 'red',
      fontWeight: 'bold',
      marginTop: '10px',
      display: showError && !isValid ? 'block' : 'none'
    },
    button: {
      padding: '10px 20px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#f8f8f8',
      marginTop: '10px'
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
      backgroundColor: isSubmitting ? '#45a049' : '#4CAF50',
    },
    menu: {
      marginTop: '10px'
    },
    settingsMenu: {
      marginTop: '20px',
      textAlign: 'left',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#e0e0e0',
      width: '100%',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
    },
    settingsOption: {
      padding: '10px',
      cursor: 'pointer',
      borderBottom: '1px solid #ccc'
    },
    settingsOptionLast: {
      padding: '10px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        Coevolving Pairs
      </div>
      <div style={styles.container}>
        <div style={styles.tabs}>
          <div
            style={{
              ...styles.tab,
              transform: styles.tab.transform('Tab1'),
              zIndex: styles.tab.zIndex('Tab1'),
              boxShadow: styles.tab.boxShadow('Tab1'),
              backgroundColor: styles.tab.backgroundColor('Tab1')
            }}
            onClick={() => handleTabClick('Tab1')}
          >
            Input
          </div>
          <div
            style={{
              ...styles.tab,
              transform: styles.tab.transform('Tab2'),
              zIndex: styles.tab.zIndex('Tab2'),
              boxShadow: styles.tab.boxShadow('Tab2'),
              backgroundColor: styles.tab.backgroundColor('Tab2')
            }}
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
              onClick={() => setShowMenu(!showMenu)}
              style={styles.button}
            >
              Examples
            </button>
            {showMenu && (
              <div style={styles.menu}>
                <div onClick={() => handleExampleClick('Example1')}>Example1</div>
                <div onClick={() => handleExampleClick('Example2')}>Example2</div>
                <div onClick={() => handleExampleClick('Example3')}>Example3</div>
              </div>
            )}
            <button
              onClick={handleSubmitClick}
              disabled={!isValid}
              style={styles.submitButton}
            >
              Submit
            </button>
          </>
        )}
        {activeTab === 'Tab2' && (
          <div style={styles.settingsMenu}>
            <div style={styles.settingsOption}>Option 1</div>
            <div style={styles.settingsOption}>Option 2</div>
            <div style={styles.settingsOption}>Option 3</div>
            <div style={styles.settingsOptionLast}>Option 4</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoevolvingPairs;