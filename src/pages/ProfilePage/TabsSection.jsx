import React from 'react';
import Tab from '../../components/TabsWindow/Tab';
import TabsWindow from '../../components/TabsWindow/TabsWindow';

function TabsSection() {
  return (
    <div className='tabsSection'>
      <TabsWindow>
        <Tab id='Posts'>
          <h1>Posts</h1>
        </Tab>
        <Tab id='Highlight Images'>
          <h1>Highlight Images</h1>
        </Tab>
      </TabsWindow>
    </div>
  );
}

export default TabsSection;
