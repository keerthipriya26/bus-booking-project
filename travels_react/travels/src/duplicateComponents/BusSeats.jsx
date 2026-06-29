import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BusSeats = ({token}) => {
    const [bus, setBus] = useState(null)
    const [seats, setSeats] = useState([])

    const {busId} = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        const fetchBusDetails = async() => {
            try {
                const response = await axios(`/api/buses/${busId}`)
                setBus(response.data)
                setSeats(response.data.seats)
            } catch (error) {
                console.log('error in fetching details', error)
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
        try{
            const response = await axios.post('/api/booking/',
                {seat:seatId},
                {
                    headers:{
                        Authorization: `Token ${token}`
                    }
                }
            )
            alert('Booking Successful')
            setSeats((prevSeats) => 
                prevSeats.map((seat) => 
                    seat.id === seatId? {...seat, is_booked:true}: seat 
                )
            )
        } catch (error) {
            alert(error.response?.data?.error || "Booking Failed")
        }
    }

    return(
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Bus Info Card */}
                {bus && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{bus.bus_name}</h1>
                                <p className="text-gray-600 mt-2">Bus Number: <span className="font-semibold">{bus.number}</span></p>
                            </div>
                            <div className="mt-4 md:mt-0 px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-semibold">
                                Select Your Seat
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Origin & Destination */}
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
                    </div>
                )}

                {/* Seats Layout */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your Seat</h2>
                        
                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
                                <span className="text-sm text-gray-600">Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
                                <span className="text-sm text-gray-600">Booked</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
                                <span className="text-sm text-gray-600">Selected</span>
                            </div>
                        </div>

                        {/* Bus Layout Illustration */}
                        <div className="mb-6">
                            <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-gray-500 mb-2">Bus Front</div>
                                    <div className="w-24 h-8 bg-gray-800 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Seats Grid */}
                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
                            {seats.map((seat) => (
                                <div key={seat.id} className="relative">
                                    <button
                                        onClick={() => handleBook(seat.id)}
                                        disabled={seat.is_booked}
                                        className={`
                                            w-full aspect-square rounded-lg font-semibold
                                            transition-all duration-300 transform hover:scale-105
                                            disabled:cursor-not-allowed disabled:hover:scale-100
                                            ${seat.is_booked 
                                                ? 'bg-red-500 text-white hover:bg-red-600' 
                                                : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg'
                                            }
                                            flex items-center justify-center
                                        `}
                                    >
                                        {seat.seat_number}
                                        {seat.is_booked && (
                                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                            </svg>
                                        )}
                                    </button>
                                    <div className="text-xs text-center mt-1 text-gray-600">
                                        Seat {seat.seat_number}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Instruction */}
                        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-700 text-sm">
                                💺 Click on an available seat (green) to book it. Booked seats (red) are not available.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusSeats;