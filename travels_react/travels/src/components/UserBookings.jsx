import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserBookings = ({token, userId}) => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [bookingError, setBookingError] = useState(null)
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [cancelling, setCancelling] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBookings = async() => {
            if(!token || !userId){
                setLoading(false)
                return
            }
            try{
                const response = await axios.get(`http://localhost:8000/api/user/${userId}/bookings/`,
                    {
                        headers:{
                            Authorization : `Token ${token}`
                        }
                    }
                )
                setBookings(response.data)
                setBookingError(null)
            } catch(error){
                console.log('Fetching Details Failed', error)
                setBookingError(error.response?.data?.message || "Failed to load bookings")                
            } finally {
                setLoading(false)
            }
        }
        fetchBookings()
    }, [userId, token])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking)
        setShowDetailsModal(true)
    }

    const handleCancelBooking = async (bookingId) => {
        if (window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
            setCancelling(true)
            try {
                await axios.delete(`http://localhost:8000/api/bookings/${bookingId}/cancel/`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                })
                // Remove the cancelled booking from the list
                setBookings(bookings.filter(booking => booking.id !== bookingId))
                alert("Booking cancelled successfully!")
                setShowDetailsModal(false)
            } catch (error) {
                console.error("Cancel error:", error)
                alert(error.response?.data?.message || "Failed to cancel booking. Please try again.")
            } finally {
                setCancelling(false)
            }
        }
    }

    const handleBackToHome = () => {
        navigate('/')
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your bookings...</p>
                </div>
            </div>
        )
    }

    if (bookingError) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Load Bookings</h3>
                        <p className="text-red-600">{bookingError}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!bookings || bookings.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <button 
                        onClick={handleBackToHome}
                        className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Back to Home
                    </button>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Bookings Yet</h3>
                        <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring available buses!</p>
                        <button 
                            onClick={handleBackToHome}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                        >
                            Browse Buses
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={handleBackToHome}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors group"
                >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Back to Home
                </button>

                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Bookings</h1>
                    <p className="text-gray-600">All your bus bookings in one place</p>
                    <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        {bookings.length} Booking{bookings.length !== 1 ? 's' : ''}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            Booking #{item.id}
                                        </h3>
                                        <div className="flex items-center mt-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-sm text-green-600 font-semibold">Confirmed</span>
                                        </div>
                                    </div>
                                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                        Seat {item.seat}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800">{item.bus}</h4>
                                            <p className="text-sm text-gray-600">Bus Service</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500 mb-1">Passenger</div>
                                        <div className="font-semibold text-gray-800 truncate">{item.user}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="text-sm text-gray-500 mb-1">Seat Number</div>
                                        <div className="font-semibold text-gray-800">{item.seat}</div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg col-span-2">
                                        <div className="text-sm text-gray-500 mb-1">Booking Time</div>
                                        <div className="font-semibold text-gray-800">{formatDate(item.booking_time)}</div>
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button 
                                        onClick={() => handleViewDetails(item)}
                                        className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-xl font-semibold hover:bg-blue-100 transition-colors duration-300"
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        onClick={() => handleCancelBooking(item.id)}
                                        className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-xl font-semibold hover:bg-red-100 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2">Booking Summary</h3>
                            <p className="text-blue-100">All your confirmed reservations</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="text-3xl font-bold">{bookings.length}</div>
                            <div className="text-blue-100">Total Bookings</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Details Modal */}
            {showDetailsModal && selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowDetailsModal(false)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
                            <button 
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Booking ID */}
                            <div className="bg-blue-50 p-4 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-blue-600 font-semibold">Booking ID</span>
                                    <span className="text-lg font-bold text-blue-700">#{selectedBooking.id}</span>
                                </div>
                            </div>

                            {/* Bus Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    Bus Information
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Bus Name:</span>
                                        <span className="font-semibold text-gray-800">{selectedBooking.bus}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">From:</span>
                                        <span className="font-semibold text-gray-800">{selectedBooking.origin || 'Chennai'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">To:</span>
                                        <span className="font-semibold text-gray-800">{selectedBooking.destination || 'Visakhapatnam'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Seat Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                                    </svg>
                                    Seat Information
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Seat Number:</span>
                                        <span className="font-semibold text-green-600 text-lg">{selectedBooking.seat}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Seat Type:</span>
                                        <span className="font-semibold text-gray-800">Sleeper</span>
                                    </div>
                                </div>
                            </div>

                            {/* Passenger Information */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                    </svg>
                                    Passenger Information
                                </h3>
                                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Passenger Name:</span>
                                        <span className="font-semibold text-gray-800">{selectedBooking.user}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booking Date:</span>
                                        <span className="font-semibold text-gray-800">{formatDate(selectedBooking.booking_time)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-green-600 font-semibold">Booking Status</div>
                                        <div className="text-lg font-bold text-green-700">Confirmed ✓</div>
                                    </div>
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons in Modal */}
                            <div className="flex space-x-3 pt-4 border-t border-gray-200">
                                <button 
                                    onClick={() => {
                                        setShowDetailsModal(false)
                                        handleCancelBooking(selectedBooking.id)
                                    }}
                                    disabled={cancelling}
                                    className="flex-1 bg-red-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-600 transition-colors duration-300 disabled:opacity-50"
                                >
                                    {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                                </button>
                                <button 
                                    onClick={() => setShowDetailsModal(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserBookings;