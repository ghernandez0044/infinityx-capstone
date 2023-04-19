// Necessary imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";

import './SpacecraftForm.css'

function SpacecraftForm(){
    // Create dipatch method
    const dipatch = useDispatch()
    
    // Create history method
    const history = useHistory()

    // Consume useModal context
    const { closeModal } = useModal()

    // Create state variables
    const [ errors, setErrors ] = useState({})
    const [ model, setModel ] = useState('')
    const [ year, setYear ] = useState(0)
    const [ loadCapacity, setLoadCapacity ] = useState(0)
    const [ description, setDescription ] = useState('')
    const [ height, setHeight ] = useState(0)
    const [ diameter, setDiameter ] = useState(0)
    const [ mass, setMass ] = useState(0)
    const [ capsuleVolume, setCapsuleVolume ] = useState(0)
    const [ trunkVolume, setTrunkVolume ] = useState(0)

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
            year,
            "load_capacity_kg": loadCapacity,
            description,
            "height_m": height,
            "diameter_m": diameter,
            "mass_kg": mass,
            "capsule_volume_m": capsuleVolume,
            "trunk_volume_m": trunkVolume
        }

        console.log("created spacecraft: ", payload)

    }


    return (
        <div className="spacecraft-form-container">
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
                <button type='submit'>Create Spacecraft</button>
            </form>
        </div>
    )
}

export default SpacecraftForm