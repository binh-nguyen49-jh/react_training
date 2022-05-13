import './TabsWindow.scss';

import React, { useState } from 'react';

function TabsWindow({ children }) {
  const [currentTab, setCurrentTab] = useState(children[0].props.label);
  return (
    <div className='tabs'>
      <div className='tabsHeader'>
        {children.map((child, index) => (
          <div
            onClick={() => setCurrentTab(child.props.label)}
            key={index}
            className={`tabsHeaderItem ${
              currentTab === child.props.label ? 'active' : ''
            }`}>
            <h3>{child.props.label}</h3>
          </div>
        ))}
      </div>
      <div className='tabsBody'>
        {children.map((child) => {
          if (child.props.label === currentTab) return child;
          return undefined;
        })}
      </div>
    </div>
  );
}

export default TabsWindow;
