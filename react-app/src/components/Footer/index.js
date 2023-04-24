// Necessary imports
import React from "react";
import { NavLink } from "react-router-dom";
import './Footer.css'

function Footer(){



    return (
        <footer>
            <div style={{ color: '#aaa' }}>
                InfinityX &copy; 2022
            </div>
            <NavLink exact to='https://github.com/ghernandez0044'>
                <i className="fa-brands fa-github fa-xl" />
            </NavLink>
            <NavLink exact to='https://www.linkedin.com/in/guillermo-hernandez-32a307180/'>
                <i className="fa-brands fa-linkedin fa-xl" />
            </NavLink>
        </footer>
    )
}

export default Footer