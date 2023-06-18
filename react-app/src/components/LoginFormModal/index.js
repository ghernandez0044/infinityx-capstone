import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  // Function to log in as a demo user
  const demoLogin = () => {
    dispatch(login('demouser@aa.io', 'password'))
    closeModal()
  }

  // Function to log in as an admin user
  const adminLogin = () => {
    dispatch(login('adminuser@aa.io', 'password'))
    closeModal()
  }

  return (
    <div className="login-modal-container">
      <h1 className="header-font" style={{ textAlign: 'center', fontSize: '44px' }}>Log In</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="label-font">
          Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label className="label-font">
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {/* <button type="submit">Log In</button> */}
        <div onClick={handleSubmit} className="button animate">
          <div className="hover-effect"></div>
          <span className="signup-button-font">Log In</span>
        </div>
        <div id='demo' className="hoverable" onClick={demoLogin}>Demo User</div>
        <div id='admin' className="hoverable label-font" style={{ margin: '35px auto' }} onClick={adminLogin}>Admin User</div>
      </form>
    </div>
  );
}

export default LoginFormModal;
