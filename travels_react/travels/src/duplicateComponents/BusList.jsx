import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BusList = () => {
    const [buses, setBus] = useState([])
    const navigate = useNavigate()
    
    useEffect(()=> {
        const fetchBuses = async() => {
            try {
                const response = await axios.get(`/api/buses/`)
                setBus(response.data)
            } catch (error) {
                console.log('Error in fetching Buses', error)
            }
        } 
        fetchBuses()
    }, [])

    const handleViewSeat = (id) => {
        navigate(`/bus/${id}`)
    }

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Available Buses</h1>
                    <p className="text-gray-600">Select a bus to view available seats</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buses.map((item) => (
                        <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                            <div className="p-6">
                                {/* Bus Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {item.bus_name}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">Bus No: {item.number}</p>
                                    </div>
                                    <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                                        Available
                                    </div>
                                </div>

                                {/* Route Information */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <div className="text-lg font-bold text-gray-800">{item.origin}</div>
                                            <div className="text-sm text-gray-500">Origin</div>
                                        </div>
                                        <div className="flex-1 mx-4">
                                            <div className="flex items-center">
                                                <div className="h-0.5 bg-blue-200 flex-grow"></div>
                                                <div className="mx-2 text-blue-500">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H3a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                                                    </svg>
                                                </div>
                                                <div className="h-0.5 bg-blue-200 flex-grow"></div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-gray-800">{item.destination}</div>
                                            <div className="text-sm text-gray-500">Destination</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Timing Information */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <div>
                                                <div className="text-sm text-gray-500">Departure</div>
                                                <div className="font-semibold text-gray-800">{item.start_time}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                            <div>
                                                <div className="text-sm text-gray-500">Arrival</div>
                                                <div className="font-semibold text-gray-800">{item.reach_time}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button 
                                    onClick={() => handleViewSeat(item.id)}
                                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center group"
                                >
                                    View Available Seats
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BusList;