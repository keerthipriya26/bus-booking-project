import React from "react";
import { Link } from "react-router-dom";

const Wrapper = ({token, handleLogout, children}) => {
    const logout = () => {
        handleLogout()
    }
    
    return(
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Brand */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-3">
                                <span className="text-white text-xl font-bold">BusBooking</span>
                                <span className="text-blue-200 text-sm block -mt-1">Online Reservation</span>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link 
                                    to="/" 
                                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Home
                                </Link>
                                <Link 
                                    to="/my-bookings" 
                                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    My Bookings
                                </Link>
                                <Link 
                                    to="/about" 
                                    className="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    About
                                </Link>
                            </div>
                        </div>

                        {/* Auth Button */}
                        <div>
                            {token ? (
                                <button 
                                    onClick={logout}
                                    className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                                    </svg>
                                    Logout
                                </button>
                            ): 
                            <Link to='/login'>
                                <button className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                                    </svg>
                                    Login
                                </button>
                            </Link> 
                            }
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Button (hidden for now) */}
            <div className="md:hidden bg-white border-b">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link 
                        to="/" 
                        className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/my-bookings" 
                        className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                    >
                        My Bookings
                    </Link>
                    <Link 
                        to="/about" 
                        className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
                    >
                        About
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <main className="py-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <span className="text-xl font-bold">BusBooking</span>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">Your trusted bus booking platform</p>
                        </div>
                        <div className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} BusBooking. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Wrapper;