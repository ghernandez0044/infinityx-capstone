// Necessary imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllProfiles } from "../../store/profile"
import ProfileCard from "../ProfileCard"
import './ProfileGallery.css'

function ProfileGallery(){
    // Create dispatch method 
    const dispatch = useDispatch()

    // Load profiles into state on component render
    useEffect(() => {
        dispatch(getAllProfiles())
    }, [dispatch])

    // Subscribe to allProfiles slice of state
    const allProfiles = useSelector(state => Object.values(state.profiles.allProfiles))

    return (
        <div className="profile-gallery-container">
            {allProfiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
            ))}
        </div>
    )
}

export default ProfileGallery