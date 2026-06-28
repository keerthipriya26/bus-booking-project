import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BusSeats = ({token}) => {
    const [bus, setBus] = useState(null)
    const [seats, setSeats] = useState([])
    const [loading, setLoading] = useState(true)
    const [bookingInProgress, setBookingInProgress] = useState(false)
    const [selectedSeat, setSelectedSeat] = useState(null)

    const {busId} = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchBusDetails = async() => {
            try {
                setLoading(true)
                const response = await axios(`http://localhost:8000/api/buses/${busId}`)
                setBus(response.data)
                // Ensure we're getting the correct seat data from backend
                if (response.data.seats && Array.isArray(response.data.seats)) {
                    setSeats(response.data.seats)
                } else {
                    console.error("Seats data not found in response:", response.data)
                    setSeats([])
                }
            } catch (error) {
                console.log('error in fetching details', error)
                alert("Failed to fetch bus details. Please try again.")
            } finally {
                setLoading(false)
            }
        }
        fetchBusDetails()
    }, [busId])

    const handleBook = async(seatId) => {
        if(!token){
            alert('Please login for Booking a seat')
            navigate('/login')
            return
        }
        
        if (bookingInProgress) {
            alert("Please wait, booking in progress...")
            return
        }

        setBookingInProgress(true)
        setSelectedSeat(seatId)
        
        try{
            const response = await axios.post('http://localhost:8000/api/booking/',
                {seat: seatId},
                {
                    headers:{
                        Authorization: `Token ${token}`
                    }
                }
            )
            alert(`Booking Successful! Seat number: ${response.data.seat}`)
            
            // Refresh seats from backend to ensure consistency
            const busResponse = await axios(`http://localhost:8000/api/buses/${busId}`)
            setSeats(busResponse.data.seats)
            
        } catch (error) {
            console.error("Booking error:", error)
            if (error.response?.status === 409) {
                alert("This seat is already booked. Please select another seat.")
                // Refresh seats to show updated status
                const busResponse = await axios(`http://localhost:8000/api/buses/${busId}`)
                setSeats(busResponse.data.seats)
            } else if (error.response?.status === 401) {
                alert("Session expired. Please login again.")
                navigate('/login')
            } else {
                alert(error.response?.data?.error || "Booking Failed. Please try again.")
            }
        } finally {
            setBookingInProgress(false)
            setSelectedSeat(null)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading seat map...</p>
                </div>
            </div>
        )
    }

    if (!bus) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-100 rounded-full p-4 mx-auto w-20 h-20 flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <p className="text-gray-600">Bus not found</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Back Home
                    </button>
                </div>
            </div>
        )
    }

    const availableSeatsCount = seats.filter(s => !s.is_booked).length
    const bookedSeatsCount = seats.filter(s => s.is_booked).length

    return(
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
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

                {/* Bus Info Card */}
                {bus && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{bus.bus_name}</h1>
                                <p className="text-gray-600 mt-2">Bus Number: <span className="font-semibold">{bus.number}</span></p>
                                <p className="text-gray-600">Price: <span className="font-semibold text-green-600">₹{bus.price}</span></p>
                            </div>
                            <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold">
                                Select Your Seat
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">From</p>
                                        <p className="text-lg font-semibold text-gray-800">{bus.origin}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">To</p>
                                        <p className="text-lg font-semibold text-gray-800">{bus.destination}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="text-lg font-semibold text-gray-800">
                                            {bus.start_time} - {bus.reach_time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Available Seats Counter */}
                        <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <span className="text-sm text-yellow-700">
                                        Available Seats: <strong className="text-lg">{availableSeatsCount}</strong> out of {seats.length}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600 mr-4">
                                        Booked Seats: <strong className="text-red-600">{bookedSeatsCount}</strong>
                                    </span>
                                    <button 
                                        onClick={async () => {
                                            const response = await axios(`http://localhost:8000/api/buses/${busId}`)
                                            setSeats(response.data.seats)
                                        }}
                                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        Refresh Seats
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Seats Layout */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your Seat</h2>
                        
                        {/* Legend */}
                        <div className="flex flex-wrap gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
                                <span className="text-sm text-gray-600">Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
                                <span className="text-sm text-gray-600">Booked</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
                                <span className="text-sm text-gray-600">Selecting...</span>
                            </div>
                        </div>

                        {/* Bus Layout Illustration */}
                        <div className="mb-8">
                            <div className="bg-gradient-to-r from-gray-100 to-gray-200 h-32 rounded-lg mb-4 flex items-center justify-center relative">
                                <div className="text-center">
                                    <div className="text-gray-500 mb-2 flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
                                        </svg>
                                        Driver Seat
                                    </div>
                                    <div className="w-40 h-10 bg-gray-800 rounded-lg mx-auto flex items-center justify-center">
                                        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                    <div className="text-sm font-semibold text-gray-500">→ Front</div>
                                </div>
                            </div>
                            <div className="text-center text-sm text-gray-500">
                                Looking from inside the bus
                            </div>
                        </div>

                        {/* Seats Grid */}
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-8">
                            {seats.map((seat) => (
                                <div key={seat.id} className="relative">
                                    <button
                                        onClick={() => handleBook(seat.id)}
                                        disabled={seat.is_booked || bookingInProgress}
                                        className={`
                                            w-full aspect-square rounded-lg font-semibold text-sm
                                            transition-all duration-300 transform hover:scale-105
                                            disabled:cursor-not-allowed disabled:hover:scale-100
                                            flex items-center justify-center flex-col
                                            ${bookingInProgress && selectedSeat === seat.id 
                                                ? 'bg-gray-300 text-gray-500 animate-pulse' 
                                                : seat.is_booked 
                                                    ? 'bg-red-500 text-white cursor-not-allowed' 
                                                    : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg'
                                            }
                                        `}
                                    >
                                        <span className="text-base">{seat.seat_number}</span>
                                        {!seat.is_booked && !(bookingInProgress && selectedSeat === seat.id) && (
                                            <span className="text-xs mt-1 opacity-90">Available</span>
                                        )}
                                        {bookingInProgress && selectedSeat === seat.id && (
                                            <span className="text-xs mt-1">Booking...</span>
                                        )}
                                    </button>
                                    <div className="text-xs text-center mt-2 text-gray-600">
                                        Seat {seat.seat_number}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Booking Tips */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-800 font-medium">Booking Instructions:</p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            Click on any green (available) seat to book it. Red seats are already booked.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-800 font-medium">Pro Tip:</p>
                                        <p className="text-xs text-green-600 mt-1">
                                            Book early to get your preferred seat! Window seats are in high demand.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary Card */}
                        {token && (
                            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-purple-600 font-semibold">Logged in as:</p>
                                        <p className="text-lg font-bold text-purple-800">
                                            {token ? "Ready to Book" : "Please Login to Book"}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-purple-600">Your booking will be confirmed instantly</p>
                                        <p className="text-xs text-purple-500">✓ Secure payment ✓ Instant confirmation</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusSeats;