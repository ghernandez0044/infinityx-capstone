// Type Variables
const LOAD_FLIGHTS = "flights/loadFlights"
const LOAD_FLIGHT = "flights/loadFlight"
const SEARCH_FLIGHTS = "flights/searchFlights"
const CREATE_FLIGHT = "flights/createFlight"
const DELETE_FLIGHT = "flights/deleteFlight"

// Action Creators
export const actionLoadFlights = (flights) => {
    return {
        type: LOAD_FLIGHTS,
        flights
    }
}

export const actionLoadFlight = (flight) => {
    return {
        type: LOAD_FLIGHT,
        flight
    }
}

export const actionSearchFlights = (flights) => {
    return {
        type: SEARCH_FLIGHTS,
        flights
    }
}