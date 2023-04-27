// Necessary imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { updateSpaceport } from "../../store/spaceport";
import { createSpaceport } from "../../store/spaceport";

function SpaceportForm({ edit, payload }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume useModal context
    const { closeModal } = useModal()

    // Extract desired variable from useParams
    const { id } = useParams()

    // Create state variables
    const [ errors, setErrors ] = useState({})
    const [ backendErrors, setBackendErrors ] = useState({})
    const [ name, setName ] = useState(payload?.name || '')
    const [ description, setDescription ] = useState(payload?.description || '')
    const [ city, setCity ] = useState(payload?.city || '')
    const [ state, setState ] = useState(payload?.state || '')
    const [ lat, setLat ] = useState(payload?.lat || '')
    const [ lng, setLng ] = useState(payload?.lng || '')

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    if (!user) return <h1>User Is Not Logged In</h1>

    if(!user.admin) return <h1>User Is Not An Admin</h1>

    // Create onSubmit function
    const onSubmit = (e) => {
        e.preventDefault()

        const newSpaceport = {
            name,
            description,
            city,
            state,
            "lat": Number(lat),
            "lng": Number(lng)
        }

        console.log('created spaceport: ', newSpaceport)

        if(edit){
            dispatch(updateSpaceport(newSpaceport, id)).then(res => {
                history.push(`/spaceports/${id}`)
            }).catch(res => {
                const data = res
                if(data && data.errors) setBackendErrors(data.errors)
            })
        } else {
            dispatch(createSpaceport(newSpaceport)).then(res => {
                history.push(`/spaceports/${res.spaceport.id}`)
            }).catch(res => {
                const data = res
                if(data && data.errors) setBackendErrors(data.errors)
             })
        }
    }

    return user.admin && (
        <div className="spacecraft-form-container">
            <h1 style={{ textAlign: 'center' }}>{!edit ? 'Create A Spaceport' : 'Edit A Spaceport'}</h1>
            <form className="form" onSubmit={onSubmit}>
                <label>Name: </label>
                <input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} required ></input>
                <label>Description: </label>
                <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                <label>City: </label>
                <input id='city' type='text' value={city} onChange={(e) => setCity(e.target.value)} required ></input>
                <label>State: </label>
                <input id='state' type='text' value={state} onChange={(e) => setState(e.target.value)} required ></input>
                <label>Latitude: </label>
                <input id='latitude' type='number' value={lat} onChange={(e) => setLat(e.target.value)} required ></input>
                <label>Longitude: </label>
                <input id='longitude' type='number' value={lng} onChange={(e) => setLng(e.target.value)} required ></input>
                {/* <button type='submit'>{!edit ? 'Create Spaceport' : 'Edit Spaceport'}</button> */}
                <div onClick={onSubmit} className="button animate">
                    <div className="hover-effect"></div>
                    <span>{!edit ? 'Create Spaceport' : 'Edit Spaceport'}</span>
                </div>
            </form>
        </div>
    )
}

export default SpaceportForm