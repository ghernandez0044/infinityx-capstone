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
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ name, setName ] = useState(payload?.name || '')
    const [ description, setDescription ] = useState(payload?.description || '')
    const [ city, setCity ] = useState(payload?.city || '')
    const [ state, setState ] = useState(payload?.state || '')
    const [ lat, setLat ] = useState(payload?.lat || '')
    const [ lng, setLng ] = useState(payload?.lng || '')

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    // Function to reset all fields on form
    const reset = () => {
        setErrors({})
        setBackendErrors({})
        setName('')
        setDescription('')
        setCity('')
        setState('')
        setLat('')
        setLng('')
    }

    // Check for validation errors on form inputs
    useEffect(() => {
        const validationErrors = {}

        if(name.length === 0) validationErrors.nameErr = 'Name is required'
        if(name.length > 255) validationErrors.nameErr = 'Name must be less than 255 characters'
        if(city.length === 0) validationErrors.cityErr = 'City is required'
        if(state.length === 0) validationErrors.stateErr = 'State is required'
        if(lat > 90 || lat < 0) validationErrors.latErr = 'Latitude must be between 0 and 90 degrees'
        if(lat.toString().length === 0) validationErrors.latErr = 'Latitude is required'
        if(lng > 180 || lng < -180) validationErrors.lngErr = 'Longitude must be between -180 and 180 degrees'
        if(lng.toString().length === 0) validationErrors.lngErr = 'Longitude is required'

        setErrors(validationErrors)
    }, [ name, description, city, state, lat, lng ])

    // Create onSubmit function
    const onSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        if(Object.keys(errors).length === 0){
            const newSpaceport = {
                name,
                description,
                city,
                state,
                "lat": Number(lat),
                "lng": Number(lng)
            }
    
            // If the edit flag is true, run the edit dispatch instead of the create dispatch
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
    }

    if (!user) return <h1>User Is Not Logged In</h1>

    if(!user.admin) return <h1>User Is Not An Admin</h1>

    return user.admin && (
        <div className="spacecraft-form-container">
            <h1 style={{ textAlign: 'center' }}>{!edit ? 'Create A Spaceport' : 'Edit A Spaceport'}</h1>
            <form className="form" onSubmit={onSubmit}>
                <label>Name: </label>
                {isSubmitted && errors.nameErr && ( <div className='label-font spacecraft-errors'>{errors.nameErr}</div> )}
                <input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} required placeholder="Required"></input>
                <label>Description: </label>
                <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Required"></textarea>
                <label>City: </label>
                {isSubmitted && errors.cityErr && ( <div className='label-font spacecraft-errors'>{errors.cityErr}</div> )}
                <input id='city' type='text' value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Required"></input>
                <label>State: </label>
                {isSubmitted && errors.stateErr && ( <div className='label-font spacecraft-errors'>{errors.stateErr}</div> )}
                <input id='state' type='text' value={state} onChange={(e) => setState(e.target.value)} required placeholder="Required"></input>
                <label>Latitude: </label>
                {isSubmitted && errors.latErr && ( <div className='label-font spacecraft-errors'>{errors.latErr}</div> )}
                <input id='latitude' type='number' value={lat} onChange={(e) => setLat(e.target.value)} ></input>
                <label>Longitude: </label>
                {isSubmitted && errors.lngErr && ( <div className='label-font spacecraft-errors'>{errors.lngErr}</div> )}
                <input id='longitude' type='number' value={lng} onChange={(e) => setLng(e.target.value)} ></input>
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