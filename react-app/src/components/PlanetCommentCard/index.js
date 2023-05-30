// Necessary imports
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { getAllProfiles } from "../../store/profile";
import { deletePlanetComment, getOnePlanetComment } from "../../store/planetComments";
import OpenModalIcon from "../OpenModalIcon";
import Confirmation from "../Confirmation";
import PlanetCommentForm from "../PlanetCommentForm";
import './PlanetCommentCard.css'

function PlanetCommentCard({ comment }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume useModal context for desired function
    const { closeModal } = useModal()

    // Load user information
    useEffect(() => {
       dispatch(getAllProfiles())
    }, [dispatch])

    // Subscribe to all profiles slice of state
    const profiles = useSelector(state => state.profiles.allProfiles)
    const user = profiles[comment.user_id]

    // Subscribe to current user slice of state
    const currentUser = useSelector(state => state.session.user)

    // Check to see if current user own planet comment
    const userPlanetComment = currentUser?.id === comment.user_id ? true : false

    // Function to redirect to profile page
    const redirectProfile = () => {
        history.push(`/users/${comment.user_id}`)
    }

    // Function to delete planet comment
    const onYes = () => {
        dispatch(deletePlanetComment(comment.id)).then(res => {
            dispatch(getOnePlanetComment(comment.planet_id))
        })
        closeModal()
    }

    return (
        <div className="planet-comment-card-container">
            <div className="user-info">
                <div onClick={redirectProfile} className="pointer">
                    <img style={{ height: '45px', widht: '45px', borderRadius: '15px' }} src={user?.profile_pic} alt='' />
                </div>
                <div onClick={redirectProfile} className="small-content-font pointer">@{user?.username}</div>
                <div className="passport-font">{user?.passport}</div>
                {userPlanetComment && ( 
                    <div className="delete-icon pointer">
                        {/* <i className="fa-solid fa-trash" /> */}
                        <OpenModalIcon modalComponent={<Confirmation label='Delete Comment' message='Are you sure you want to delete this comment?' onYes={onYes} onNo={() => closeModal()} yesLabel='Delete' noLabel='Keep' />} icon='fa-solid fa-trash' />
                    </div>
                 )}
                {userPlanetComment && ( 
                    <div className="pen-icon pointer">
                        {/* <i className="fa-solid fa-pen" /> */}
                        <OpenModalIcon modalComponent={<PlanetCommentForm comment={comment} />} icon='fa-solid fa-pen' />
                    </div>
                 )}
            </div>
            <div className="comment-info">
                <div className="dropdown-menu-font">{comment.content}</div>
            </div>
        </div>
    )
}

export default PlanetCommentCard