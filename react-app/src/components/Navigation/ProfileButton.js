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
    if(set) setter(false)
    if(!set) setter(true)

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
    setter(false)
	}

  // Function to redirect to Spaceport gallery
	const redirectSpaceportGallery = () => {
		history.push('/spaceports')
    setter(false)
	}

  // Function to redirect to Planet gallery
	const redirectPlanetGallery = () => {
		history.push('/planets')
    setter(false)
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

  // Function to redirect to user profile page
  const redirectUserPage = () => {
    history.push(`/users/${user.id}`)
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
            <div className="dropdown-menu-font">Username: {user.username}</div>
            <div className="dropdown-menu-font">Email: {user.email}</div>
            <div onClick={redirectUserPage} className="pointer">
              <i className="fa-solid fa-user-astronaut" />
            </div>
            {user.admin && ( <div className="pointer dropdown-menu-font" onClick={redirectSpacecraft}>Create A Spacecraft</div> )}
            {user.admin && ( <div className="pointer dropdown-menu-font" onClick={redirectSpaceport}>Create A Spaceport</div> )}
            {user.admin && ( <div className="pointer dropdown-menu-font" onClick={redirectPlanet}>Create A Planet</div> )}
            <div onClick={redirectSpacecraftGallery} className="mobile-menu pointer dropdown-menu-font">Spacecrafts</div>
            <div onClick={redirectSpaceportGallery} className="mobile-menu pointer dropdown-menu-font">Spaceports</div>
            <div onClick={redirectPlanetGallery} className="mobile-menu pointer dropdown-menu-font">Planets</div>
            <div className="mobile-menu pointer dropdown-menu-font">Rideshare</div>
            <div>
              {/* <button onClick={handleLogout}>Log Out</button> */}
              <div onClick={handleLogout} className="button animate">
                <div className="hover-effect"></div>
                <span className="signup-button-font">Log Out</span>
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
