// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOnePlanet } from "../../store/planet";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import Confirmation from "../Confirmation";
import './PlanetDetails.css'

function PlanetDetails(){
    // Extract parameter from useParams object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume useModal context
    const { closeModal } = useModal()

    // Load planet upon component render
    useEffect(() => {
        dispatch(getOnePlanet(id))
    }, [dispatch, id])

    // Load planet upon component render
    const planet = useSelector(state => state.planets.singlePlanet)

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    // Function to redirect to edit page
    const redirect = () => {
        history.push(`/planets/${id}/edit`)
    }

    // Function to delete planet
    const deletePlanet = () => {
        dispatch(deletePlanet(id))
        closeModal()
        history.push('/planets')
    }

    return planet && (
        <div className="grid-container">
            <div id="planet-image" className="spacecraft-details-img-container">
                <img style={{ height: '90%', width: '90%' }} src="https://cdn.pixabay.com/photo/2017/02/08/12/46/moon-2048727_1280.jpg" alt='' />
            </div>
            <div id="planet-content-container" className="content-container">
                <div>Name: {planet.name}</div>
                <div>Description: {planet.description}</div>
                <div>Distance From Earth: {planet.distance_from_earth_km} km</div>
                <div>Mass (Measured In Earths): {planet.mass_measured_in_earths} Earths</div>
                <div>Volume (Measured In Earths): {planet.volume_measured_in_earths} Earths</div>
                <div>Mean Density (Measured In Grams Per Centimeter Cubed): {planet.mean_density_in_g_cm_cubed} g/cm^3</div>
                <div>Surface Gravity (Measured In Meters Squared): {planet.surface_gravity_in_m_squared} g/cm^3</div>
                <div>Escape Velocity (Measured In Kilometers Per Second): {planet.escape_velocity_in_km_per_sec} km/s</div>
                <div>Synodic Rotation Period (Measured In Days): {planet.synodic_rotation_period_in_days} days</div>
                <div>Average Temperature (Measured In Kalvin): {planet.temperature_in_k} K</div>
            </div>
            {user?.admin && (
                 <div id="planet-manage-buttons" className="manage-buttons">
                 {/* <button onClick={redirect}>Edit</button> */}
                 <div onClick={redirect} className="button animate">
                    <div className="hover-effect"></div>
                    <span>Edit</span>
                </div>
                 <OpenModalButton modalComponent={<Confirmation label='Delete Planet' message='Are You Sure You Want To Delete?' onYes={deletePlanet} yesLabel='Delete' noLabel='Keep' onNo={() => closeModal()} />} buttonText='Delete' />
             </div>
            )}
        </div>
    )
}

export default PlanetDetails