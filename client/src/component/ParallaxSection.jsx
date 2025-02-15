import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

const ParallaxSection = () => {
    useEffect(() => {
        const handleScroll = () => {
            const value = window.scrollY;
            document.getElementById('circuit_board').style.left = value * 0.5 + 'px';
            document.getElementById('ai_chip').style.top = value * 1.5 + 'px';
            document.getElementById('data_center').style.top = value * 0.5 + 'px';
            document.getElementById('text').style.marginRight = value * 4 + 'px';
            document.getElementById('text').style.marginTop = value * 1.5 + 'px';
            document.getElementById('btn').style.marginTop = value * 1.5 + 'px';
            document.querySelector('header').style.top = value * 0.5 + 'px';
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative w-full h-screen flex justify-center items-center overflow-hidden">
            <img src=".png" id="circuit_board" alt="Circuit Board" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
            <img src="../public/bg.png" id="ai_chip" alt="AI Chip" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
            <img src=".png" id="data_center" alt="Data Center" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
            <h2 id="text" className="absolute text-white text-8xl whitespace-nowrap z-10">Innovate. Collaborate. Transform.</h2>
            <a href="/VerifyEmail" id="btn" className="absolute bg-white text-purple-900 px-8 py-4 rounded-full text-xl z-10 transform translate-y-24">
             Join Us
            </a>
            <img src=".png" id="tech_wave" alt="Tech Wave" className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none" />
        </section>
    );
};

export default ParallaxSection;