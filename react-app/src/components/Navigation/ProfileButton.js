import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user, set, setter }) {
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
    if(set) setter(false)
    if(!set) setter(true)
	}

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    setShow(true)
    setter(true)
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setShow(false)
        setter(false)
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu()
    setter(false)
    history.push('/')
  };

  const redirectSpacecraft = () => {
    history.push('/spacecrafts/new')
    closeMenu()
    setter(false)
  }

  // Function to redirect to Spacecraft gallery
	const redirectSpacecraftGallery = () => {
		history.push('/spacecrafts')
	}

  // Function to redirect to Spaceport gallery
	const redirectSpaceportGallery = () => {
		history.push('/spaceports')
	}

  // Function to redirect to Planet gallery
	const redirectPlanetGallery = () => {
		history.push('/planets')
	}

  const redirectSpaceport = () => {
    history.push('/spaceports/new')
    closeMenu()
    setter(false)
  }

  const redirectPlanet = () => {
    history.push('/planets/new')
    closeMenu()
    setter(false)
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
            <div onClick={redirectSpacecraftGallery} className="mobile-menu pointer">Spacecrafts</div>
            <div onClick={redirectSpaceportGallery} className="mobile-menu pointer">Spaceports</div>
            <div onClick={redirectPlanetGallery} className="mobile-menu pointer">Planets</div>
            <div className="mobile-menu pointer">Rideshare</div>
            <div>
              {/* <button onClick={handleLogout}>Log Out</button> */}
              <div onClick={handleLogout} className="button animate">
                <div className="hover-effect"></div>
                <span>Log Out</span>
              </div>
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
