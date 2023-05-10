// Necessary imports
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getOneProfile } from '../../store/profile'
import TransactionCard from '../TransactionCard'
import './ProfilePage.css'

function ProfilePage(){
    // Extract desired parameter from params object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Render profile upon component render
    useEffect(() => {
        dispatch(getOneProfile(id))
    }, [dispatch, id])

    // Function to share profile
    const share = () => {
        console.log('share function')
    }

    // Function to redirect to edit profile page
    const editProfile = () => {
        console.log('edit profile function')
    }

    // Subscribe to single profile slice of state
    const profile = useSelector(state => state.profiles.singleProfile)
    
    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)
    
    // Check to see if current user owns profile
    const currentUserProfile = user?.id === profile.id

    console.log('transactions: ', profile?.transactions)
        
    if(Object.values(profile).length === 0) return null

    return (
        <div className='profile-page-container'>
            <div className='main-content-container'>
                <div className='profile-pic-container'>
                    <img style={{ height: '175px', width: '175px', borderRadius: '50%' }} src={profile.profile_pic} alt='' />
                </div>
                <div className='big-content-font'>{profile.first_name}, {profile.last_name}</div>
                <div className='small-content-font'>@{profile.username}</div>
                <div className='profile-buttons-container'>
                    <div onClick={share} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="signup-button-font">Share</span>
                    </div>
                    <div onClick={editProfile} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="signup-button-font">Edit Profile</span>
                    </div>
                </div>
                <div className='passport-font'>{profile.passport}</div>
            </div>
            <div className='middle-content-container'>
                <div className='profile-tabs-container'>
                    <div className='hoverable middle-header-font'>Membership</div>
                    <div className='hoverable middle-header-font'>Flights</div>
                </div>
                <div className='icons-container'>
                    <i className='fa-solid fa-bars' />
                    <i className='fa-solid fa-plus' />
                </div>
            </div>
            <div className='bottom-content-container'>
                <div className='wallet-header-container'>
                    <div>Wallet</div>
                    <div>Address: {profile?.wallet[0]?.address}</div>
                    <div>Funds: ${profile?.wallet[0]?.funds}</div>
                </div>
                <div className='transactions-container'>
                    <div style={{textAlign: 'center' }}>Transactions</div>
                    {profile?.transactions?.map(transaction => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage