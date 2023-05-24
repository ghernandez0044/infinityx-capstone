import React, { useState } from "react";
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
	const [ admin, setAdmin ] = useState(true)
	const [ firstName, setFirstName ] = useState(payload?.first_name || '')
	const [ lastName, setLastName ] = useState(payload?.last_name || '')
	const [ phone, setPhone ] = useState(payload?.phone || '')
	const [ passport, setPassport ] = useState(payload?.passport || 'Earthling')
	const [ profilePic, setProfilePic ] = useState(payload?.profile_pic || '')
	const [email, setEmail] = useState(payload?.email || "");
	const [username, setUsername] = useState(payload?.username || "");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [ checked, setChecked ] = useState(false)

	// Consume useModal context
	const { closeModal } = useModal();

	// Create array of passports
	const passports = ['Earthling', 'Martian', 'Uranian', 'Venitian', 'Mercurian']
	

	const handleSubmit = async (e) => {
		e.preventDefault();

		const dateString = new Date()
		const year = dateString.getFullYear()
		const month = dateString.getMonth() + 1
		const day = dateString.getDate()
		const created_at = `${year}-${month}-${day}`

		if(!edit){
			if (password === confirmPassword) {
				const data = await dispatch(signUp(username, email, password, admin, firstName, lastName, phone, passport, profilePic, created_at));
				await dispatch(createWallet())
				if (data) {
					setErrors(data);
				} else {
					closeModal();
				}
			} else {
				setErrors([
					"Confirm Password field must be the same as the Password field",
				]);
			}
		} else {
			dispatch(updateProfile({username, email, admin, "first_name": firstName, "last_name": lastName, phone, passport, "profile_pic": profilePic}, payload.id))
			closeModal()
		}

		
	};

	return (
		<div className="signup-modal-container">
			<h1 className="header-font" style={{ textAlign: 'center' }}>{!edit ? 'Create User' : 'Edit User'}</h1>
			<form className="signup-form-container" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label className='label-font'>
					Email
				</label>
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
				<input
						id='last_name'
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
				/>
				<label className='label-font'>
					Phone
				</label>
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
                {/* <option value=""></option> */}
                {passports.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                  // add a key prop here
                ))}
              </select>
			  {!edit ? (
				<>
					<label className='label-font'>
					Password
					</label>
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
				 {/* <label className='label-font'>
				 	Password
				 </label>
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
				<input
						id='password'
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
				/> */}
				{/* <label>Admin</label>
				<input id='admin' type='radio' checked={checked} value={admin} onClick={() => setChecked(!checked)} onChange={(e) => setAdmin(true)} /> */}
				{/* <button type="submit">Sign Up</button> */}
				<div onClick={handleSubmit} className="button animate">
          			<div className="hover-effect"></div>
          			<span className="signup-button-font">{!edit ? 'Create User' : 'Edit User'}</span>
       			 </div>
			</form>
		</div>
	);
}

export default SignupFormModal;