// Necessary imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getAllSpaceport } from "../../store/spaceport"
import SpaceportCard from "../SpaceportCard"
import GalleryCard from "../GalleryCard"
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

    
    return (
        <div>
            <div className="spacecraft-gallery-container">
                {spaceports.map(spaceport => (
                    <GalleryCard key={spaceport.id} smallTag='Spaceport' bigTag={spaceport.name} buttonText='See More' destination='spaceports' payload={spaceport} />
                ))}
            </div>
        </div>
    )
}

export default SpaceportGallery