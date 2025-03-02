import React from 'react';

const ContentSection = () => {
    return (
        <div id="sec" className="relative p-24 bg-purple-900 flex items-center justify-between">
            <div className="max-w-2xl">
                <h2 className="text-white text-4xl mb-8">Welcome to DGX Community</h2>
                <p className="text-white">
                    The DGX Community is a global network of innovators, developers, and tech enthusiasts dedicated to pushing the boundaries of technology. Whether you're working on AI, machine learning, or cutting-edge hardware, our community is here to support and inspire you.<br /><br />
                    Explore our projects, connect with like-minded individuals, and contribute to the future of technology. Together, we can solve the world's most challenging problems and create a better tomorrow.<br /><br />
                    Join us today and be part of the revolution!
                </p>
            </div>
            <div className="w-1/3">
                <img 
                    src="https://via.placeholder.com/300" 
                    alt="DGX Community" 
                    className="rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default ContentSection;
