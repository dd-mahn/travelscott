import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeroImg from '../assets/hero-img.svg';
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
                        <img src={HeroImg} alt="Hero Img" />
                    </Col>
                </Row>             
            </Container>
           </section>
        </>
    );
};

export default Home;