import React from 'react';
import Brands from './Brands/Brands';
import Carousel from './Carousel/Carousel';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Reviews from './Reviews/Reviews';
import Services from './Services/Services';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <Brands></Brands>
            <Services></Services>
            <Carousel></Carousel>
            <Reviews></Reviews>
            <Footer></Footer>
        </div>
    );
};

export default Home;