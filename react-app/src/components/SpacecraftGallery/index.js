// Necessary imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllSpacecraft } from "../../store/spacecraft"
import GalleryCard from "../GalleryCard"
import './SpacecraftGallery.css'

function SpacecraftGallery(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Load spacecrafts into state on component render
    useEffect(() => {
        dispatch(getAllSpacecraft())
    }, [dispatch])

    const spacecrafts = useSelector(state => Object.values(state.spacecrafts.allSpacecraft))

    return (
        <div>
            <div className="spacecraft-gallery-container">
                {/* {spacecrafts.map(spacecraft => (
                    <SpacecraftCard key={spacecraft.id} spacecraft={spacecraft} />
                ))} */}
                {spacecrafts.map((spacecraft, i) => (
                    <GalleryCard key={spacecraft.id} smallTag='Spacecraft' bigTag={spacecraft.model} buttonText='See More' destination='spacecrafts' imageNumber={i + 1} payload={spacecraft} />
                ))}
            </div>
        </div>
    )
}

export default SpacecraftGallery