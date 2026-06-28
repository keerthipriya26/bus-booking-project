import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About BusBooking</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Your trusted partner for seamless bus travel across India
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-12 text-gray-50" viewBox="0 0 1440 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 22L60 27C120 32 240 42 360 42C480 42 600 32 720 27C840 22 960 22 1080 27C1200 32 1320 42 1380 47L1440 54V54H0V22Z" fill="currentColor"/>
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
                >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Back to Home
                </button>

                {/* Mission Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/3 mb-6 md:mb-0">
                            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="md:w-2/3 md:pl-8 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                To revolutionize bus travel by providing a seamless, reliable, and user-friendly booking platform 
                                that connects travelers with the best bus services across the country. We're committed to making 
                                your journey as comfortable and hassle-free as possible.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Booking</h3>
                            <p className="text-gray-600">Instant confirmation and real-time seat availability updates</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payments</h3>
                            <p className="text-gray-600">Multiple payment options with 100% secure transactions</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
                            <p className="text-gray-600">Dedicated customer support available round the clock</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Prices</h3>
                            <p className="text-gray-600">Competitive pricing with exclusive deals and offers</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Wide Network</h3>
                            <p className="text-gray-600">Connectivity to 500+ cities across India</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Cancellation</h3>
                            <p className="text-gray-600">Hassle-free cancellation with instant refunds</p>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 mb-12 text-white">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-blue-100">Cities Covered</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">1M+</div>
                            <div className="text-blue-100">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">50K+</div>
                            <div className="text-blue-100">Daily Bookings</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">4.8★</div>
                            <div className="text-blue-100">Customer Rating</div>
                        </div>
                    </div>
                </div>

                {/* Our Team */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl text-white font-bold">K</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">Pavan Kumar</h3>
                            <p className="text-blue-600 mb-3">CEO & Founder</p>
                            <p className="text-gray-600 text-sm">15+ years in travel industry, passionate about making travel accessible to all.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl text-white font-bold">K</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">Keerthi</h3>
                            <p className="text-blue-600 mb-3">CTO</p>
                            <p className="text-gray-600 text-sm">Tech visionary leading our digital transformation.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl text-white font-bold">A</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-1">Prasad</h3>
                            <p className="text-blue-600 mb-3">Head of Operations</p>
                            <p className="text-gray-600 text-sm">Ensuring smooth operations and excellent customer service.</p>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 flex">
                                    ★★★★★
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">"Excellent service! Very easy to book tickets and great customer support. Will definitely use again."</p>
                            <div className="font-semibold text-gray-800">- Venkatesh</div>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                                <div className="text-yellow-400 flex">
                                    ★★★★★
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">"Best bus booking platform! The seat selection is very intuitive and payment process is smooth."</p>
                            <div className="font-semibold text-gray-800">- Srinu </div>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
                    <p className="text-gray-300 mb-6">Our support team is here to help you 24/7</p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                            </svg>
                            <span>+1 234 567 8900</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            <span>support@busbooking.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;