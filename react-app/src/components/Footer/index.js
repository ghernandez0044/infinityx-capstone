// Necessary imports
import React from "react";
import { NavLink } from "react-router-dom";
import './Footer.css'

function Footer(){



    return (
        <footer>
            <div style={{ color: '#aaa' }}>
                InfinityX &copy; 2023
            </div>
            <a href='https://github.com/ghernandez0044' target="_blank">
                <i className="fa-brands fa-github fa-xl" />
            </a>
             <a href='https://www.linkedin.com/in/guillermo-hernandez-32a307180/' target="_blank">
                <i className="fa-brands fa-linkedin fa-xl" />
            </a>
            {/* <div>
                Image by <a href="https://pixabay.com/users/wikiimages-1897/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=67724">WikiImages</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=67724">Pixabay</a>

            </div>
            <div>
            Image by <a href="https://pixabay.com/users/wikiimages-1897/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=67643">WikiImages</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=67643">Pixabay</a>
            </div> */}
            {/* <div>
            Image by <a href="https://pixabay.com/users/qimono-1962238/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1365995">Arek Socha</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1365995">Pixabay</a>
            </div> */}
            {/* <div>
            Image by <a href="https://pixabay.com/users/spacex-imagery-885857/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=693236">SpaceX-Imagery</a> from <a href="https://pixabay.com//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=693236">Pixabay</a>
            </div> */}
        </footer>
    )
}

export default Footer