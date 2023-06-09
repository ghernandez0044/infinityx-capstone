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