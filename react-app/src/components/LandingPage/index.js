// Necessary Imports
import React from 'react'
import './LandingPage.css'
import starryBackground from './—Pngtree—brush universe starry surreal_6227069.png'
import astronaut from './—Pngtree—astronaut space planet_5407098.png'
import globe from '../../assets/favpng_earth-outer-space-information-meteor-shower.png'
import nebula from '../../assets/orion-nebula-ga5f10a568_1920.jpg'
import SectionALandingPage from '../SectionALandingPage'



function LandingPage(){



    return (
        <div className='whole-content-container'>
            <div className='header-section'>
                <img src={nebula} alt='' className='background-image' />
                <img src={globe} alt='' className='foreground-image' />
                <h1 className='title'>Welcome To InfinityX</h1>
            </div>
            <div className='landing-text'>
            InfinityX, a SpaceX and Southwest Airlines/jetBlue Airlines clone, is a website for users to book spacecraft flights for inter and multi - planetary travel where this will also serve as a social hub for members who participate or are interested in such travels
            </div>
            <SectionALandingPage />
        </div>
    )
}

export default LandingPage