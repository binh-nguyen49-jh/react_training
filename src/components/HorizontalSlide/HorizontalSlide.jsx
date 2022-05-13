import './HorizontalSlide.scss';
import React, { useCallback, useEffect, useRef } from 'react';
import DraggableButton from '../HoldableButton/DraggableButton';
import { getValueInRange } from '../../utils/mathFuncs';

function HorizontalSlide({ items, ItemComponent }) {
  const carouselRef = useRef(null);
  const contentRef = useRef(null);
  const scrollbarRef = useRef(null);

  const calculateContainerHeight = () => {
    const itemHeight = contentRef.current.getBoundingClientRect().height;
    carouselRef.current.style.height = `${itemHeight}px`;
  };

  const getCarouselProperties = () => {
    const { width, left } = carouselRef.current.getBoundingClientRect();
    const contentWidth = contentRef.current.getBoundingClientRect().width;
    const scrollbarWidth = scrollbarRef.current.getBoundingClientRect().width;
    return {
      carouselWidth: width,
      carouselLeft: left,
      contentWidth,
      scrollbarWidth,
      visibleRatio: width / contentWidth,
    };
  };

  const calculateThumbWidth = () => {
    const { visibleRatio, carouselWidth } = getCarouselProperties();

    const thumb = scrollbarRef.current.childNodes[0];
    if (visibleRatio < 1) {
      thumb.style.width = `${carouselWidth * visibleRatio}px`;
    } else {
      thumb.style.width = '100%';
    }
  };

  const onDragging = useCallback((event, { target, startPosition }) => {
    event.preventDefault();
    const { left } = carouselRef.current.getBoundingClientRect();
    const amountChange = event.clientX - left - startPosition;

    const { visibleRatio, scrollbarWidth } = getCarouselProperties();

    if (
      0 < amountChange &&
      amountChange < (1 - visibleRatio) * scrollbarWidth
    ) {
      target.style.transform = `translateX(${amountChange}px)`;
      contentRef.current.style.transform = `translateX(-${
        amountChange / visibleRatio
      }px)`;
    }
  }, []);

  const onClickScrollbar = useCallback((event) => {
    const { left } = carouselRef.current.getBoundingClientRect();
    const { visibleRatio, scrollbarWidth, carouselWidth } =
      getCarouselProperties();

    const positionToThumb = event.offsetX < scrollbarWidth / 2 ? -1 : 1;

    const positionChange =
      event.clientX -
      left -
      (positionToThumb * carouselWidth * visibleRatio) / 2;

    const amountChange = getValueInRange(
      0,
      positionChange,
      (1 - visibleRatio) * scrollbarWidth
    );
    contentRef.current.style.transform = `translateX(-${
      amountChange / visibleRatio
    }px)`;

    scrollbarRef.current.childNodes[0].style.transform = `translateX(${amountChange}px)`;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      calculateContainerHeight();
      calculateThumbWidth();
      // Reset position of all absolute positioned elements
      scrollbarRef.current.childNodes[0].style.transform = `none`;
      contentRef.current.style.transform = `none`;
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='hCarousel'>
      <div ref={carouselRef} className='hCarouselContainer'>
        <div ref={contentRef} className='hCarouselItems'>
          {items &&
            items.map((item, index) => (
              <ItemComponent
                className='hCarouselItem'
                key={index}
                content={item}
              />
            ))}
        </div>
      </div>
      <div className='hScrollbar' ref={scrollbarRef} onClick={onClickScrollbar}>
        <DraggableButton className='thumb' onDragging={onDragging} />
      </div>
    </div>
  );
}

export default HorizontalSlide;
