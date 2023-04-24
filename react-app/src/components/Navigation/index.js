import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/logo-black.png'
import './Navigation.css';

function Navigation({ isLoaded }){
	// Subscribe to current user slice of state
	const sessionUser = useSelector(state => state.session.user);

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

	return (
		<div className='navigation-container'>
			<div className='home-container'>
				<NavLink exact to="/">
				<img src={logo} alt='' style={{ height: '75px', width: '75px' }} />
				</NavLink>
			</div>
			<div className='tabs-container'>
				<div className='hoverable' onClick={redirectSpacecraft}>Spacecraft</div>
				<div className='hoverable' onClick={redirectSpaceport}>Spaceports</div>
				<div className='hoverable' onClick={redirectPlanet}>Planets</div>
			</div>
			{isLoaded && (
				<div className='profile-button-container'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;