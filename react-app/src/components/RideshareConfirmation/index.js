// Necessary imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAllSpacecraft } from '../../store/spacecraft'
import { getAllSpaceport } from '../../store/spaceport'
import { getAllTravelClasses } from '../../store/travelClass'
import './RideshareConfirmation.css'

function RideshareConfirmation({ transaction, booking, flight, travelClass, spacecraft, launchSpaceport, landingSpaceport }){

    console.log('transaction confirmation: ', transaction)
    console.log('booking confirmation: ', booking)
    console.log('flight confirmation: ', flight)
    console.log('travelClass confirmation: ', travelClass)

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Load spacecrafts and spaceports into state upon component render
    useEffect(() => {
        console.log('useEffect running')
        dispatch(getAllSpacecraft()).then(res => dispatch(getAllSpaceport())).then(res => dispatch(getAllTravelClasses()))
    }, [dispatch, flight])

    // Subscribe to travel classes slice of state
    const allTravelClasses = useSelector(state => state.travelClasses.allTravelClasses)

    // Subscribe to spacecrafts slice of state
    const spacecrafts = useSelector(state => state.spacecrafts.allSpacecraft)

    console.log('spacecrafts: ', spacecrafts)
    
    // Subscribe to spaceports slice of state
    const spaceports = useSelector(state => state.spaceports.allSpaceports)
    
    console.log('spaceports: ', spaceports)
    
    // Subscribe to flightBooking slice of state
    const flightBooking = useSelector(state => state.flightBookings.currentFlightBooking)
    
    console.log('flightBooking: ', flightBooking)
    
    // Function to handle booking
    const handleBooking = () => {
        alert('booking')
    }
    
    // Function to go home
    const goHome = () => {
        history.push('/')
    }
    
    if(!spacecrafts || !spaceports || Object.values(spacecrafts).length === 0 || Object.values(spaceports).length === 0 || !flightBooking || Object.values(flightBooking).length === 0) return null
    
    console.log('spacecraft: ', spacecrafts[flightBooking.spacecraft_id])
    console.log('spaceport: ', spaceports[flightBooking.launch_spaceport_id])
    
    return (
        <div className='flight-gallery-container'>
            <div className='flight-gallery-navbar'>
                <div className='dark-font flight-gallery-header'>Add-Ons / Confirmation</div>
            </div>
            <div className='flight-time-confirmation-container'>
                <div className='planet-orbit-container'>
                    <div className='rideshare-header-font'>Planet Orbit</div>
                    <div className='rideshare-confirmation-content-font'>{flight.orbit}</div>
                </div>
                <div className='flight-origin-container'>
                    <div className='rideshare-header-font'>Flight Origin</div>
                    <div className='flexed'>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Spaceport</div>
                            <div className='rideshare-confirmation-content-font'>{launchSpaceport.city}, {launchSpaceport.state}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Departure Date</div>
                            <div className='rideshare-confirmation-content-font'>{flight.departure_time.split('T')[0]}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Departure Time</div>
                            <div className='rideshare-confirmation-content-font'>{flight.departure_time.split('T')[1]}</div>
                        </div>
                    </div>
                </div>
                <div className='flight-destination-container'>
                    <div className='rideshare-header-font'>Flight Destination</div>
                    <div className='flexed'>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Spaceport</div>
                            <div className='rideshare-confirmation-content-font'>{landingSpaceport.city}, {landingSpaceport.state}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Arrival Date</div>
                            <div className='rideshare-confirmation-content-font'>{flight.arrival_time.split('T')[0]}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Arrival Time</div>
                            <div className='rideshare-confirmation-content-font'>{flight.arrival_time.split('T')[1]}</div>
                        </div>
                    </div>
                </div>
                <div className='flight-spacecraft-container'>
                    <div className='rideshare-header-font'>Spacecraft</div>
                    <div className='flexed'>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Model</div>
                            <div className='rideshare-confirmation-content-font'>{spacecraft.model}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Year</div>
                            <div className='rideshare-confirmation-content-font'>{spacecraft.year}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Load Capacity</div>
                            <div className='rideshare-confirmation-content-font'>{spacecraft.load_capacity_kg.toLocaleString()} kg</div>
                        </div>
                    </div>
                </div>
                <div className='flight-travelclass-container'>
                    <div className='rideshare-header-font'>Travel Class</div>
                    <div className='rideshare-confirmation-content-font'>{travelClass}</div>
                </div>
                <div className='flight-pricing-container'>
                <div className='rideshare-header-font'>Pricing</div>
                    <div className='flexed'>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Travel Class</div>
                            <div className='rideshare-confirmation-content-font'>{travelClass}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Price Per Kg</div>
                            <div className='rideshare-confirmation-content-font'>${flightBooking.unit_price.toLocaleString()}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>User Mass In Kg</div>
                            <div className='rideshare-confirmation-content-font'>{flightBooking.user_kg} kg</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Subtotal</div>
                            <div className='rideshare-confirmation-content-font'>${flightBooking.subtotal.toLocaleString()}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Tax Percentage</div>
                            <div className='rideshare-confirmation-content-font'>7.25%</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Tax Total</div>
                            <div className='rideshare-confirmation-content-font'>${flightBooking.tax_total.toLocaleString()}</div>
                        </div>
                        <div className='flexed-column'>
                            <div className='rideshare-subheader-font'>Total Price</div>
                            <div className='rideshare-confirmation-content-font'>${flightBooking.total.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='rideshare-confirmation-buttons-container'>
                <div onClick={handleBooking} className="button-alternate2 resizing">
                    <div className="hover-effect-alternate2"></div>
                    <span className="signup-button-font">Book Flight</span>
                </div>
                <div onClick={goHome} className="button-alternate2-error resizing">
                    <div className="hover-effect-alternate2-error"></div>
                    <span className="signup-button-font">Go Home</span>
                </div>
            </div>
        </div>
    )
}

export default RideshareConfirmation