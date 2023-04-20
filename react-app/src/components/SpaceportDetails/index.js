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
        <div className="spacecraft-details-component">
            <h1 style={{ textAlign: 'center' }}>Spaceport Details</h1>
            <div className="spacecraft-details-img-container">
                <img style={{ height: '300px', width: '300px' }} src="https://media.istockphoto.com/id/1321530574/photo/nasa-building-and-antenna-at-vandenberg-space-force-base-lompoc-ca-usa.jpg?s=1024x1024&w=is&k=20&c=S6wCqzyGFEf3PK1FVUgm-MW4M1yMmV_ac6lp4V_0y3s=" alt='' />
            </div>
            <div className="content-container">
                <div>Name: {spaceport.name}</div>
                <div>Location: {spaceport.city}, {spaceport.state}</div>
                <div>Description: {spaceport.description}</div>
                <div>Latitude: {spaceport.lat}</div>
                <div>Longitude: {spaceport.lng}</div>
            </div>
        </div>
    )
}

export default SpaceportDetails