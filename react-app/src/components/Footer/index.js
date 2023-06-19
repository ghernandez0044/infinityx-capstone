// Necessary imports
import React from "react";
import './Footer.css'

function Footer(){



    return (
        <footer>
            <div className="footer-font" style={{ color: 'white' }}>
                InfinityX &copy; 2023
            </div>
            <a href='https://github.com/ghernandez0044' target="_blank">
                <div className="footer-font hoverable">GitHub</div>
            </a>
             <a href='https://www.linkedin.com/in/guillermo-hernandez-32a307180/' target="_blank">
                <div className="footer-font hoverable">LinkedIn</div>
            </a>
             <a href='https://github.com/ghernandez0044/infinityx-capstone' target="_blank">
                <div className="footer-font hoverable">GitHub Project Repo</div>
            </a>
        </footer>
    )
}

export default Footer