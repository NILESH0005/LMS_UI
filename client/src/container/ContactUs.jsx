import React, { useState, useEffect } from 'react';
import Map from '../constant/Map.jsx';


const ContactUs = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex justify-center items-center">
            <section className="w-full max-w-7xl mb-8">
                {/* Contact Form and Info Section */}
                <div className="container px-8 md:px-12 mt-12">
                    <div className="block rounded-lg border border-DGXgreen shadow-md px-8 py-12 md:py-16 md:px-12">
                        <div className="flex flex-wrap">
                            {/* Contact Form */}
                            <div className="w-full md:w-1/2 lg:w-1/2 md:px-3 lg:px-6 mb-12">
                                {loading ? (
                                    <div className="space-y-5 animate-pulse">
                                        <div className="h-10 bg-DGXblue/45 rounded"></div>
                                        <div className="h-10 bg-DGXblue/45 rounded"></div>
                                        <div className="h-24 bg-DGXblue/45 rounded"></div>
                                        <div className="h-10 bg-DGXblue/45 rounded"></div>
                                    </div>
                                ) : (
                                    <form>
                                        {['Name', 'Email address', 'Message'].map((placeholder, idx) => (
                                            <div className="relative mb-6" key={idx} data-te-input-wrapper-init>
                                                {placeholder !== 'Message' ? (
                                                    <input
                                                        type={placeholder === 'Email address' ? 'email' : 'text'}
                                                        className="peer w-full rounded border-2 bg-transparent py-2 px-3 outline-none transition-all duration-200 focus:text-primary"
                                                        placeholder={placeholder}
                                                    />
                                                ) : (
                                                    <textarea
                                                        className="peer w-full rounded border-2 bg-transparent py-2 px-3 outline-none transition-all duration-200 focus:text-primary"
                                                        rows="3"
                                                        placeholder={placeholder}
                                                    ></textarea>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="w-full rounded bg-DGXgreen text-DGXwhite px-6 py-2 font-medium uppercase text-xs"
                                        >
                                            Send
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Contact Information */}
                            <div className="w-full md:w-1/2 lg:w-1/2 md:px-3 lg:px-3">
                                {loading ? (
                                    <div className="space-y-7 animate-pulse">
                                        <div className="h-10 bg-DGXblue/45 rounded"></div>
                                        <div className="h-10 bg-DGXblue/45 rounded"></div>
                                        <div className="h-10 bg-DGXblue/45 rounded"></div>
                                        <div className="h-10 bg-DGXblue/45 rounded"></div>
                                    </div>
                                ) : (
                                    <div className="space-y-7 ">
                                        {[
                                            { title: 'Address', content: 'Global Infoventures Pvt. Ltd. H-65 Sector 63, Noida' },
                                            { title: 'Email', content: 'info@giindia.com' },
                                            { title: 'Contact No', content: '+91 9876543210' },
                                            { title: 'Working hours', content: 'Mon - Fri: 10:00 AM - 06:00 PM' }
                                        ].map((info, idx) => (
                                            <div key={idx}>
                                                <h2 className="md:text-base font-bold text-primary ">{info.title}</h2>
                                                <p className="text-neutral-500 text-sm md:text-sm">{info.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Map Section */}
                        <div id="map" className="mt-8 relative h-[400px] w-full overflow-hidden bg-cover bg-no-repeat rounded-lg border border-DGXgreen shadow-xl">
                            {loading ? (
                                <div className="w-full h-full bg-DGXblue/50 animate-pulse" />
                            ) : (
                                <Map className="w-full h-full" />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
