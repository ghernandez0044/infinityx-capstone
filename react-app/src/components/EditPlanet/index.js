// Necessary import
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getOnePlanet } from "../../store/planet"
import PlanetForm from '../PlanetForm'

function EditPlanet(){
    // Extract desired parameter from params object
    const { id } = useParams()

    // Create dispatch method
    const dispatch = useDispatch()

    // Render planet upon component render
    useEffect(() => {
        dispatch(getOnePlanet(id))
    }, [dispatch, id])

    // Subscribe to single planet slice of state
    const planet = useSelector(state => state.planets.singlePlanet)

    if(Object.values(planet).length === 0) return null


    return (
        <>
            <PlanetForm edit={true} payload={planet} />
        </>
    )
}

export default EditPlanet