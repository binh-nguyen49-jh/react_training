import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as LeftArrow } from '../SVGs/LeftArrow.svg';
import { ReactComponent as RightArrow } from '../SVGs/RightArrow.svg';

export default function PostCarousel({ post }) {
  const [currentImage, setCurrentImage] = useState(0);

  const onClickCarousel = (event) => {
    const postRect = event.target.getBoundingClientRect();
    const direction =
      event.clientX - postRect.left > postRect.width / 2 ? 1 : -1;
    const newIdxImage = currentImage + direction;
    if (newIdxImage >= 0 && newIdxImage < post.imageUrls.length) {
      setCurrentImage(newIdxImage);
    }
  };

  return (
    <div className='postCarousel'>
      <div
        className='carouselScreen'
        onClick={onClickCarousel}
        style={{
          backgroundImage: `url(${post.imageUrls[currentImage]})`,
        }}>
        <div className='carouselButtons'>
          <LeftArrow className='carouselButton' />
          <RightArrow className='carouselButton' />
        </div>
      </div>
      <div className='carouselIndicator'>
        {post.imageUrls.map((val, idx) => (
          <div
            className={`indicator ${idx === currentImage ? 'active' : ''}`}
            onClick={(e) => setCurrentImage(idx)}
            key={idx}
          />
        ))}
      </div>
    </div>
  );
}

PostCarousel.propTypes = {
  post: PropTypes.object,
};
