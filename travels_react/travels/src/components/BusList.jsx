import React, { useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const BusList = () => {
    const [buses, setBus] = useState([])
    const navigate = useNavigate()
    useEffect(()=> {
        const fetchBuses = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/buses/')
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
        <div>
            {buses.map((item) => {
                return(
                    <div key={item.id}>
                        <div>
                            Bus Name {item.bus_name}
                        </div>
                        <div>
                            Bus Number {item.number}
                        </div>
                        <div>
                            Origin {item.origin}
                        </div>
                        <div>
                            Destination {item.destination}
                        </div>
                        <div>
                            Start Time {item.start_time}
                        </div>
                        <div>
                            Reach Time {item.reach_time}
                        </div>
                        <button onClick={()=>handleViewSeat(item.id)}>View Seats</button>
                        <hr />
                    </div>
                )
            })}
        </div>
    )




}

export default BusList;