// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPlanets } from "../../store/planet"
import PlanetCard from "../PlanetCard"
import './PlanetGallery.css'

function PlanetGallery(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load planets into state on component render
    useEffect(() => {
        dispatch(getAllPlanets())
    }, [dispatch])

    const planets = useSelector(state => Object.values(state.planets.allPlanets))

    console.log('planets: ', planets)

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Planet Gallery</h1>
            <div className="spacecraft-gallery-container">
                {planets.map(planet => (
                    <PlanetCard key={planet.id} planet={planet} />
                ))}
            </div>
        </div>
    )
}

export default PlanetGallery