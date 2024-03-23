import React from 'react';
import 'remixicon/fonts/remixicon.css';
import './header.css'
import {Container, Row, Col} from 'react-bootstrap';
import {NavLink, Link, useNavigate} from 'react-router-dom'

const navs = [
    {
        path: '/about',
        display: 'About'
    },
    {
        path: '/discover',
        display: 'Discover'
    },
    {
        path: '/contact',
        display: 'Contact'
    }
]
const Header = () => {
    return (
        <Container className='header'>
            <Row className='flex justify-between items-center'>
                <Col lg='2'>
                    <h1 className='font-kaushan'>TravelScott</h1>
                </Col>
                <Col>
                    <div className="flex flex-row justify-between gap-12 ">
                        {/* {
                            navs.map((nav,index) => (
                                <div className='nav' key={index}>
                                    <NavLink to={nav.path} activeClassName='active'>{nav.display}</NavLink>
                                </div>
                            ))
                        } */}
                    </div>
                </Col>
                <Col>
                    <button><i class="ri-contrast-2-fill"></i></button>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;