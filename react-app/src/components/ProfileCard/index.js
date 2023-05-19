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
                <img className='pointer' onClick={onClick} style={{ height: '35px', width: '35px', borderRadius: '15px' }} src={profile.profile_pic} alt='' />
                <div onClick={onClick} className='small-content-font pointer'>@{profile.username}</div>
                <div>{profile.passport}</div>
            </div>
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