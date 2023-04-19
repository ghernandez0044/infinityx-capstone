// Necessary imports
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './SpacecraftCard.css'

function SpacecraftCard({ spacecraft }){
    // Create a dispatch method
    const dispatch = useDispatch()


    return (
        <div className="spacecraft-card-container">
            <div>{spacecraft.model}</div>
            <div>{spacecraft.description}</div>
        </div>
    )
}

export default SpacecraftCard