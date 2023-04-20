// Necessary import
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getOneSpacecraft } from "../../store/spacecraft"
import SpacecraftForm from "../SpacecraftForm"

function EditSpacecraft(){
// Extract desired parameter from params object
const { id } = useParams()

// Create dispatch method
const dispatch = useDispatch()

// Render spacecraft upon component render
useEffect(() => {
    dispatch(getOneSpacecraft(id))
}, [dispatch, id])

// Subscribe to single spacecraft slice of state
const spacecraft = useSelector(state => state.spacecrafts.singleSpacecraft)

console.log('spacecraft to edit: ', spacecraft)

if(Object.values(spacecraft).length === 0) return null

    return (
        <>
            <SpacecraftForm edit={true} payload={spacecraft} />
        </>
    )
}

export default EditSpacecraft