import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../../styles/home.css';
import MarqueeSlider from 'react-marquee-slider';
import times from 'lodash.times';
import {Container, Row, Col } from 'react-bootstrap';

const Gallery = () => {

    let totalDes = 10
    let totalKey = 20

    return (
        <section className='gallery'>
            <Container>
                <Row className='flex flex-col items-center gap-10 gallery__slider-1'>
                    <h1><span>{totalDes}+</span> Destinations Listed</h1>
                    <MarqueeSlider velocity={25}>
                        {times(totalDes, Number).map(id => (
                            <div key={`marquee-example-item-${id}`} className="item grid place-content-center">
                                {/* <img src='demo' alt="Image" /> */}
                                <span className='bg-inherit'>Image</span>
                            </div>
                        ))}
                    </MarqueeSlider>
                </Row>
                <Row className='flex flex-col items-center gap-10 gallery__slider-2'>
                    <div className='flex justify-between items-center'>
                        <h1><span>{totalKey}+</span> Travel Preferences</h1>
                        <span>(Let's find out your best combination)</span>
                    </div>
                    <MarqueeSlider velocity={25}>
                        {times(totalKey, Number).map(id => (
                            <div key={`marquee-example-item-${id}`} className="item grid place-content-center">
                                <span className='bg-inherit'>Key</span>
                            </div>
                        ))}
                    </MarqueeSlider>     
                </Row>
            </Container>
            
        </section>
    );
};

export default Gallery;
