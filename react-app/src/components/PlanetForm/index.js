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
    const [ isSubmitted, setIsSubmitted ] = useState(false)
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

    // Function to reset all fields on form
    const reset = () => {
        setErrors({})
        setBackendErrors({})
        setName('')
        setDescription('')
        setDistance('')
        setMass('')
        setVolume('')
        setDensity('')
        setGravity('')
        setVelocity('')
        setSynodic('')
        setTemperature('')
    }

    // Check for validation errors on form inputs
    useEffect(() => {
        const validationErrors = {}

        if(name.length === 0) validationErrors.nameErr = 'Name is required'
        if(description.length === 0) validationErrors.descriptionErr = 'Description is required'
        if(distance > 100000000000 || distance < 0) validationErrors.distanceErr = 'Distance must be between 0 and 100,000,000,000 km'
        if(distance.toString().length === 0) validationErrors.distanceErr = 'Distance From Earth is required'
        if(mass > 100 || mass < 0) validationErrors.massErr = 'Mass must be between 0 and 100 Earths'
        if(mass.toString().length === 0) validationErrors.massErr = 'Mass is required'
        if(volume > 100 || volume < 0) validationErrors.volumeErr = 'Volume must be between 0 and 100 Earths'
        if(volume.toString().length === 0) validationErrors.volumeErr = 'Volume is required'
        if(density > 100 || density < 0) validationErrors.densityErr = 'Mean Density must be between 0 and 100 grams per cm cubed'
        if(density.toString().length === 0) validationErrors.densityErr = 'Mean Density is required'
        if(gravity > 100 || gravity < 0) validationErrors.gravityErr = 'Surface Gravity must be between 0 and 100 meters squared'
        if(gravity.toString().length === 0) validationErrors.gravityErr = 'Surface Gravity is required'
        if(velocity > 100 || velocity < 0) validationErrors.velocityErr = 'Escape Velocity must be between 0 and 100 kilometer per second'
        if(velocity.toString().length === 0) validationErrors.velocityErr = 'Escape Velocity is required'
        if(synodic > 365 || synodic < 0) validationErrors.synodicErr = 'Synodic Period must be between 0 and 365 days'
        if(synodic.toString().length === 0) validationErrors.synodicErr = 'Synodic Period is required'
        if(temperature > 600 || temperature < 0) validationErrors.temperatureErr = 'Temperature must be between 0 and 600 Kalvin'
        if(temperature.toString().length === 0) validationErrors.temperatureErr = 'Temperature is required'

        setErrors(validationErrors)
    }, [ name, description, distance, mass, volume, density, gravity, velocity, synodic, temperature ])

    // Function to generate a planet that meets all data validations
    const validPlanet = () => {
        setName('A Brand New Planet')
        setDescription('A small, short description regarding this new planet I have created')
        setDistance(2000000)
        setMass(12.5)
        setVolume(10)
        setDensity(15.4)
        setGravity(7.8)
        setVelocity(22.2)
        setSynodic(6)
        setTemperature(273)
    }

    // Function to generate a planet that does not meet all data validations
    const invalidPlanet = () => {
        setName('')
        setDescription('invalid planet')
        setDistance(111000000000)
        setMass(120)
        setVolume(120)
        setDensity(110)
        setGravity(150)
        setVelocity(180)
        setSynodic(400)
        setTemperature(700)
    }

    // Create onSubmit function
    const onSubmit = (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        if(Object.keys(errors).length === 0){
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
                    setIsSubmitted(false)
                    reset()
                    history.push(`/planets/${id}`)
                }).catch(res => {
                    const data = res
                    if(data && data.errors) setBackendErrors(data.errors)
                })
            } else {
                dispatch(createPlanet(payload)).then(res => {
                    setIsSubmitted(false)
                    reset()
                    history.push(`/planets/${res.planet.id}`)
                }).catch(res => {
                    const data = res
                    if(data && data.errors) setBackendErrors(data.errors)
                 })
            }
        }
    }

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    if(!user) return <h1>User Is Not Logged In</h1>

    if(!user.admin) return <h1>User Is Not An Admin</h1>

    return user.admin && (
        <div className="spacecraft-form-container">
            <h1 className="header-font form-header" style={{ textAlign: 'center' }}>{!edit ? 'Create A Planet' : 'Edit A Planet'}</h1>
            <form className="form" onSubmit={onSubmit}>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add a Name to this Planet
                        </p>
                    </div>
                    <label className="label-font size">Name </label>
                    <br/>
                    {isSubmitted && errors.nameErr && ( <div className='label-font spacecraft-errors'>{errors.nameErr}</div> )}
                    <input id='model' type='text' value={name} onChange={(e) => setName(e.target.value)} required placeholder="Required" />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add a short Description for this Planet
                        </p>
                    </div>
                    <label className="label-font size">Description </label>
                    <br/>
                    {isSubmitted && errors.descriptionErr && ( <div className='label-font spacecraft-errors'>{errors.descriptionErr}</div> )}
                    <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Required" />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add Distance From Earth for this Planet between the range of 0 and 100,000,000,000 kilometers
                        </p>
                    </div>
                    <label className="label-font size">Distance From Earth </label>
                    <br/>
                    {isSubmitted && errors.distanceErr && ( <div className='label-font spacecraft-errors'>{errors.distanceErr}</div> )}
                    <input id='distance_from_earth_km' type='number' value={distance} onChange={(e) => setDistance(e.target.value)} required placeholder="Required" />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add Mass measured in Earths for this Planet between the range of 0 and 100 Earths
                        </p>
                    </div>
                    <label className="label-font size">Mass</label>
                    <br/>
                    {isSubmitted && errors.massErr && ( <div className='label-font spacecraft-errors'>{errors.massErr}</div> )}
                    <input id='mass_measured_in_earths' type='number' value={mass} onChange={(e) => setMass(e.target.value)} />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add Volume measured in Earths for this Planet between the range of 0 and 100 Earths
                        </p>
                    </div>
                    <label className="label-font size">Volume </label>
                    <br/>
                    {isSubmitted && errors.volumeErr && ( <div className='label-font spacecraft-errors'>{errors.volumeErr}</div> )}
                    <input id='volume_measured_in_earths' type='number' value={volume} onChange={(e) => setVolume(e.target.value)} />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add Mean Density measured in Grams per Centimeter Cubed for this Planet between the range of 0 and 100 grams per cm cubed
                        </p>
                    </div>
                    <label className="label-font size">Mean Density </label>
                    <br/>
                    {isSubmitted && errors.densityErr && ( <div className='label-font spacecraft-errors'>{errors.densityErr}</div> )}
                    <input id='mean_density_in_g_cm_cubed' type='number' value={density} onChange={(e) => setDensity(e.target.value)} />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add Surface Gravity measured in Meters Squared for this Planet between the range of 0 and 100 meters squared
                        </p>
                    </div>
                    <label className="label-font size">Surface Gravity </label>
                    <br/>
                    {isSubmitted && errors.gravityErr && ( <div className='label-font spacecraft-errors'>{errors.gravityErr}</div> )}
                    <input id='surface_gravity_in_m_squared' type='number' value={gravity} onChange={(e) => setGravity(e.target.value)} />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add Escape Velocity measured in Kilometers Per Second for this Planet between the range of 0 and 100 kilometer per seconds
                        </p>
                    </div>
                    <label className="label-font size">Escape Velocity </label>
                    <br/>
                    {isSubmitted && errors.velocityErr && ( <div className='label-font spacecraft-errors'>{errors.velocityErr}</div> )}
                    <input id='surface_gravity_in_m_squared' type='number' value={velocity} onChange={(e) => setVelocity(e.target.value)} />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add Synodic Rotation measured in Earth Days for this Planet between the range of 0 and 365 days
                        </p>
                    </div>
                    <label className="label-font size">Synodic Rotation </label>
                    <br/>
                    {isSubmitted && errors.synodicErr && ( <div className='label-font spacecraft-errors'>{errors.synodicErr}</div> )}
                    <input id='synodic_rotation_period_in_days' type='number' value={synodic} onChange={(e) => setSynodic(e.target.value)} />
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className="form-paragraph-font">
                            Add Average Temperature for this Planet between the range of 0 and 600 Kalvin
                        </p>
                    </div>
                    <label className="label-font">Average Temperature </label>
                    <br/>
                    {isSubmitted && errors.temperatureErr && ( <div className='label-font spacecraft-errors'>{errors.temperatureErr}</div> )}
                    <input id='temperature_in_k' type='number' value={temperature} onChange={(e) => setTemperature(e.target.value)} />
                </div>
                {/* <button type='submit'>{!edit ? 'Create Planet' : 'Edit Planet'}</button> */}
                <div className="spacecraft-diameter-container">
                    <div onClick={onSubmit} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="signup-button-font">{!edit ? 'Create Planet' : 'Edit Planet'}</span>
                    </div>
                </div>
                <div className="spacecraft-generators-container">
                    <div id='valid-planet' className="hoverable" onClick={validPlanet}>Generate Valid Planet</div>
                    <div id='invalid-spaceport' className="hoverable" onClick={invalidPlanet}>Generate Invalid Planet</div>
                </div>
            </form>
        </div>
    )
}

export default PlanetForm