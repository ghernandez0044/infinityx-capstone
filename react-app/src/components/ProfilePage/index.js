// Necessary imports
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getOneProfile } from '../../store/profile'
import { getOneWallet } from '../../store/wallet'
import { getUserBookings } from '../../store/bookings'
// import FlightGallery from '../FlightGallery'
import TransactionCard from '../TransactionCard'
import MembershipCard from '../MembershipCard'
import SignupFormModal from '../SignupFormModal'
import OpenModalButton from '../OpenModalButton'
import AddFunds from '../AddFunds'
import './ProfilePage.css'
import { getAllUserTransactions } from '../../store/transactions'

function ProfilePage(){
    // Extract desired parameter from params object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variables
    const [ membership, setMembership ] = useState(true)

    // Render profile upon component render
    useEffect(() => {
        dispatch(getOneProfile(id)).then(res => dispatch(getOneWallet(id))).then(res => dispatch(getUserBookings(id))).then(res => dispatch(getAllUserTransactions(id)))
    }, [dispatch, id])

    // Subscribe to user transactions slice of state
    const userTransactions = useSelector(state => Object.values(state.transactions.userTransactions))

    // Function to open membership gallery
    const membershipGallery = () => {
        setMembership(true)
    }

    // Function to open flights gallery
    const flightsGallery = () => {
        setMembership(false)
    }

    // Subscribe to single profile slice of state
    const profile = useSelector(state => state.profiles.singleProfile)
    
    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    // Subscribe to single wallet slice of state
    const singleWallet = useSelector(state => state.wallets.singleWallet)

    // Subscribe to user bookings slice of state
    const userBookings = useSelector(state => state.bookings.userBookings)

    // Check to see if current user owns profile
    const currentUserProfile = user?.id === profile.id
        
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
                    {currentUserProfile && (
                    <OpenModalButton modalComponent={<SignupFormModal edit={true} payload={profile} />} buttonText='Edit Profile' />
                    )}
                </div>
                <div className='passport-font'>{profile.passport}</div>
            </div>
            {/* <div className='middle-content-container'>
                <div className='profile-tabs-container'>
                    <div className='hoverable middle-header-font' onClick={membershipGallery}>Membership</div>
                    <div className='hoverable middle-header-font' onClick={flightsGallery}>Flights</div>
                </div>
                <div className='icons-container'>
                    <i className='fa-solid fa-bars' />
                    <i className='fa-solid fa-plus' />
                </div>
                {membership ? (
                    <div className='membership-content-container'>
                        <div style={{textAlign: 'center' }}>Membership</div>
                        {profile?.membership?.map(membership => (
                            <MembershipCard key={membership.id} membership={membership} profile={profile} />
                        ))}
                    </div>
                ) : (
                    <div className='bookings-content-container'>
                        <div style={{textAlign: 'center' }}>Bookings</div>
                        {userBookings.map(booking => (
                            <div>{booking.flightId}</div>
                        ))}
                    </div>
                )}
            </div> */}
                {currentUserProfile && singleWallet && (
                    <div className='bottom-content-container'>
                        <div className='wallet-header-container'>
                            <div id='wallet'>Wallet</div>
                            <div className='profile-font'>Address: {singleWallet?.address}</div>
                            <div className='profile-font'>Funds: ${singleWallet?.funds?.toLocaleString()}</div>
                            <OpenModalButton modalComponent={<AddFunds wallet={singleWallet} />} buttonText='Add Funds' />
                        </div>
                    </div>
                )}
                {currentUserProfile && userTransactions.length > 0 && (
                    <div className='transactions-container'>
                        <div style={{textAlign: 'center', fontSize: '60px', fontFamily: 'Josefin Sans', margin: '35px auto' }}>Transactions</div>
                        {userTransactions.map(transaction => (
                            <TransactionCard key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                )}
        </div>
    )
}

export default ProfilePage