import React, { useRef } from 'react';
import PostList from '../../components/PostList/PostList';
import Tab from '../../components/TabsWindow/Tab';
import TabsWindow from '../../components/TabsWindow/TabsWindow';
import PostForm from '../../components/Forms/PostForm/PostForm';
import PostAPI from '../../API/postAPI';
import { PropTypes } from 'prop-types';
import HorizontalSlide from '../../components/HorizontalSlide/HorizontalSlide';
import ImageItem from './ImageItem';

function TabsSection({ uid, highlightImages, isOwner }) {
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
            {isOwner && <PostForm />}
            <PostList postAPI={postAPI.current} />
          </div>
        </Tab>
      </TabsWindow>
    </div>
  );
}

TabsSection.propTypes = {
  uid: PropTypes.string,
  highlightImages: PropTypes.object,
  isOwner: PropTypes.bool,
};

export default TabsSection;
