
import React from 'react';
import Hero from '../components/Hero';
import Events from '../components/Events';
import Story from '../components/Story';
import Gallery from '../components/Gallery';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Story />
            <Events />
            <Gallery />
        </>
    );
};

export default Home;
