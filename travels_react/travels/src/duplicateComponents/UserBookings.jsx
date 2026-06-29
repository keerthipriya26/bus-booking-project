import axios from "axios";
import React, { useEffect, useState } from "react";

const UserBookings = ({token, userId}) => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [bookingError, setBookingError] = useState(null)
    const [cancellingId, setCancellingId] = useState(null)

    useEffect(() => {
        const fetchBookings = async() => {
            if(!token || !userId){
                setLoading(false)
                return
            }
            try{
                const response = await axios.get(`/api/user/${userId}/bookings/`,
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

    const handleCancel = async(bookingId) => {
        if(!window.confirm('Are you sure you want to cancel this booking?')) return
        setCancellingId(bookingId)
        try {
            await axios.delete(`/api/booking/${bookingId}/cancel/`, {
                headers: { Authorization: `Token ${token}` }
            })
            setBookings(prev => prev.filter(b => b.id !== bookingId))
        } catch(error) {
            alert(error.response?.data?.error || 'Failed to cancel booking')
        } finally {
            setCancellingId(null)
        }
    }

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
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Bookings Yet</h3>
                        <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start exploring available buses!</p>
                        <a 
                            href="/" 
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                        >
                            Browse Buses
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
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
                                {/* Booking Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            Booking #{item.id || index + 1}
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

                                {/* Bus Details */}
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

                                {/* Booking Info Grid */}
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

                                {/* Action Buttons */}
                                <div className="flex space-x-3">
                                    <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-xl font-semibold hover:bg-blue-100 transition-colors duration-300">
                                        View Details
                                    </button>
                                    <button 
                                        onClick={() => handleCancel(item.id)}
                                        disabled={cancellingId === item.id}
                                        className="flex-1 bg-red-50 text-red-600 py-2 px-4 rounded-xl font-semibold hover:bg-red-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {cancellingId === item.id ? 'Cancelling...' : 'Cancel'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Card */}
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
        </div>
    )
}

export default UserBookings;