// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllSpaceport } from "../../store/spaceport"
import SpaceportCard from "../SpaceportCard"
import './SpaceportGallery.css'

function SpaceportGallery(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load spaceports into state on component render
    useEffect(() => {
        dispatch(getAllSpaceport())
    }, [dispatch])

    // Subscribe to the allSpaceports slice of state
    const spaceports = useSelector(state => Object.values(state.spaceports.allSpaceports))

    console.log('spaceports: ', spaceports)

    
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Spaceport Gallery</h1>
            <div className="spacecraft-gallery-container">
                {spaceports.map(spaceport => (
                    <SpaceportCard key={spaceport.id} spaceport={spaceport} />
                ))}
            </div>
        </div>
    )
}

export default SpaceportGallery