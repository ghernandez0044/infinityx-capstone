// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getOneSpacecraft } from "../../store/spacecraft"
import { getAllSpaceport } from "../../store/spaceport"
import './FlightCard.css'

function FlightCard({ flight, mass, travelClass, price }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load Spacecraft upon component render
    useEffect(() => {
        dispatch(getOneSpacecraft(flight.spacecraft_id)).then(res => dispatch(getAllSpaceport()))
    }, [dispatch])

    // Subscribe to single spacecraft slice of state
    const spacecraft = useSelector(state => state.spacecrafts.singleSpacecraft)

    // Subscribe to all spaceports slice of state
    const spaceports = useSelector(state => Object.values(state.spaceports.allSpaceports))

    const launch_port = spaceports[flight.launch_spaceport_id]
    const landing_port = spaceports[flight.landing_spaceport_id]

    if(!launch_port || !landing_port || Object.values(spacecraft).length === 0 || spaceports.length === 0) return null

    // Function to create a booking
    const bookFlight = () => {
        alert('booked!')
    }

    console.log('flight: ', flight)
    console.log('spacecraft: ', spacecraft)
    console.log('launch port: ', launch_port)
    console.log('landing port: ', landing_port)

    return spacecraft && spaceports && (
        <div className="flight-card-container">
            <div className="spacecraft-name-container">
                <h2 className="dark-font">Spacecraft</h2>
                <div className="dark-font">{spacecraft.model}</div>
            </div>
            <div className="flght-departure-container">
                <h2 className="dark-font">Departure Date</h2>
                <div className="dark-font">{flight.departure_time}</div>
            </div>
            <div className="flght-arrival-container">
                <h2 className="dark-font">Arrival Date</h2>
                <div className="dark-font">{flight.arrival_time}</div>
            </div>
            <div className="flght-orbit-container">
                <h2 className="dark-font">Orbit</h2>
                <div className="dark-font">{flight.orbit}</div>
            </div>
            <div className="flght-departing-container">
                <h2 className="dark-font">Departing Spaceport</h2>
                <div className="dark-font">{launch_port.city}, {landing_port['state']}</div>
            </div>
            <div className="flght-landing-container">
                <h2 className="dark-font">Landing Spaceport</h2>
                <div className="dark-font">{landing_port.city}, {landing_port['state']}</div>
            </div>
            <div type='submit' onClick={bookFlight} className="button animate resize">
                <div className="hover-effect"></div>
                <i className='fa-solid fa-arrow-right fa-2xl' />
            </div>
        </div>
    )
}

export default FlightCard