import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import HomeButton from '../components/HomeButton';

const CoevolvingPairs = () => {
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('Tab1');
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [advancedSearch, setAdvancedSearch] = useState({
    contains: false,
    startsWith: false,
    endsWith: false,
    matches: false,
  });

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

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAdvancedSearchChange = (event) => {
    const { name, checked } = event.target;
    setAdvancedSearch((prev) => ({
      ...prev,
      [name]: checked,
    }));
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
      backgroundColor: '#87CEEB',
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
      maxHeight: '300px', // Adjust height as needed
      overflowY: 'auto', // Scroll if content overflows
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
    navigationButton: {
      padding: '10px 20px',
      margin: '10px', // Added margin for spacing
      border: '1px solid #ccc',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: '#e0e0e0',
      transition: 'background-color 0.3s ease',
    },
    searchContainer: {
      marginTop: '20px',
      width: '100%',
    },
    searchInput: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '10px',
      marginLeft: '-10px',
    },    
    advancedSearchContainer: {
      marginTop: '10px',
      textAlign: 'left',
    },
    advancedSearchOption: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    checkboxLabel: {
      marginLeft: '10px',
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <HomeButton />
        <span style={{ flex: 1, textAlign: 'center' }}>Run MSA</span>
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
            <Link to="/loading">
              <button style={styles.navigationButton}>
                Go to Loading Page
              </button>
            </Link>
            <Link to="/404Page">
              <button style={styles.navigationButton}>
                Go to 404 Page
              </button>
            </Link>
          </>
        )}
        {activeTab === 'Tab2' && (
          <div style={styles.settingsMenu}>
            <div
              style={styles.settingsOption}
              onClick={toggleMenu}
            >
              Automatically Run MSA-DCA and Save All Data
            </div>
            {showMenu && (
              <div>
                <div style={styles.settingsOption}>
                  <input type="checkbox" id="msaMatrix" name="msaMatrix" />
                  <label htmlFor="msaMatrix">MSA Matrix</label>
                </div>
                <div style={styles.settingsOption}>
                  <input type="checkbox" id="diPairs" name="diPairs" />
                  <label htmlFor="diPairs">DI Pairs</label>
                </div>
                <div style={styles.settingsOptionLast}>
                  <input type="checkbox" id="dcaMatrix" name="dcaMatrix" />
                  <label htmlFor="dcaMatrix">DCA Matrix</label>
                </div>
              </div>
            )}
          </div>
        )}
        <div style={styles.searchContainer}>
          <input
            type="text"
            style={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <div style={styles.advancedSearchContainer}>
            <div style={styles.advancedSearchOption}>
              <input
                type="checkbox"
                id="contains"
                name="contains"
                checked={advancedSearch.contains}
                onChange={handleAdvancedSearchChange}
              />
              <label htmlFor="contains" style={styles.checkboxLabel}>Contains</label>
            </div>
            <div style={styles.advancedSearchOption}>
              <input
                type="checkbox"
                id="startsWith"
                name="startsWith"
                checked={advancedSearch.startsWith}
                onChange={handleAdvancedSearchChange}
              />
              <label htmlFor="startsWith" style={styles.checkboxLabel}>Starts with</label>
            </div>
            <div style={styles.advancedSearchOption}>
              <input
                type="checkbox"
                id="endsWith"
                name="endsWith"
                checked={advancedSearch.endsWith}
                onChange={handleAdvancedSearchChange}
              />
              <label htmlFor="endsWith" style={styles.checkboxLabel}>Ends with</label>
            </div>
            <div style={styles.advancedSearchOption}>
              <input
                type="checkbox"
                id="matches"
                name="matches"
                checked={advancedSearch.matches}
                onChange={handleAdvancedSearchChange}
              />
              <label htmlFor="matches" style={styles.checkboxLabel}>Matches</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoevolvingPairs;
