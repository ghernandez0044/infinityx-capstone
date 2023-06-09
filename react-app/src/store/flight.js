import { normalizingData } from "./spacecraft"

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

// Thunks
export const getAllFlights = () => async (dispatch) => {
    const res = await fetch('/api/flights')
    if(res.ok){
        const flights = await res.json()
        dispatch(actionLoadFlights(flights))
        return flights
    }
    return res
}

export const getOneFlight = (id) => async (dispatch) => {
    const res = await fetch(`/api/flights/${id}`)
    if(res.ok){
        const flight = await res.json()
        dispatch(actionLoadFlight(flight))
        return flight
    }
    return res
}

export const searchFlights = (payload) => async (dispatch) => {
    const res = await fetch('/api/flights/search', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if(res.ok){
        const searched_flights = await res.json()
        dispatch(actionSearchFlights(searched_flights))
        return searched_flights
    }
    return res
}

// Initial State
const initialState = {
    allFlights: {},
    singleFlight: {},
    searchedFlights: {}
}

// Reducer
const flightReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_FLIGHTS:
            const flights = normalizingData(action.flights)
            newState.allFlights = {...flights}
            return newState
        case LOAD_FLIGHT:
            return {...state, singleFlight: {...action.flight}}
        case SEARCH_FLIGHTS:
            const searched_flights = normalizingData(action.flights)
            newState.searchedFlights = {...searched_flights}
            return newState
        default:
            return state
    }
}

export default flightReducer