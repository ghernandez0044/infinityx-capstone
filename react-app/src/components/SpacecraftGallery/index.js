// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllSpacecraft } from "../../store/spacecraft"
import SpacecraftCard from "../SpacecraftCard"
import './SpacecraftGallery.css'

function SpacecraftGallery(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load spacecrafts into state on component render
    useEffect(() => {
        dispatch(getAllSpacecraft())
    }, [dispatch])

    const spacecrafts = useSelector(state => Object.values(state.spacecrafts.allSpacecraft))

    console.log('spacecrafts: ', spacecrafts)

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Spacecraft Gallery</h1>
            <div className="spacecraft-gallery-container">
                {spacecrafts.map(spacecraft => (
                    <SpacecraftCard key={spacecraft.id} spacecraft={spacecraft} />
                ))}
            </div>
        </div>
    )
}

export default SpacecraftGallery