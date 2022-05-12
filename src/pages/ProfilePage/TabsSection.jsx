import React, { useRef } from 'react';
import PostList from '../../components/PostList/PostList';
import Tab from '../../components/TabsWindow/Tab';
import TabsWindow from '../../components/TabsWindow/TabsWindow';
import PostTab from './PostTab';
import PostAPI from '../../API/postAPI';
import { PropTypes } from 'prop-types';

function TabsSection({ uid }) {
  const postAPI = useRef(new PostAPI(uid));

  return (
    <div className='tabsSection'>
      <TabsWindow>
        <Tab id='Posts'>
          <PostTab />
          <PostList postAPI={postAPI.current} />
        </Tab>
        <Tab id='Highlight Images'>
          <h1>Highlight Images</h1>
        </Tab>
      </TabsWindow>
    </div>
  );
}

TabsSection.propTypes = {
  uid: PropTypes.string,
};

export default TabsSection;
