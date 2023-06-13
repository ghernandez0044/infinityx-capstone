// Necessary imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './RideshareConfirmation.css'

function RideshareConfirmation({ transaction, booking, flight, mass, travelClass, num, price }){

    console.log('transaction confirmation: ', transaction)
    console.log('booking confirmation: ', booking)
    console.log('flight confirmation: ', flight)

    // Subscribe to spacecrafts slice of state
    const spacecrafts = useSelector(state => state.spacecrafts.allSpacecrafts)

    // Subscribe to spaceports slice of state
    const spaceports = useSelector(state => state.spaceports.allSpaceports)

    console.log('spaceports: ', spaceports)
    

    return (
        <div className='flight-gallery-container'>
            <div className='flight-gallery-navbar'>
                <div className='dark-font flight-gallery-header'>Add-Ons / Confirmation</div>
            </div>
            <div className='flight-time-confirmation-container'>
                <div className='dark-font'>{flight.orbit}</div>
                <div className='dark-font'>{spaceports[flight.launch_spaceport_id].city}, {spaceports[flight.launch_spaceport_id].state}</div>
                <div className='dark-font'>{flight.departure_time}</div>
                <div className='dark-font'>{flight.arrival_time}</div>
            </div>
        </div>
    )
}

export default RideshareConfirmation