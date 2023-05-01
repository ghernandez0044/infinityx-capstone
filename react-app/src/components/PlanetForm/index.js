// Necessary imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createPlanet, updatePlanet } from "../../store/planet";

function PlanetForm({ edit, payload }){
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
    const [ distance, setDistance ] = useState(payload?.distance_from_earth_km || '')
    const [ mass, setMass ] = useState(payload?.mass_measured_in_earths || '')
    const [ volume, setVolume ] = useState(payload?.volume_measured_in_earths || '')
    const [ density, setDensity ] = useState(payload?.mean_density_in_g_cm_cubed || '')
    const [ gravity, setGravity ] = useState(payload?.surface_gravity_in_m_squared || '')
    const [ velocity, setVelocity ] = useState(payload?.escape_velocity_in_km_per_sec || '')
    const [ synodic, setSynodic ] = useState(payload?.synodic_rotation_period_in_days || '')
    const [ temperature, setTemperature ] = useState(payload?.temperature_in_k || '')

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    if(!user) return <h1>User Is Not Logged In</h1>

    if(!user.admin) return <h1>User Is Not An Admin</h1>

    // Create onSubmit function
    const onSubmit = (e) => {
        e.preventDefault()

        const payload = {
            name,
            description,
            "distance_from_earth_km": Number(distance),
            "mass_measured_in_earths": Number(mass),
            "volume_measured_in_earths": Number(volume),
            "mean_density_in_g_cm_cubed": Number(density),
            "surface_gravity_in_m_squared": Number(gravity),
            "escape_velocity_in_km_per_sec": Number(velocity),
            "synodic_rotation_period_in_days": Number(synodic),
            "temperature_in_k": Number(temperature)
        }

        // If the edit flag is true, run the edit dispatch, if it is false, run the create dispatch
        if(edit){
            console.log('edit block is running')
            dispatch(updatePlanet(payload, id)).then(res => {
                history.push(`/planets/${id}`)
            }).catch(res => {
                const data = res
                if(data && data.errors) setBackendErrors(data.errors)
            })
        } else {
            dispatch(createPlanet(payload)).then(res => {
                history.push(`/planets/${res.planet.id}`)
            }).catch(res => {
                const data = res
                if(data && data.errors) setBackendErrors(data.errors)
             })
        }
    }



    return user.admin && (
        <div className="spacecraft-form-container">
            <h1 style={{ textAlign: 'center' }}>{!edit ? 'Create A Planet' : 'Edit A Planet'}</h1>
            <form className="form" onSubmit={onSubmit}>
                <label>Name: </label>
                <input id='model' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                <label>Description: </label>
                <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} required />
                <label>Distance From Earth: </label>
                <input id='distance_from_earth_km' type='number' value={distance} onChange={(e) => setDistance(e.target.value)} required />
                <label>Mass (Measured In Earths): </label>
                <input id='mass_measured_in_earths' type='number' value={mass} onChange={(e) => setMass(e.target.value)} required />
                <label>Volume (Measured In Earths): </label>
                <input id='volume_measured_in_earths' type='number' value={volume} onChange={(e) => setVolume(e.target.value)} required />
                <label>Mean Density (Measured In Grams Per Centimeter Cubed): </label>
                <input id='mean_density_in_g_cm_cubed' type='number' value={density} onChange={(e) => setDensity(e.target.value)} required />
                <label>Surface Gravity (Measured In Meters Cubed): </label>
                <input id='surface_gravity_in_m_squared' type='number' value={gravity} onChange={(e) => setGravity(e.target.value)} required />
                <label>Escape Velocity (Measured In Kilo): </label>
                <input id='surface_gravity_in_m_squared' type='number' value={velocity} onChange={(e) => setVelocity(e.target.value)} required />
                <label>Synodic Rotation (Measured In Days): </label>
                <input id='synodic_rotation_period_in_days' type='number' value={synodic} onChange={(e) => setSynodic(e.target.value)} required />
                <label>Average Temperature (Measured In Kalvin): </label>
                <input id='temperature_in_k' type='number' value={temperature} onChange={(e) => setTemperature(e.target.value)} required />
                {/* <button type='submit'>{!edit ? 'Create Planet' : 'Edit Planet'}</button> */}
                <div onClick={onSubmit} className="button animate">
                    <div className="hover-effect"></div>
                    <span>{!edit ? 'Create Planet' : 'Edit Planet'}</span>
                </div>
            </form>
        </div>
    )
}

export default PlanetForm