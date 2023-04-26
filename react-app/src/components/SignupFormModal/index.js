import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
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
	};

	return (
		<div className="signup-modal-container">
			<h1 style={{ textAlign: 'center' }}>Sign Up</h1>
			<form className="signup-form-container" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<label>
					Email
				</label>
				<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
				/>
				<label>
					Username
				</label>
				<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
				/>
				<label>
					Password
				</label>
				<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
				/>
				<label>
					Confirm Password
				</label>
				<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
				/>
				{/* <button type="submit">Sign Up</button> */}
				<div onClick={handleSubmit} className="button animate">
          			<div className="hover-effect"></div>
          			<span>Sign Up</span>
       			 </div>
			</form>
		</div>
	);
}

export default SignupFormModal;