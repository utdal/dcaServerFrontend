import React, { useState } from 'react';

const Tabs = ({ tabs, darkMode }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabStyle = {
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#000',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '10px',
    marginRight: '10px',
  };

  const activeTabStyle = {
    backgroundColor: darkMode ? '#ff6600' : '#ff6600',
    color: '#fff',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={activeTab === index ? { ...tabStyle, ...activeTabStyle } : tabStyle}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
