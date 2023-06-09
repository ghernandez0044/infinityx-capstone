// Type Variables
const LOAD_BOOKINGS = "bookings/loadBookings"
const LOAD_BOOKING = "bookings/loadBooking"
const CREATE_BOOKING = "bookings/createBooking"

// Action Creators
export const actionLoadBookings = (bookings) => {
    return {
        type: LOAD_BOOKINGS,
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