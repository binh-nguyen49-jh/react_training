import React, { useRef } from 'react';
import PostList from '../../components/PostList/PostList';
import Tab from '../../components/TabsWindow/Tab';
import TabsWindow from '../../components/TabsWindow/TabsWindow';
import PostTab from './PostTab';
import PostAPI from '../../API/postAPI';
import { PropTypes } from 'prop-types';
import HorizontalSlide from '../../components/HorizontalSlide/HorizontalSlide';
import ImageItem from './ImageItem';

function TabsSection({ uid, highlightImages }) {
  const postAPI = useRef(new PostAPI(uid));

  return (
    <div className='tabsSection'>
      <TabsWindow>
        <Tab label='Highlight Images' className='images'>
          <HorizontalSlide
            items={Object.values(highlightImages)}
            ItemComponent={ImageItem}
          />
        </Tab>
        <Tab label='Posts' className='posts'>
          <div className='container'>
            <PostTab />
            <PostList postAPI={postAPI.current} />
          </div>
        </Tab>
      </TabsWindow>
    </div>
  );
}

TabsSection.propTypes = {
  uid: PropTypes.string,
};

export default TabsSection;
