import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo2 from '../../assets/logo-no-background.svg'
import './Navigation.css';

function Navigation({ isLoaded }){
	// Subscribe to current user slice of state
	const sessionUser = useSelector(state => state.session.user);

	// State variables
	const [ overlay, setOverlay ] = useState(false)

	// Create history method
	const history = useHistory()

	// Function to redirect to Spacecraft gallery
	const redirectSpacecraft = () => {
		history.push('/spacecrafts')
	}

	// Function to redirect to Spaceport gallery
	const redirectSpaceport = () => {
		history.push('/spaceports')
	}

	// Function to redirect to Planet gallery
	const redirectPlanet = () => {
		history.push('/planets')
	}

	// Function to redirect to all profiles gallery
	const redirectSpaceTravelers = () => {
		history.push('/users')
	}

	// Function to redirect to Rideshare tab
	const redirectRideshare = () => {
		history.push('/rideshare')
	}

	return (
		<div className='navigation-container'>
			{/* <div className={overlay ? 'overlay' : ''}></div> */}
			<div className='home-container'>
				<NavLink exact to="/">
				<img src={logo2} alt='' style={{ height: '75px', width: '75px' }} className='logo' />
				</NavLink>
			</div>
			<div className='tabs-container'>
				<div className='hoverable navbar-font' onClick={redirectSpacecraft}>Spacecrafts</div>
				<div className='hoverable navbar-font' onClick={redirectSpaceport}>Spaceports</div>
				<div className='hoverable navbar-font' onClick={redirectPlanet}>Planets</div>
				{/* <div className='hoverable' onClick={redirectRideshare}>Rideshare</div> */}
				{sessionUser && ( 
					<div className='hoverable navbar-font' onClick={redirectSpaceTravelers}>Space Travelers</div>
				 )}
				{sessionUser && ( 
					<div className='hoverable navbar-font' onClick={redirectRideshare}>Rideshare</div>
				 )}
				{/* {sessionUser && ( 
					<div className='hoverable navbar-font' onClick={redirectRideshare}>Group Chats</div>
				 )} */}
			</div>
			{isLoaded && (
				<div className='profile-button-container'>
					<ProfileButton user={sessionUser} set={overlay} setter={setOverlay} />
				</div>
			)}
		</div>
	);
}

export default Navigation;