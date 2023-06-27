import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { createWallet } from "../../store/wallet";
import { updateProfile } from "../../store/profile";
import "./SignupForm.css";

function SignupFormModal({ edit, payload }) {
	// Create dispatch method
	const dispatch = useDispatch();

	// Create state variables
	const [ admin, setAdmin ] = useState(false)
	const [ firstName, setFirstName ] = useState(payload?.first_name || '')
	const [ lastName, setLastName ] = useState(payload?.last_name || '')
	const [ phone, setPhone ] = useState(payload?.phone || '')
	const [ passport, setPassport ] = useState(payload?.passport || 'Earthling')
	const [ profilePic, setProfilePic ] = useState(payload?.profile_pic || '')
	const [email, setEmail] = useState(payload?.email || "");
	const [username, setUsername] = useState(payload?.username || "");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [ backendErrors, setBackendErrors ] = useState({})
	const [ isSubmitted, setIsSubmitted ] = useState(false)
	const [ isRadioButtonSelected, setIsRadioButtonSelected ] = useState(false)

	// Consume useModal context
	const { closeModal } = useModal();

	// Create array of passports
	const passports = ['Earthling', 'Martian', 'Uranian', 'Venitian', 'Mercurian']

	// Create array of type of users
	const types = ['', 'Regular', 'Admin']

	// Function to reset all fields on form
	const reset = () => {
		setAdmin(false)
		setFirstName('')
		setLastName('')
		setPhone('')
		setPassport('Earthling')
		setProfilePic('')
		setEmail('')
		setUsername('')
		setPassword('')
		setConfirmPassword('')
		setErrors([])
		setBackendErrors({})
	}

	// Check for validation errors on form inputs
	useEffect(() => {
		const validationErrors = {}

		if(firstName.length <= 0) validationErrors.firstNameErr = 'First Name is required'
		if(lastName.length <= 0) validationErrors.lastNameErr = 'Last Name is required'
		if(phone.length <= 0) validationErrors.phoneErr = 'Phone is required'
		if(passport.length <= 0) validationErrors.passportErr = 'Passport is required'
		if(profilePic.length <= 0) validationErrors.profilePicErr = 'Profile picture is required'
		if(email.length <= 0) validationErrors.emailErr = 'Email is required'
		if(!email.includes('@')) validationErrors.emailInvalidErr = 'Email must be valid'
		if(!email.includes('.com')) validationErrors.emailInvalidErr = 'Email must be valid'
		if(username.length <= 0) validationErrors.usernameErr = 'Username is required'
		if(password.length <= 0) validationErrors.passwordErr = 'Password is required'
		if(confirmPassword.length <= 0) validationErrors.confirmPasswordErr = 'Confirm password is required'

		setErrors(validationErrors)

	}, [admin, firstName, lastName, phone, passport, profilePic, email, username, password, confirmPassword])
	

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsSubmitted(true)

		const dateString = new Date()
		const year = dateString.getFullYear()
		const month = dateString.getMonth() + 1
		const day = dateString.getDate()
		const created_at = `${year}-${month}-${day}`

		if(Object.values(errors).length === 0){
			if(!edit){
				if (password === confirmPassword) {
					dispatch(signUp(username, email, password, admin, firstName, lastName, phone, passport, profilePic, created_at)).then(res => dispatch(createWallet())).then(res => {
						closeModal()
						reset()
					}).catch(async error => {
						const errObj = {}
						const formattedError = error.json()
						console.log('error: ', formattedError)
					})


					

				} else {
					const errors = {}
					errors.passwordMatchErr = 'Confirm Password field must be the same as the Password field'
					setErrors(errors)
				}
			} else {
				dispatch(updateProfile({username, email, admin, "first_name": firstName, "last_name": lastName, phone, passport, "profile_pic": profilePic}, payload.id)).then(res => {
					closeModal()
				})
			}
		} else {
			return
		}
	};

	return (
		<div className="signup-modal-container">
			<h1 className="header-font" style={{ textAlign: 'center', fontSize: '44px' }}>{!edit ? 'Create User' : 'Edit User'}</h1>
			<form className="signup-form-container" onSubmit={handleSubmit}>
				{/* <div>
					{backendErrors?.errors}
				</div> */}
				<div className="first-section-container">
					<label className='label-font'>
						Email
					</label>
					<br/>
                        {isSubmitted && errors.emailErr && ( <div className='label-font spacecraft-errors'>{errors.emailErr}</div> )}
                        {isSubmitted && errors.emailInvalidErr && ( <div className='label-font spacecraft-errors'>{errors.emailInvalidErr}</div> )}
					<input
							id='email'
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
					/>
					<label className='label-font'>
						Username
					</label>
					<br/>
                        {isSubmitted && errors.usernameErr && ( <div className='label-font spacecraft-errors'>{errors.usernameErr}</div> )}
					<input
							id='username'
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
					/>
					<label className='label-font'>
						First Name
					</label>
					<br/>
                        {isSubmitted && errors.firstNameErr && ( <div className='label-font spacecraft-errors'>{errors.firstNameErr}</div> )}
					<input
							id='first_name'
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
					/>
					<label className='label-font'>
						Last Name
					</label>
					<br/>
                        {isSubmitted && errors.lastNameErr && ( <div className='label-font spacecraft-errors'>{errors.lastNameErr}</div> )}
					<input
							id='last_name'
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
					/>
				</div>
				<div className="second-section-container">
					<label className='label-font'>
						Phone
					</label>
					<br/>
                        {isSubmitted && errors.phoneErr && ( <div className='label-font spacecraft-errors'>{errors.phoneErr}</div> )}
					<input
							id='phone'
							type="text"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
					/>
					<label className='label-font'>
						Profile Picture
					</label>
					<br/>
                        {isSubmitted && errors.profilePicErr && ( <div className='label-font spacecraft-errors'>{errors.profilePicErr}</div> )}
					<input
							id='profile_pic'
							type="text"
							value={profilePic}
							onChange={(e) => setProfilePic(e.target.value)}
							required
					/>
				<label className='label-font'>Choose A Passport </label>
				<select
					id="passport"
					onChange={(e) => {
					setPassport(e.target.value);
					}}
					value={passport}
					name="passport"
					placeholder="Choose A Passport"
				>
					{passports.map((c) => (
					<option value={c} key={c}>
						{c}
					</option>
					))}
				</select>
				</div>
				<div className="third-section-container">
				{!edit ? (
					<>
						<label className='label-font'>
						Password
						</label>
						<br/>
                        {isSubmitted && errors.passwordErr && ( <div className='label-font spacecraft-errors'>{errors.passwordErr}</div> )}
						<input
							id='password'
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label className='label-font'>
						Confirm Password
						</label>
						<br/>
                        {isSubmitted && errors.confirmPasswordErr && ( <div className='label-font spacecraft-errors'>{errors.confirmPasswordErr}</div> )}
						{isSubmitted && errors.passwordMatchErr && ( <div className='label-font spacecraft-errors'>{errors.passwordMatchErr}</div> )}
						<input
							id='password'
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</>
				) : ( 
					<>
					</>
				)}
				</div>
				{!edit ? ( 
					<div className="fourth-section-container">
						<label className='label-font'>Choose A User Type</label>
						<br/>
                        {isSubmitted && !isRadioButtonSelected && ( <div className='label-font spacecraft-errors'>User Type Must Be Selected</div> )}
						<div>
							<label>Admin</label>
							<input type="radio" id="admin" name="user-type" value={true} onChange={(e) => {
								setAdmin(true)
								setIsRadioButtonSelected(true)
							}} />
						</div>
						<div>
							<label>Regular</label>
							<input type="radio" id="admin" name="user-type" value={false} onChange={(e) => {
								setAdmin(false)
								setIsRadioButtonSelected(true)
							}} />
						</div>
					</div>
				 ) : (
					<>
					</>
				 )}
				
			</form>
			<div style={{ margin: '25px auto', width: '500px' }} onClick={handleSubmit} className="button animate">
          		<div className="hover-effect"></div>
          		<span className="signup-button-font">{!edit ? 'Create User' : 'Edit User'}</span>
       		</div>
		</div>
	);
}

export default SignupFormModal;