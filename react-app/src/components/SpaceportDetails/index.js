// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getOneSpaceport } from "../../store/spaceport";
import { deleteSpaceport } from "../../store/spaceport";
import OpenModalButton from "../OpenModalButton";
import Confirmation from "../Confirmation";
import './SpaceportDetails.css'

function SpaceportDetails(){
    // Extract parameter from useParams object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume useModal contex
    const { closeModal } = useModal()

    // Load spaceport upon component render
    useEffect(() => {
        dispatch(getOneSpaceport(id))
    }, [dispatch, id])

    // Subscribe to single spaceport slice of state
    const spaceport = useSelector(state => state.spaceports.singleSpaceport)

    console.log('spaceport: ', spaceport)

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    // Function to redirect to edit page
    const redirect = () => {
        history.push(`/spaceports/${id}/edit`)
    }

    // Function to delete spaceport
    const deleteFunction = () => {
        dispatch(deleteSpaceport(id))
        closeModal()
        history.push('/spaceports')
    }

    console.log('user: ', user)


    return (
        <div className="grid-container">
            <div id="spaceport-image" className="spacecraft-details-img-container">
                <img style={{ height: '90%', width: '90%' }} src="https://cdn.pixabay.com/photo/2012/11/28/10/35/launch-pad-67645_1280.jpg" alt='' />
            </div>
            <div id="spaceport-content-container" className="content-container">
                <div>Name: {spaceport.name}</div>
                <div>Location: {spaceport.city}, {spaceport.state}</div>
                <div>Description: {spaceport.description}</div>
                <div>Latitude: {spaceport.lat}</div>
                <div>Longitude: {spaceport.lng}</div>
            </div>
            {user?.admin && (
                <div id="spaceport-manage-buttons" className="manage-buttons">
                    {/* <button onClick={redirect}>Edit</button> */}
                    <div onClick={redirect} className="button animate">
                        <div className="hover-effect"></div>
                        <span>Edit</span>
                    </div>
                    <OpenModalButton modalComponent={<Confirmation label='Delete Spaceport' message='Are You Sure You Want To Delete?' onYes={deleteFunction} yesLabel='Delete' noLabel='Keep' onNo={() => closeModal()} />} buttonText='Delete' />
                </div>
            )}
        </div>
    )
}

export default SpaceportDetails