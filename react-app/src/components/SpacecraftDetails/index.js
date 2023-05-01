// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneSpacecraft } from "../../store/spacecraft";
import { useModal } from "../../context/Modal";
import { deleteSpacecraft } from "../../store/spacecraft";
import OpenModalButton from "../OpenModalButton";
import Confirmation from "../Confirmation";
import './SpacecraftDetails.css'

function SpacecraftDetails(){
    // extract parameter from useParams object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume useModal context
    const { closeModal } = useModal()

    // Load spacecraft upon component render
    useEffect(() => {
        dispatch(getOneSpacecraft(id))
    }, [dispatch, id])

    // Subscribe to single spaceport slice of state
    const spacecraft = useSelector(state => state.spacecrafts.singleSpacecraft)

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    // Function to redirect to edit page
    const redirect = () => {
        history.push(`/spacecrafts/${id}/edit`)
    }

    // Function to delete spacecraft
    const deleteFunction = () => {
        dispatch(deleteSpacecraft(id))
        closeModal()
        history.push('/spacecrafts')
    }

    console.log('user: ', user)

    return spacecraft && (
        <div className="grid-container">
            <div id='spacecraft-image' className="spacecraft-details-img-container">
                <img style={{ height: '90%', width: '90%' }} src="https://cdn.pixabay.com/photo/2012/11/28/11/28/rocket-launch-67723_1280.jpg" alt='' />
            </div>
            <div id='content-container' className="content-container">
                <div className="details-model-container">Model: {spacecraft.model}</div>
                <div className="details-year-container">Year: {spacecraft.year}</div>
                <div className="details-description-container">Description: {spacecraft.description}</div>
                <div className="details-height-container">Height: {spacecraft.height_m} meters</div>
                <div className="details-diameter-container">Diameter: {spacecraft.diameter_m} meters</div>
                <div className="details-mass-container">Mass: {spacecraft.mass_kg} kg</div>
                <div className="details-load-container">Load Capacity: {spacecraft.load_capacity_kg} kg</div>
                <div className="details-capsule-container">Capsule Volume: {spacecraft.capsule_volume_m} m^2</div>
                <div className="details-trunk-container">Trunk Volume: {spacecraft.trunk_volume_m} m^2</div>
            </div>
            {user?.admin && (
                <div id='manage-buttons' className="manage-buttons">
                    {/* <button onClick={redirect}>Edit</button> */}
                    <div onClick={redirect} className="button animate">
                        <div className="hover-effect"></div>
                        <span>Edit</span>
                    </div>
                    <OpenModalButton modalComponent={<Confirmation label='Delete Spacecraft' message='Are You Sure You Want To Delete?' onYes={deleteFunction} yesLabel='Delete' noLabel='Keep' onNo={() => closeModal()} />} buttonText='Delete' />
                </div>
            )}
        </div>
    )
}

export default SpacecraftDetails