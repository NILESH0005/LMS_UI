import React from 'react';
import ParallaxSection from '../component/ParallaxSection';
import ContentSection from '../component/ContentSection';
import "swiper/css";
import "swiper/css/navigation";
import NewsSection from '../component/NewsSection';
import ProjectShowcase from '../component/ProjectShowcase';
import CommunityHighlights from '../component/CommunityHighlights';

const Home = () => {
    return (
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-black to-blue-500">
            <ParallaxSection />
            <ContentSection />
            <NewsSection/>
            <ProjectShowcase/>
            <CommunityHighlights/>
        </div>
    );
};

export default Home;




