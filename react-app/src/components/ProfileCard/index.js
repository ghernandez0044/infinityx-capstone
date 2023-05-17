import { useHistory } from 'react-router-dom'
import './ProfileCard.css'

function ProfileCard({ profile }){
    // Create history method
    const history = useHistory()

    // Function to redirect to user profile
    const onClick = () => {
        history.push(`/users/${profile.id}`)
    }

    return (
        <div className='profile-card-container'>
            <div className='profile-card-image-container'>
                <img style={{ height: '75px', width: '75px', borderRadius: '5px' }} src={profile.profile_pic} alt='' />
            </div>
            <div className='profile-card-passport-container'>{profile.passport}</div>
            <div className='profile-card-button-container'>
                <div onClick={onClick} className="button animate">
          			<div className="hover-effect"></div>
          			<span className="signup-button-font">See More</span>
       			 </div>
            </div>
        </div>
    )
}

export default ProfileCard