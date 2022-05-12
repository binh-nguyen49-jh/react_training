import './TabsWindow.scss';

import React, { useState } from 'react';

function TabsWindow({ children }) {
  const [currentTab, setCurrentTab] = useState(children[0].props.id);
  return (
    <div className='tabs'>
      <div className='tabsHeader'>
        {children.map((child, index) => (
          <div
            onClick={() => setCurrentTab(child.props.id)}
            key={index}
            className={`tabsHeaderItem ${
              currentTab === child.props.id ? 'active' : ''
            }`}>
            <h3>{child.props.id}</h3>
          </div>
        ))}
      </div>
      <div className='tabsBody'>
        {children.map((child) => {
          if (child.props.id === currentTab) return child;
          return undefined;
        })}
      </div>
    </div>
  );
}

export default TabsWindow;
