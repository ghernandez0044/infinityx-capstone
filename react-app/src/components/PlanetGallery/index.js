// Necessary imports
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllPlanets } from "../../store/planet"
import PlanetCard from "../PlanetCard"
import GalleryCard from "../GalleryCard"
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
            <div className="spacecraft-gallery-container">
                {planets.map(planet => (
                    <GalleryCard key={planet.id} smallTag='Planet' bigTag={planet.name} buttonText='Explore' destination='planets' payload={planet} />
                ))}
            </div>
        </div>
    )
}

export default PlanetGallery