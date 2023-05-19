import './MembershipCard.css'


function MembershipCard({ membership, profile }){


    return (
        <div className="membership-card-container">
            <div className='membership-header-container'>
                <div className="membership-image-container">
                    <img style={{ height: '75px', width: '75px', borderRadius: '5px' }} src={profile.profile_pic} alt='' />
                </div>
                <div className='membership-card-content-container'>
                    <div>Account Number: {membership.account_no}</div>
                    <div>Points: {membership.points.toLocaleString()}</div>
                </div>
            </div>
            <div className='membership-profile-content-container'>
                <div>Phone Number: {profile.phone}</div>
                <div>Transactions: {profile.transactions.length}</div>
                <div>Planet Comments: {profile.planet_comments.length}</div>
            </div>
        </div>
    )
}

export default MembershipCard