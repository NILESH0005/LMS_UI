import React from 'react';
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { images } from '../../public/index.js';

const CommunityGuidelines = () => {

  const handleLearnMoreClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="w-full mx-auto my-10 p-10 bg-DGXwhite rounded-lg shadow-2xl shadow-DGXgreen border-2 border-DGXgreen font-serif sm:max-w-[90%]">
      <h1 className="text-center text-6xl font-extrabold text-DGXblack mb-8 xs:text-4xl">DGX Community Policies</h1>
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-1/2">
          <img
            src={images.Team}
            className="w-600 h-600 transition-transform duration-500 ease-in-out transform hover:scale-105"
            alt="Team"
          />
          <div className="text-sm text-center hover:text-[#2563eb]">
            <i>
              <a href="https://storyset.com/people">People illustrations by Storyset</a>
            </i>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-2xl font-bold mb-4">We strive for the DGX Community to reflect the best version of your professional life</h2>
          <h2 className="text-2xl font-thin mb-4">In our community, we uphold mutual respect and foster each other&apos;s success.</h2>
        </div>
      </div>


      <div className="flex flex-wrap items-center mb-20">
        <div className="w-full md:w-1/2 p-2">
          <p className="text-lg w-full text-justify font-medium text-[#0c4a6e]">
            Welcome to the DGX Community! This policy outlines the principles and expectations that guide our vibrant ecosystem of professionals and enthusiasts.
            <br></br>
            Our mission is to foster a collaborative, innovative, and respectful environment where members can share insights, learn new skills, and build meaningful connections. To ensure the success of our community, we&apos;ve established the following guidelines and policies.
          </p>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <img
            src={images.Globe}
            className="w-full h-auto transition-transform duration-500 ease-in-out transform hover:scale-105"
            alt="Globe"
          />
          <div className="text-sm text-center mt-2">
            <i>
              <a
                href="https://www.freepik.com/free-vector/character-illustration-people_3584923.htm?epik=dj0yJnU9M3VmcThFeGlJaHFhaXhXZUs3VGgxUElrck9WcDJrS1cmcD0wJm49WFhkVFRZbEJnSjBSMXMtRl9fVXJ2QSZ0PUFBQUFBR2FiY3I0"
                className="text-[#2563eb] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Image by rawpixel.com on Freepik
              </a>
            </i>
          </div>
        </div>

      </div>
      <div className='flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <section id="be-safe-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold">Respect and Professionalism</h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview:</b></h3>
            Engage respectfully and maintain professionalism in discussions.
            Foster a collaborative and inclusive environment.
            <ul className="list-disc pl-5 text-[#374151]">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Tone and Language:</a> Maintain a respectful tone, free from offensive or aggressive language. Productive discussions are key to a thriving community.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Constructive Feedback:</a> Offer feedback that is solution-oriented and encourages learning, helping others improve without criticism turning negative.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Cultural Sensitivity:</a> Be mindful of cultural and regional differences, showing understanding and respect in interactions.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Conflict Resolution:</a> Address disagreements professionally, focusing on resolving issues rather than escalating conflicts.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Reporting Misconduct:</a>Report any inappropriate behavior to moderators to ensure the platform remains a safe and positive space.
              </li>
            </ul>
          </p>
        </section>

        <section id="be-trustworthy-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold">Data Privacy and Security</h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview:</b></h3>
            Protect personal and confidential data shared within the platform.
            Adhere to privacy and security standards when discussing data.

            <ul className="list-disc pl-5 text-[#374151] mt-2">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Personal Data Protection:</a>  Avoid sharing personal information, such as addresses or login credentials, to ensure privacy and safety.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Anonymized Datasets:</a> Ensure any datasets shared are anonymized and cleared for public use, adhering to privacy guidelines.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Confidentiality:</a>Refrain from sharing proprietary or sensitive company information that could compromise security or intellectual property.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Secure Sharing Protocols:</a> Use secure methods, such as encrypted channels, when sharing sensitive data or model details.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Data Breach Reporting:</a> Report any suspected data breaches immediately to the platform’s administration to mitigate risks.
              </li>
            </ul>
          </p>
        </section>

        <section id="be-professional-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold"> Code Sharing and Documentation</h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview: </b></h3>
            Share code that is functional and well-documented.
            Encourage collaborative learning through shared code.
            <ul className="list-disc pl-5 text-[#374151] ">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Clean Code:</a> Ensure code is well-structured, easily readable, and includes comments for clarity, making it accessible to others.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Dependencies:</a>Clearly list any external libraries or dependencies required to run your code to help others set it up.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Reproducibility:</a> Provide detailed instructions so others can replicate your results, ensuring transparency in your contributions.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Licensing:</a> Respect open-source licenses when sharing code, and properly attribute third-party code used in your projects.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Feedback and Collaboration:</a>Encourage peer reviews and collaborative development, helping refine code and build shared knowledge.

              </li>
            </ul>
          </p>
        </section>

        <section id="respect-and-courtesy-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold">Technical Assistance and Support
          </h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview:</b></h3>
            Offer and seek detailed support to solve technical challenges.
            Encourage collaboration in troubleshooting and problem-solving.
            <ul className="list-disc pl-5 text-[#374151]">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Clear Problem Statements:</a>When asking for help, provide detailed descriptions of the issue, including configurations, logs, and errors.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Efficient Responses:</a> Respond to queries with clear, concise advice, referencing official documentation when applicable.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Feedback Loop:</a>After receiving help, share the solution with the community to help others facing similar problems.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Common Issues:</a> Utilize search functions and existing threads to avoid repeating common questions, streamlining support.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Follow Up:</a> Always thank those who assist you and offer to help others when possible to foster a reciprocal community spirit.
              </li>
            </ul>
          </p>
        </section>

        <section id="privacy-and-confidentiality-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold">Ethical Use of AI and Data</h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview:</b></h3>
            Ensure responsible and ethical AI development.
            Prevent misuse of AI and data for harmful purposes.
            <ul className="list-disc pl-5 text-[#374151]">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Bias in Models:</a> Be aware of potential biases in your AI models, and take steps to mitigate them, ensuring fairness in AI applications.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Transparency:</a>Clearly communicate the limitations and capabilities of AI models, avoiding misleading claims.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Ethical Datasets:</a> Use ethically sourced datasets and ensure that the data aligns with privacy laws and ethical standards.

              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Social Impact: </a>Consider the broader societal implications of AI technologies, particularly in sensitive sectors like healthcare or law.

              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Avoiding Malicious Use:</a> Do not use or develop AI technologies for harmful purposes, such as unauthorized surveillance or exploitation.

              </li>
            </ul>
          </p>

        </section>

        <section id="no-spamming-or-self-promotion-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold">No Spamming or Self-Promotion</h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview: </b></h3>
            To maintain a focused and valuable community, avoid spamming and self-promotion:
            <ul className="list-disc pl-5 text-[#374151]">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Refraining from Spamming:</a> Only post content that is relevant to the community’s interests and purpose.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Avoiding Unsolicited Advertisements:</a> Do not use the platform for unsolicited advertisements or self-promotion unless it&apos;s clearly relevant and permitted by the community guidelines.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Contributing Valuable and Relevant Content:</a> Aim to add meaningful insights and information that benefit the community.
              </li>
            </ul>
          </p>
        </section>

        <section id="intellectual-property-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold"> Optimizing DGX Machine Performance</h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview:</b></h3>
            Share tips to improve DGX system performance.
            Ensure responsible and fair use of computational resources.
            <ul className="list-disc pl-5 text-[#374151]">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Resource Allocation:</a>  Share best practices for resource allocation to prevent overloading the system and ensure efficient utilization.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Performance Benchmarks:</a> Provide performance metrics from different workloads to guide others in optimizing their setups.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">System Monitoring: </a>  Discuss tools and methods for monitoring system health and performance, helping others maintain stable operations.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Script Automation: </a> Share automation scripts that streamline processes like data loading or system updates for greater efficiency.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Scaling Solutions: </a>  Offer solutions for scaling DGX usage to handle larger workloads, sharing strategies for minimizing bottlenecks.
                .
              </li>
            </ul>
          </p>
        </section>

        <section id="content-guidelines-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold">Content and Media Sharing</h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview:</b></h3>
            Share valuable content that enriches the community.
            Ensure media is relevant, useful, and properly attributed.
            <ul className="list-disc pl-5 text-[#374151]">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Educational Content: </a>Share tutorials, research papers, or videos that contribute to the collective knowledge of the community.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Content Relevance:</a>  Ensure that all shared media aligns with the platform’s objectives, avoiding unrelated promotional or advertising content.                .
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Proper Attribution:</a>Credit original authors when sharing third-party content, respecting intellectual property rights and copyright laws.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">File Sharing Guidelines: </a>Use external repositories for large datasets or media to prevent clogging the platform with heavy files.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Content Moderation: </a>Understand the platform’s moderation policies on media sharing, ensuring that shared content follows community guidelines.

              </li>
            </ul>
          </p>
        </section>

        <section id="conflict-resolution-details" className="mb-8">
          <h2 className="text-2xl text-DGXblack mt-8 text-center font-bold">Platform Improvements and Feature Requests</h2>
          <p className="text-[#374151] mt-4">
            <h3><b>Overview:</b></h3>
            Suggest new features and improvements to enhance the platform.
            Report bugs to help maintain platform functionality.
            <ul className="list-disc pl-5 text-[#374151]">
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Providing Feedback:</a> Share constructive feedback on features, suggesting specific improvements that could benefit the entire community.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Feature Suggestions:</a>When proposing new features, clearly outline their potential impact on user experience and how they align with platform goals.                .
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Bug Reporting: </a> Report technical issues with a detailed explanation, including steps to reproduce the bug, helping developers resolve problems efficiently.
              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">Testing Features: </a> Participate in beta tests of new features, providing feedback to help refine and improve the platform’s usability.

              </li>
              <li className="mb-2">
                <a className="font-bold text-DGXblack">User Engagement:</a> Contribute to discussions about platform development, offering insights from your experience to guide future updates.
              </li>
            </ul>
          </p>
        </section>
      </div>

    </div>
  );
};


export default CommunityGuidelines;

