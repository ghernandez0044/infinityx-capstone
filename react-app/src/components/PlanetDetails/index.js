// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOnePlanet, deletePlanet } from "../../store/planet";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import Confirmation from "../Confirmation";
import PlanetCommentGallery from "../PlanetCommentGallery";
import './PlanetDetails.css'
import { getOnePlanetComment } from "../../store/planetComments";

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
        dispatch(getOnePlanetComment(id))
    }, [dispatch, id])

    // Load planet upon component render
    const planet = useSelector(state => state.planets.singlePlanet)

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    // Subscribe to one planet comments slice of state
    const onePlanetComments = useSelector(state => state.planetComments.singlePlanetComments)

    // Function to redirect to edit page
    const redirect = () => {
        history.push(`/planets/${id}/edit`)
    }

    // Function to delete planet
    const deletePlanetFunction = () => {
        dispatch(deletePlanet(id))
        closeModal()
        history.push('/planets')
    }

    return planet && (
        <div className="planet-details-container">
            <div className="grid-container">
                <div id="planet-image" className="spacecraft-details-img-container">
                    <img style={{ height: '70%', width: '70%' }} src="https://cdn.pixabay.com/photo/2017/02/08/12/46/moon-2048727_1280.jpg" alt='' />
                </div>
                <div id="planet-content-container" className="content-container">
                    <div className="model-font">{planet.name}</div>
                    <div className="content-font description-font">{planet.description}</div>
                    <div className='content-font'>Distance From Earth: {planet.distance_from_earth_km} km</div>
                    <div className='content-font'>Mass (Measured In Earths): {planet.mass_measured_in_earths} Earths</div>
                    <div className='content-font'>Volume (Measured In Earths): {planet.volume_measured_in_earths} Earths</div>
                    <div className='content-font'>Mean Density (Measured In Grams Per Centimeter Cubed): {planet.mean_density_in_g_cm_cubed} g/cm^3</div>
                    <div className='content-font'>Surface Gravity (Measured In Meters Squared): {planet.surface_gravity_in_m_squared} m^2</div>
                    <div className='content-font'>Escape Velocity (Measured In Kilometers Per Second): {planet.escape_velocity_in_km_per_sec} km/s</div>
                    <div className='content-font'>Synodic Rotation Period (Measured In Days): {planet.synodic_rotation_period_in_days} days</div>
                    <div className='content-font'>Average Temperature (Measured In Kalvin): {planet.temperature_in_k} K</div>
                </div>
                {user?.admin && (
                    <div id="planet-manage-buttons" className="manage-buttons">
                    {/* <button onClick={redirect}>Edit</button> */}
                    <div onClick={redirect} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="signup-button-font">Edit</span>
                    </div>
                    <OpenModalButton modalComponent={<Confirmation label='Delete Planet' message='Are You Sure You Want To Delete?' onYes={deletePlanetFunction} yesLabel='Delete' noLabel='Keep' onNo={() => closeModal()} />} buttonText='Delete' />
                </div>
                )}
            </div>
            <PlanetCommentGallery />
        </div>
    )
}

export default PlanetDetails