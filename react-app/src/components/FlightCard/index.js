// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getOneSpacecraft } from "../../store/spacecraft"
import { getAllSpaceport } from "../../store/spaceport"
import OpenModalIcon from "../OpenModalIcon"
import { NavLink, Redirect } from "react-router-dom"
import './FlightCard.css'
import RideshareConfirmation from "../RideshareConfirmation"

function FlightCard({ flight, mass, travelClass, price, num, showConfirmation, setShowConfirmation, setSelectedTransaction, setSelectedBooking, setSelectedFlight }){
    let classId
    if(travelClass === 'Base Class') classId = 1
    if(travelClass === 'Cruise Class') classId = 2
    if(travelClass === 'Launch Class') classId = 3

    // Create dispatch method
    const dispatch = useDispatch()

    // Load Spacecraft upon component render
    useEffect(() => {
        dispatch(getOneSpacecraft(flight.spacecraft_id)).then(res => dispatch(getAllSpaceport()))
    }, [dispatch])

    // Subscribe to current user slice of state
    const currentUser = useSelector(state => state.session.user)

    // Subscribe to single spacecraft slice of state
    const spacecraft = useSelector(state => state.spacecrafts.singleSpacecraft)

    // Subscribe to all spaceports slice of state
    const spaceports = useSelector(state => Object.values(state.spaceports.allSpaceports))

    const launch_port = spaceports[flight.launch_spaceport_id]
    const landing_port = spaceports[flight.landing_spaceport_id]

    if(!launch_port || !landing_port || Object.values(spacecraft).length === 0 || spaceports.length === 0) return null

    // Function to create a booking
    const bookFlight = () => {
        // alert(`booked!`)
        setSelectedFlight(flight)
        const today = new Date()
        const formattedToday = today.toISOString().split('T')[0]
        const booking = {
            'user_id': currentUser.id,
            'flightId': flight.id,
            'created_at': formattedToday
        }
        console.log('booking: ', booking)
        setSelectedBooking(booking)
        const transaction = {
            'user_id': currentUser.id,
            'travelclass_id': classId,
            'quantity': 1,
            'unit_price': num,
            'user_kg': Number(mass),
            'tax_percentage': .0725,
            'tax_total': (num * mass) * .0725,
            'total': ((num * mass) * .0725) + price,
            'created_at': formattedToday
        }
        console.log('transaction: ', transaction)
        const totalPrice = ((num * mass) * .0725) + price
        console.log('totalPrice: ', Number(totalPrice.toFixed(2)))
        setSelectedTransaction(transaction)

        setShowConfirmation(!showConfirmation)
    }

    return spacecraft && spaceports && (
        <div className="flight-card-container">
            <div className="flight-card-container-div">
                <div className="section-header">Spacecraft</div>
                <div className="dark-font flight-section-content">{spacecraft.model}</div>
            </div>
            <div className="flight-card-container-div">
                <div className="section-header">Departure Date</div>
                <div className="dark-font flight-section-content">{flight.departure_time.split('T')[0]}</div>
            </div>
            <div className="flight-card-container-div">
                <div className="section-header">Arrival Date</div>
                <div className="dark-font flight-section-content">{flight.arrival_time.split('T')[0]}</div>
            </div>
            <div className="flight-card-container-div">
                <div className="section-header">Orbit</div>
                <div className="dark-font flight-section-content">{flight.orbit}</div>
            </div>
            <div className="flight-card-container-div">
                <div className="section-header">Launching</div>
                <div className="dark-font flight-section-content">{launch_port.city}, {launch_port['state']}</div>
            </div>
            <div className="flight-card-container-div">
                <div className="section-header">Landing</div>
                <div className="dark-font flight-section-content">{landing_port.city}, {landing_port['state']}</div>
            </div>
            <div onClick={bookFlight} className="button-alternate resize">
                <div className="hover-effect-alternate"></div>
                <i className='fa-solid fa-arrow-right fa-2xl' />
                {/* <OpenModalIcon modalComponent={<h1>Confirmation</h1>} icon='fa-solid fa-arrow-right fa-2xl' /> */}
            </div>
        </div>
    )
}

export default FlightCard