// Necessary Imports
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import './LandingPage.css'
import SectionALandingPage from '../SectionALandingPage'
import { getApod } from '../../store/api'
import GalleryCard from '../GalleryCard'



function LandingPage(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Fetch API calls upon component render
    // useEffect(() => {
    //     dispatch(getApod())
    // }, [dispatch])

    // Subscribe to apod api slice of state
    // const apod = useSelector(state => state.api)

    return (
        <div className='whole-content-container'>
            <GalleryCard smallTag='Welcome' bigTag='An Intergalactic Hub' buttonText='Explore' destination='landing' />
        </div>
    )
}

export default LandingPage