// Necessary imports
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProfiles } from "../../store/profile";
import './PlanetCommentCard.css'

function PlanetCommentCard({ comment }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Load user information
    useEffect(() => {
       dispatch(getAllProfiles())
    }, [dispatch])

    // Subscribe to all profiles slice of state
    const profiles = useSelector(state => state.profiles.allProfiles)
    const user = profiles[comment.user_id]

    // Function to redirect to profile page
    const redirectProfile = () => {
        history.push(`/users/${comment.user_id}`)
    }

    return (
        <div className="planet-comment-card-container">
            <div className="user-info">
                <div onClick={redirectProfile} className="pointer">
                    <img style={{ height: '45px', widht: '45px', borderRadius: '15px' }} src={user?.profile_pic} alt='' />
                </div>
                <div onClick={redirectProfile} className="pointer">@{user?.username}</div>
                <div>{user?.passport}</div>
            </div>
            <div className="comment-info">
                <div>{comment.content}</div>
            </div>
        </div>
    )
}

export default PlanetCommentCard