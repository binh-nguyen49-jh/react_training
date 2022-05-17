import './HorizontalSlide.scss';
import React, { useCallback, useEffect, useRef } from 'react';
import DraggableButton from '../HoldableButton/DraggableButton';
import { getValueInRange } from '../../utils/mathFuncs';

function HorizontalSlide({ items, ItemComponent }) {
  const carouselRef = useRef(null);
  const contentRef = useRef(null);
  const fakeContentRef = useRef(null);
  const scrollbarRef = useRef(null);

  const calculateContainerHeight = () => {
    const { height: itemHeight, width: itemWidth } =
      contentRef.current.getBoundingClientRect();
    Object.assign(fakeContentRef.current.style, {
      width: `${itemWidth}px`,
      height: `${itemHeight}px`,
    });
  };

  const getCarouselProperties = () => {
    const { width: carouselWidth, left: carouselLeft } =
      carouselRef.current.getBoundingClientRect();
    const contentWidth = contentRef.current.getBoundingClientRect().width;
    const scrollbarWidth = scrollbarRef.current.getBoundingClientRect().width;
    return {
      carouselWidth,
      carouselLeft,
      contentWidth,
      scrollbarWidth,
      visibleRatio: carouselWidth / contentWidth,
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

  const onDragging = useCallback((event, { startPosition }) => {
    event.preventDefault();
    const { left } = carouselRef.current.getBoundingClientRect();
    const amountChange = event.clientX - left - startPosition;
    scrollByAmount(amountChange);
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
    scrollByAmount(positionChange);
  }, []);

  const onScrollCarousel = useCallback((event) => {
    // event.preventDefault();
    scrollByAmount(carouselRef.current.scrollLeft);
  }, []);

  const scrollByAmount = useCallback((amount) => {
    const { visibleRatio, scrollbarWidth } = getCarouselProperties();
    const scrollAmount = getValueInRange(
      0,
      amount,
      (1 - visibleRatio) * scrollbarWidth
    );
    scrollbarRef.current.childNodes[0].style.transform = `translateX(${scrollAmount}px)`;
    carouselRef.current.scrollLeft = scrollAmount;
    contentRef.current.style.transform = `translateX(-${
      scrollAmount / visibleRatio
    }px)`;
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
    carouselRef.current.addEventListener('scroll', onScrollCarousel);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='hCarousel'>
      <div ref={carouselRef} className='hCarouselContainer'>
        <div ref={fakeContentRef} className='hCarouselContent' />
      </div>
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
      <div className='hScrollbar' ref={scrollbarRef} onClick={onClickScrollbar}>
        <DraggableButton className='thumb' onDragging={onDragging} />
      </div>
    </div>
  );
}

export default HorizontalSlide;
