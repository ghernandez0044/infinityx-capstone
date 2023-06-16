// Necessary imports
import React from "react";
import { NavLink } from "react-router-dom";
import './Footer.css'

function Footer(){



    return (
        <footer>
            {/* <div style={{ color: '#aaa' }}>
                InfinityX &copy; 2023
            </div> */}
            <div className="footer-font" style={{ color: 'white' }}>
                InfinityX &copy; 2023
            </div>
            <a href='https://github.com/ghernandez0044' target="_blank">
                {/* <i className="fa-brands fa-github fa-xl" /> */}
                <div className="footer-font hoverable">GitHub</div>
            </a>
             <a href='https://www.linkedin.com/in/guillermo-hernandez-32a307180/' target="_blank">
                {/* <i className="fa-brands fa-linkedin fa-xl" /> */}
                <div className="footer-font hoverable">LinkedIn</div>
            </a>
             <a href='https://github.com/ghernandez0044/infinityx-capstone' target="_blank">
                {/* <i className="fa-brands fa-linkedin fa-xl" /> */}
                <div className="footer-font hoverable">GitHub Project Repo</div>
            </a>
        </footer>
    )
}

export default Footer