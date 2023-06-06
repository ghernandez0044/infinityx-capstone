// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import './FlightGallery.css'

function FlightGallery({ orbit, earlyDate, mass, travelClass, price }){


    return (
        <div className="flight-gallery-container">
            <div className="flight-gallery-navbar">
                <div className="dark-font flight-gallery-header">
                    Available Flights
                </div>
            </div>
        </div>
    )
}

export default FlightGallery