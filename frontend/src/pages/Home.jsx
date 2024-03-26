import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeroCircle from '../assets/hero-circle.svg';
import HeroImg from '../assets/hero-img.svg';
import AboutVideo from '../assets/home-about.mp4';
import '../styles/home.css';

const Home = () => {
    return (
        <>
        {/* Hero start */}
           <section className='hero'>
            <Container>
                <Row className='flex'>
                    <Col lg='4' className='hero__content'>
                        <h1><span>EXPLORE</span> LIKE <br/> NEVER BEFORE</h1>
                        <button className='start__btn btn'>GET STARTED</button>
                    </Col>
                    <Col lg='8' className='hero__circle'>
                        <img src={HeroCircle} alt="circle" />
                        <img src={HeroImg} alt="Hero Img" />
                    </Col>
                </Row>             
            </Container>
           </section>
        {/* Hero end */}

        {/* About start */}
           <section className='about'>
            <Container>
                <Row className='flex justify-between mb-40 row-1'>
                    <Col lg='2'>
                        <i className='ri-arrow-right-line'></i>
                    </Col>
                    <Col lg='8'>
                        <p> A <strong>Comprehensive Catalogue</strong> of <br/> Destinations with Tailored Travel Insights</p>
                    </Col>
                </Row>
                <Row className='flex justify-between gap-20 row-2'>
                    <Col lg='6'>
                        <video src={AboutVideo} autoPlay loop muted></video>
                    </Col>
                    <Col lg='4' className='flex flex-col gap-6'>
                        <p>Let your emotions guide your journey. Question-based analysis of your travel mood leads to bespoke destination and plan suggestions that promise an unforgettable experience.</p>
                        <p>Or directly step into our virtual gallery of global travel destinations. Each destination is presented with stunning imagery and essential details, making it easy to plan your next adventure. Whether you’re seeking inspiration or ready to book your trip, our gallery is your passport to discovering the most worthwhile visits.</p>
                        <p><strong>Manh Do</strong> <br/> @godsadeser</p>
                    </Col>
                </Row>
            </Container>
           </section>
        {/* About end */}

        {/* Gallery Start */}
            <section className='gallery'>
                <Container>
                    
                </Container>
            </section>
        </>
    );
};

export default Home;