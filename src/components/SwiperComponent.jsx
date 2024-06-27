import React, { useEffect } from 'react';
import '../components/Swiper.css';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const SwiperComponent = ({
  
    imageList,
    imageClassName,
    id,
    onClick,
    className,
    autoplay,
    showArrows,
    overlayClassName,
    interval
}) => {

    const Boolean = [true, false];

    const showArrowsStatus = Boolean.includes(showArrows) ? showArrows : Boolean[0];

    const autoplayStatus = Boolean.includes(autoplay) ? autoplay : Boolean[1];

    const prop = {
        middle: 0,
        left: 1,
        left_2: 2,
        right: imageList.length - 1,
        right_2: imageList.length - 2
    };

    var images = [];

    for (var i = 0; i < imageList.length; i++) {
        if (imageList[i].title === undefined) {
            imageList[i].title = '';
        }

        images.push({
            index: i,
            url: imageList[i].images[0],
            title: imageList[i].title
           
        });
    }

    useEffect(() => {
        addCarouselItems();
    }, []);

    function addCarouselItems() {
        document.getElementById(prop.right).classList.add('carousel____right');
        document.getElementById(prop.right_2).classList.add('carousel____right_2');
        document.getElementById(prop.left).classList.add('carousel____left');
        document.getElementById(prop.left_2).classList.add('carousel____left_2');
        document.getElementById(prop.middle).classList.add('carousel____middle');

        document.getElementById(prop.middle).classList.add('carousel_____zIndex4');
    }

    function removeCarouselItems() {
        document.getElementById(prop.middle).classList.remove('carousel____middle');
        document.getElementById(prop.left).classList.remove('carousel____left');
        document.getElementById(prop.left_2).classList.remove('carousel____left_2');
        document.getElementById(prop.right).classList.remove('carousel____right');
        document.getElementById(prop.right_2).classList.remove('carousel____right_2');

        document.getElementById(prop.left).classList.remove('carousel_____zIndex2');
        document.getElementById(prop.right).classList.remove('carousel_____zIndex3');

        document.getElementById(prop.middle).classList.remove('carousel_____zIndex4');
    }

    if (autoplayStatus) {
        if (interval === undefined) {
            interval = 2000;
        }

        setInterval(() => {
            handleCarouselLeftClick();
        }, interval);
    }

    function handleCarouselLeftClick() {
        removeCarouselItems();

        prop.left_2 = prop.left;
        prop.left = prop.middle;
        prop.middle = prop.right;
        prop.right = prop.right_2;
        if (prop.right_2 !== 0) {
            prop.right_2 = prop.right_2 - 1;
        } else {
            prop.right_2 = imageList.length - 1;
        }

        addCarouselItems();

        document.getElementById(prop.right).classList.add('carousel_____zIndex3');
        document.getElementById(prop.left).classList.add('carousel_____zIndex2');
    }

    function handleCarouselRightClick() {
        removeCarouselItems();

        prop.right_2 = prop.right;
        prop.right = prop.middle;
        prop.middle = prop.left;
        prop.left = prop.left_2;
        if (prop.left_2 === imageList.length - 1) {
            prop.left_2 = 0;
        } else {
            prop.left_2 = prop.left_2 + 1;
        }

        addCarouselItems();

        document.getElementById(prop.right).classList.add('carousel_____zIndex3');
        document.getElementById(prop.left).classList.add('carousel_____zIndex2');
    }

    function handleMouseEnter() {
        document.getElementById('carousel_____image-overlay-' + prop.middle).classList.remove('carousel_____image-overlay-leave');
        document.getElementById('carousel_____image-overlay-' + prop.middle).classList.add('carousel_____image-overlay-enter');
    }

    function handleMouseLeave() {
        document.getElementById('carousel_____image-overlay-' + prop.middle).classList.remove('carousel_____image-overlay-enter');
        document.getElementById('carousel_____image-overlay-' + prop.middle).classList.add('carousel_____image-overlay-leave');
    }

    return (
        <div className={`carousel_____container ${className}`} id={id}>
            {showArrowsStatus ? <div className="carousel_____indicators-wrapper">
                <IoIosArrowDropleftCircle className="carousel_____arrow-indicators" id="carousel_____left-arrow" onClick={() => handleCarouselLeftClick()} />
                <IoIosArrowDroprightCircle className="carousel_____arrow-indicators" id="carousel_____right-arrow" onClick={() => handleCarouselRightClick()} />
            </div> : ''}

            {images.map(image => (
                <div className="carousel_____image-container-wrapper" key={image.index} onMouseEnter={() => handleMouseEnter()}>
                    {image.title !== "" ?
                        <div id={"carousel_____image-overlay-" + image.index} className={`carousel_____image-overlay carousel_____image-overlay-leave ${overlayClassName}`} onMouseLeave={() => handleMouseLeave()}>
                            <h1 className="carousel_____overlay-title">{image.title}</h1>
                        </div> :
                        <div id={"carousel_____image-overlay-" + image.index} className="carousel_____image-overlay-disabled"></div>
                    }
                    <img
                        src={image.url}
                        alt="carousel"
                        id={image.index}
                        className={`carousel_____image  ${imageClassName}`}
                        onClick={onClick}
                    />
                </div>
            ))}
        </div>
    );
}

export default SwiperComponent;
