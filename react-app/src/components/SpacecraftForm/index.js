// Necessary imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createSpacecraft, updateSpacecraft } from "../../store/spacecraft";
import { getOneSpacecraft } from "../../store/spacecraft";
import Confirmation from "../Confirmation";
import './SpacecraftForm.css'

function SpacecraftForm({ edit, payload }){
    // Create dipatch method
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
    const [ model, setModel ] = useState(payload?.model || '')
    const [ year, setYear ] = useState(payload?.year || '')
    const [ loadCapacity, setLoadCapacity ] = useState(payload?.load_capacity_kg || '')
    const [ description, setDescription ] = useState(payload?.description || '')
    const [ height, setHeight ] = useState(payload?.height_m || '')
    const [ diameter, setDiameter ] = useState(payload?.diameter_m || '')
    const [ mass, setMass ] = useState(payload?.mass_kg || '')
    const [ capsuleVolume, setCapsuleVolume ] = useState(payload?.capsule_volume_m || '')
    const [ trunkVolume, setTrunkVolume ] = useState(payload?.trunk_volume_m || '')

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    if(!user) return <h1>User Is Not Logged In</h1>

    if(!user.admin) return <h1>User Is Not An Admin</h1>

    // Create onSubmit function
    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            "user_id": user.id,
            model,
            "year": Number(year),
            "load_capacity_kg": Number(loadCapacity),
            description,
            "height_m": Number(height),
            "diameter_m": Number(diameter),
            "mass_kg": Number(mass),
            "capsule_volume_m": Number(capsuleVolume),
            "trunk_volume_m": Number(trunkVolume)
        }

        console.log("created spacecraft: ", payload)

        // If the edit flag is true, run the edit dispatch instead of the create dispatch
        if(edit){
            console.log('inside the edit block')
            console.log('payload: ', payload)
            console.log('id inside spacecraft form edit: ', id)
            dispatch(updateSpacecraft(payload, id)).then(res => {
                history.push(`/spacecrafts/${res.spacecraft.id}`)
            }).catch(res => {
                const data = res
                if(data && data.errors) setBackendErrors(data.errors)
             })
        } else {
            dispatch(createSpacecraft(payload)).then(res => { 
                history.push(`/spacecrafts/${res.spacecraft.id}`)
             }).catch(res => {
                const data = res
                if(data && data.errors) setBackendErrors(data.errors)
             })
        }

    }


    return user.admin && (
        <div className="spacecraft-form-container">
            <h1 style={{ textAlign: 'center' }}>{!edit ? 'Create A Spacecraft' : 'Edit A Spacecraft'}</h1>
            <form className="form" onSubmit={onSubmit}>
                <label>Model: </label>
                <input id='model' type='text' value={model} onChange={(e) => setModel(e.target.value)} required>
                </input>
                <label>Year: </label>
                <input id='year' type='number' value={year} onChange={(e) => setYear(e.target.value)} required>
                </input>
                <label>Load Capacity In Kilograms: </label>
                <input id='load_capacity_kg' type='number' value={loadCapacity} onChange={(e) => setLoadCapacity(e.target.value)} required>
                </input>
                <label>Description: </label>
                <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} required>
                </textarea>
                <label>Height In Meters: </label>
                <input id='height_m' type='number' value={height} onChange={(e) => setHeight(e.target.value)} required>
                </input>
                <label>Diameter In Meters: </label>
                <input id='diameter_m' type='number' value={diameter} onChange={(e) => setDiameter(e.target.value)} required>
                </input>
                <label>Mass In Kilograms: </label>
                <input id='mass_kg' type='number' value={mass} onChange={(e) => setMass(e.target.value)} required>
                </input>
                <label>Capsule Volume In Meters Squared: </label>
                <input id='capsule_volume_kg' type='number' value={capsuleVolume} onChange={(e) => setCapsuleVolume(e.target.value)} required>
                </input>
                <label>Trunk Volume In Meters Squared: </label>
                <input id='trunk_volume_m' type='number' value={trunkVolume} onChange={(e) => setTrunkVolume(e.target.value)} required>
                </input>
                <button type='submit'>{!edit ? 'Create Spacecraft' : 'Edit Spacecraft'}</button>
            </form>
        </div>
    )
}

export default SpacecraftForm