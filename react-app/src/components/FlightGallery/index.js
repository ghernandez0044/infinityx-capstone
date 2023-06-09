// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { searchFlights } from "../../store/flight"
import FlightCard from "../FlightCard"
import './FlightGallery.css'

function FlightGallery({ orbit, earlyDate, mass, travelClass, price }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Search flights upon component mount
    useEffect(() => {
        const payload = {
            orbit,
            "date": earlyDate
        }
        dispatch(searchFlights(payload))
    }, [dispatch])

    // Subscribe to search flights slice of state
    const searchedFlights = useSelector(state => Object.values(state.flights.searchedFlights))

    console.log('searched flights: ', searchedFlights)

    return (
        <div className="flight-gallery-container">
            <div className="flight-gallery-navbar">
                <div className="dark-font flight-gallery-header">
                    Available Flights
                </div>
            </div>
            <div className="flights-container">
                {searchedFlights.map(flight => (
                    <FlightCard key={flight.id} flight={flight} mass={mass} travelClass={travelClass} price={price} />
                ))}
            </div>
        </div>
    )
}

export default FlightGallery