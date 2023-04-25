import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // Create state variables
	const [ show, setShow ] = useState(false)

	let choice = ''

  if(show) choice = 'open'
	if(!show) choice = ''

  // Function to open hamburger menu
	const openHamburger = () => {
		if(show) setShow(false)
    if(!show) setShow(true)
	}

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    setShow(true)
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setShow(false)
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const redirectSpacecraft = () => {
    history.push('/spacecrafts/new')
    closeMenu()
  }

  const redirectSpaceport = () => {
    history.push('/spaceports/new')
    closeMenu()
  }

  const redirectPlanet = () => {
    history.push('/planets/new')
    closeMenu()
  }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="user-button" onClick={openMenu}>
        <div className="user-icon-container">
          {/* <i className="fa-solid fa-user-astronaut" /> */}
          <div onClick={openHamburger} className={`menu-button hamburger ${choice}`}>
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </div>
        </div>
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>Username: {user.username}</div>
            <div>Email: {user.email}</div>
            {/* {user.admin && (
              <div>
                <button onClick={redirectSpacecraft}>Create A Spacecraft</button>
                <button onClick={redirectSpaceport}>Create A Spaceport</button>
                <button onClick={redirectPlanet}>Create A Planet</button>
            </div>
            )} */}
            {user.admin && ( <div className="pointer" onClick={redirectSpacecraft}>Create A Spacecraft</div> )}
            {user.admin && ( <div className="pointer" onClick={redirectSpaceport}>Create A Spaceport</div> )}
            {user.admin && ( <div className="pointer" onClick={redirectPlanet}>Create A Planet</div> )}
            <div>
              <button onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
