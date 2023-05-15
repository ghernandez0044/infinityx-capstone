// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllProfiles } from "../../store/profile"
import './PlanetGallery.css'

function ProfileGallery(){
    // Create dispatch method 
    const dispatch = useDispatch()

    // Load profiles into state on component render
    useEffect(() => {
        dispatch(getAllProfiles())
    }, [dispatch])

    const allProfiles = useSelector(state => state.profiles.allProfiles)

    console.log('allProfiles: ', allProfiles)

    return (
        <div className="">
            null
        </div>
    )
}

export default ProfileGallery