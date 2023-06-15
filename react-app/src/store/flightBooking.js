// Type Variables
const LOAD_FLIGHT_BOOKING = "flightBookings/loadFlightBooking"
const CREATE_FLIGHT_BOOKING = "flightBookings/createFlightBooking"

// Action Creators
export const actionLoadFlightBooking = (flightBooking) => {
    return {
        type: LOAD_FLIGHT_BOOKING,
        flightBooking
    }
}

export const actionCreateFlightBooking = (flightBooking) => {
    return {
        type: CREATE_FLIGHT_BOOKING,
        flightBooking
    }
}

// Initial State
const initialState = {
    currentFlightBooking: {}
}

