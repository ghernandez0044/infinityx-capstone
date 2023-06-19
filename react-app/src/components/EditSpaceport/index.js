// Necessary import
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getOneSpaceport } from "../../store/spaceport"
import SpaceportForm from "../SpaceportForm"

function EditSpaceport(){
    // Extract desired parameter from params object
    const { id } = useParams()

    // Create a dispatch method
    const dispatch = useDispatch()

    // Render spaceport upon component render
    useEffect(() => {
        dispatch(getOneSpaceport(id))
    }, [dispatch, id])

    // Subscribe to single spaceport slice of state
    const spaceport = useSelector(state => state.spaceports.singleSpaceport)

    if(Object.values(spaceport).length === 0) return null


    return (
        <>
            <SpaceportForm edit={true} payload={spaceport} />
        </>
    )
}

export default EditSpaceport