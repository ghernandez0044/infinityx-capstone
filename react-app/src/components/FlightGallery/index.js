// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { searchFlights } from "../../store/flight"
import FlightCard from "../FlightCard"
import RideshareConfirmation from "../RideshareConfirmation"
import './FlightGallery.css'

function FlightGallery({ orbit, earlyDate, mass, travelClass, price, num }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variables
    const [ showConfirmation, setShowConfirmation ] = useState(false)
    const [ selectedFlight, setSelectedFlight ] = useState({})
    const [ selectedBooking, setSelectedBooking ] = useState({})
    const [ selectedTransaction, setSelectedTransaction ] = useState({})
    const [ bookingTotalPrice, setBookingTotalPrice ] = useState(0)
    const [ selectedSpacecraft, setSelectedSpacecraft ] = useState('')

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

    return (
        <>
            <div className="flight-gallery-container">
                <div className="flight-gallery-navbar">
                    <div className="dark-font flight-gallery-header">
                        Available Flights
                    </div>
                </div>
                <div className="flights-container">
                    {searchedFlights.map(flight => (
                        <FlightCard key={flight.id} flight={flight} mass={mass} travelClass={travelClass} num={num} price={price} showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} setSelectedTransaction={setSelectedTransaction} setSelectedBooking={setSelectedBooking} setSelectedFlight={setSelectedFlight} setBookingTotalPrice={setBookingTotalPrice} setSelectedSpacecraft={setSelectedSpacecraft} />
                    ))}
                </div>
            </div>
            <div className="confirmation-container">
            {showConfirmation && ( 
                <div className="confirmation-container">
                    <RideshareConfirmation mass={mass} travelClass={travelClass} num={num} price={price} transaction={selectedTransaction} booking={selectedBooking} flight={selectedFlight} bookingTotalPrice={bookingTotalPrice} spacecraft={selectedSpacecraft} />
                </div>
            )}
            </div>
        
        </>
    )
}

export default FlightGallery