import { normalizingData } from "./spacecraft"

// Type Variables
const LOAD_BOOKINGS = "bookings/loadBookings"
const LOAD_BOOKING = "bookings/loadBooking"
const LOAD_USER_BOOKINGS = "bookings/loadUserBookings"
const CREATE_BOOKING = "bookings/createBooking"

// Action Creators
export const actionLoadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
        bookings
    }
}

export const actionLoadUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    }
}

export const actionLoadBooking = (booking) => {
    return {
        type: LOAD_BOOKING,
        booking
    }
}

export const actionCreateBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

// Thunks
export const getAllBookings = () => async (dispatch) => {
    const res = await fetch('/api/bookings')
    if(res.ok){
        const bookings = await res.json()
        dispatch(actionLoadBookings(bookings))
        return bookings
    }
    return res
}

export const getUserBookings = (id) => async (dispatch) => {
    const res = await fetch(`/api/${id}/bookings`)
    if(res.ok){
        const bookings = await res.json()
        dispatch(actionLoadUserBookings(bookings))
        return bookings
    }
    return res
}

export const getOneBooking = (id) => async (dispatch) => {
    const res = await fetch(`/api/bookings/${id}`)
    if(res.ok){
        const booking = await res.json()
        dispatch(actionLoadBooking(booking))
        return booking
    }
    return res
}

export const createBooking = (booking, user_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/bookings`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(booking)
    })
    if(res.ok){
        const booking = await res.json()
        dispatch(actionCreateBooking(booking))
        return booking
    }
    return res
}

// Initial State
const initialState = {
    allBookings: {},
    singleBooking: {},
    userBookings: {}
}

// Reducer
const bookingReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_BOOKINGS:
            const bookings = normalizingData(action.bookings)
            newState.allBookings = {...bookings}
            return newState
        case LOAD_USER_BOOKINGS:
            const userBookings = normalizingData(action.bookings)
            newState.userBookings = {...userBookings}
            return newState
        case LOAD_BOOKING:
            return {...state, singleBooking: {...action.booking}}
        case CREATE_BOOKING:
            return {...state, allBookings: {...state.allBookings, [action.booking.id]: action.booking}}
        default:
            return state
    }
}

export default bookingReducer