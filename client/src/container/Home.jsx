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
        <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-purple-900 to-blue-500">
           
            <ParallaxSection />
            <ContentSection />
            <NewsSection/>
            <ProjectShowcase/>
            <CommunityHighlights/>
        

        </div>
    );
};

export default Home;










// import { useState, useEffect } from "react";
// import { Tab } from "@headlessui/react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import CountUp from "react-countup";


// const slides = [
//   { image: "slide1.jpg", title: "Slide 1", description: "Description for slide 1" },
//   { image: "slide2.jpg", title: "Slide 2", description: "Description for slide 2" },
//   { image: "slide3.jpg", title: "Slide 3", description: "Description for slide 3" },
// ];

// const newsData = {
//   general: [
//     { title: "General News 1", description: "Brief details about news 1", link: "#" },
//     { title: "General News 2", description: "Brief details about news 2", link: "#" },
//   ],
//   technocrat: [
//     { title: "Tech News 1", description: "Brief details about tech news 1", link: "#" },
//     { title: "Tech News 2", description: "Brief details about tech news 2", link: "#" },
//   ],
// };

// const facts = [
//   { start: 1000, end: 5000, prefix: "", suffix: "+", label: "AI Models Trained" },
//   { start: 500, end: 1500, prefix: "$", suffix: "M", label: "Investment in AI" },
// ];

// function RealTimeFacts() {
//   const [updatedFacts, setUpdatedFacts] = useState(facts);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setUpdatedFacts((prevFacts) =>
//         prevFacts.map((fact) => ({
//           ...fact,
//           end: fact.end + Math.floor(Math.random() * 50),
//         }))
//       );
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full max-w-5xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-8">
//       <h2 className="text-2xl font-bold text-center mb-6">🔹 Real-Time AI Facts & Figures</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//         {updatedFacts.map((fact, index) => (
//           <div key={index} className="p-4 bg-gray-700 rounded-lg shadow-lg hover:bg-gray-600 transition">
//             <h3 className="text-4xl font-extrabold text-green-400">
//               {fact.prefix}
//               <CountUp start={fact.start} end={fact.end} duration={3} separator="," />
//               {fact.suffix}
//             </h3>
//             <p className="text-gray-300">{fact.label}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ParallaxSection() {
//   return (
//     <div className="relative bg-fixed bg-center bg-cover h-[300px] flex items-center justify-center text-white text-3xl font-bold" style={{ backgroundImage: "url('parallax-bg.jpg')" }}>
//       Explore the Future with AI
//     </div>
//   );
// }

// export default function DGXHome() {
//   return (
//     <div className="bg-gray-900 text-white min-h-screen">
//       <div className="relative w-full h-[400px]">
//         <Swiper modules={[Navigation, Autoplay]} navigation autoplay={{ delay: 4000 }} loop className="w-full h-full">
//           {slides.map((slide, index) => (
//             <SwiperSlide key={index} className="relative">
//               <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-70" />
//               <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-black/50">
//                 <h2 className="text-3xl font-bold">{slide.title}</h2>
//                 <p className="mt-2 text-lg">{slide.description}</p>
//                 <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white">Learn More</button>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//       <ParallaxSection />
//       <RealTimeFacts />
//       <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-8">
//         <Tab.Group>
//           <Tab.List className="flex space-x-4 border-b border-gray-700 pb-2">
//             {Object.keys(newsData).map((category) => (
//               <Tab key={category} className={({ selected }) => `px-4 py-2 text-lg font-semibold ${selected ? "text-green-400 border-b-2 border-green-400" : "text-gray-400"}`}>{category === "general" ? "General" : "Technocrat"}</Tab>
//             ))}
//           </Tab.List>
//           <Tab.Panels className="mt-4">
//             {Object.keys(newsData).map((category) => (
//               <Tab.Panel key={category} className="space-y-4">
//                 {newsData[category].map((news, index) => (
//                   <div key={index} className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
//                     <h3 className="text-xl font-bold">{news.title}</h3>
//                     <p className="text-gray-300">{news.description}</p>
//                     <a href={news.link} className="text-green-400 hover:underline">Read More →</a>
//                   </div>
//                 ))}
//               </Tab.Panel>
//             ))}
//           </Tab.Panels>
//         </Tab.Group>
//       </div>
//     </div>
//   );
// }
