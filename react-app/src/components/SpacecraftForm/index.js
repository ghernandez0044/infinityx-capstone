// Necessary imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createSpacecraft, updateSpacecraft } from "../../store/spacecraft";
import './SpacecraftForm.css'

function SpacecraftForm({ edit, payload }){
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
    const [ model, setModel ] = useState(payload?.model || '')
    const [ year, setYear ] = useState(payload?.year || '')
    const [ loadCapacity, setLoadCapacity ] = useState(payload?.load_capacity_kg || '')
    const [ description, setDescription ] = useState(payload?.description || '')
    const [ height, setHeight ] = useState(payload?.height_m || '')
    const [ diameter, setDiameter ] = useState(payload?.diameter_m || '')
    const [ mass, setMass ] = useState(payload?.mass_kg || '')
    const [ capsuleVolume, setCapsuleVolume ] = useState(payload?.capsule_volume_m || '')
    const [ trunkVolume, setTrunkVolume ] = useState(payload?.trunk_volume_m || '')

    // Function to reset all fields on form
    const reset = () => {
        setErrors({})
        setBackendErrors({})
        setModel('')
        setYear('')
        setLoadCapacity('')
        setDescription('')
        setHeight('')
        setDiameter('')
        setMass('')
        setCapsuleVolume('')
        setTrunkVolume('')
    }

     // Check for validation errors on form inputs
     useEffect(() => {
        const validationErrors = {}

        if(model.length > 255) validationErrors.modelErr = 'Model must be less than 255 characters'
        if(model.length <= 0) validationErrors.modelErr = 'Model is required'
        if(year < 2015 || year > 2200) validationErrors.yearErr = 'Year must be between 2015 and 2200'
        if(year.toString().length === 0) validationErrors.yearErr = 'Year is required'
        if(description.length === 0) validationErrors.descriptionErr = 'Description is required'
        if(loadCapacity > 250000 || loadCapacity < 2000) validationErrors.loadCapacityErr = "Load Capacity must be between 2,000 and 250,000 kg"
        if(loadCapacity.toString().length === 0) validationErrors.loadCapacityErr = 'Load Capacity is required'
        if(height > 200 || height < 1) validationErrors.heightErr = 'Height must be between 1 and 200 m'
        if(height.toString().length === 0) validationErrors.heightErr = 'Height is required'
        if(diameter > 100 || diameter < 1) validationErrors.diameterErr = 'Diameter must be between 1 and 100 m'
        if(diameter.toString().length === 0) validationErrors.diameterErr = 'Diameter is required'
        if(mass > 10000000 || mass < 10) validationErrors.massErr = "Mass must be between 10 and 10,000,000 kg"
        if(mass.toString().length === 0) validationErrors.massErr = 'Mass is required'
        if(capsuleVolume > 100 || capsuleVolume < 1) validationErrors.capsuleVolumeErr = 'Capsule Volume must be between 1 and 100 m'
        if(capsuleVolume.toString().length === 0) validationErrors.capsuleVolumeErr = 'Capsule Volume is required'
        if(trunkVolume > 100 || trunkVolume < 10) validationErrors.trunkVolumeErr = 'Trunk Volume must be between 10 and 100 m'
        if(trunkVolume.toString().length === 0) validationErrors.trunkVolumeErr = 'Trunk Volume is required'

        setErrors(validationErrors)
    }, [ model, year, loadCapacity, description, height, diameter, mass, capsuleVolume, trunkVolume ])

    // Subscribe to current user slice of state
    const user = useSelector(state => state.session.user)

    if(!user) return <h1>User Is Not Logged In</h1>

    if(!user.admin) return <h1>User Is Not An Admin</h1>

    // Function to generate a spacecraft that meets all data validations
    const validSpacecraft = () => {
        setModel('SpaceshipX-2323')
        setYear(2023)
        setDescription('A small description about this SpaceshipX-2323 Model roocketship')
        setLoadCapacity(100000)
        setHeight(20)
        setDiameter(16)
        setMass(2000000)
        setCapsuleVolume(12)
        setTrunkVolume(12)
    }

    // Function to generate a spacecraft that does not meet all data validations
    const invalidSpacecraft = () => {
        setModel('Invalid Spaceship')
        setYear(1999)
        setDescription('A small description')
        setLoadCapacity(300000)
        setHeight(300)
        setDiameter(120)
        setMass(20000000)
        setCapsuleVolume(150)
        setTrunkVolume(150)
    }

    // Create onSubmit function
    const onSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitted(true)

        if(Object.keys(errors).length === 0){
            const payload = {
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
    
            // If the edit flag is true, run the edit dispatch instead of the create dispatch
            if(edit){
                dispatch(updateSpacecraft(payload, id)).then(res => {
                    setIsSubmitted(false)
                    reset()
                    history.push(`/spacecrafts/${res.spacecraft.id}`)
                }).catch(res => {
                    const data = res
                    if(data && data.errors) setBackendErrors(data.errors)
                 })
            } else {
                dispatch(createSpacecraft(payload)).then(res => { 
                    setIsSubmitted(false)
                    reset()
                    history.push(`/spacecrafts/${res.spacecraft.id}`)
                 }).catch(res => {
                    const data = res
                    if(data && data.errors){
                        setBackendErrors(data.errors)
                    } 
                 })
            }
        }
    }


    return user.admin && (
        <div className="spacecraft-form-container">
            <h1 className="header-font form-header" style={{ textAlign: 'center' }}>{!edit ? 'Create A Spacecraft' : 'Edit A Spacecraft'}</h1>
            <form className="form" onSubmit={onSubmit}>
                {/* <ul>
					{backendErrors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
                <div>
                    <p className='form-paragraph-font'>
                        Write Model, Year, and a short description for this spacecraft
                    </p>
                </div>
                <div className="first-info-container width">
                    <div>
                        <label className='label-font size'>Model </label>
                        <br/>
                        {isSubmitted && errors.modelErr && ( <div className='label-font spacecraft-errors'>{errors.modelErr}</div> )}
                        <input id='model' type='text' value={model} onChange={(e) => setModel(e.target.value)} required placeholder="Required">
                        </input>
                    </div>
                    <div>
                        <label className='label-font size'>Year </label>
                        <br/>
                        {isSubmitted && errors.yearErr && ( <div className='label-font spacecraft-errors'>{errors.yearErr}</div> )}
                        <input id='year' type='number' value={year} onChange={(e) => setYear(e.target.value)} required placeholder="Required">
                        </input>
                    </div>
                    <div>
                        <label className='label-font size'>Description </label>
                        <br/>
                        {isSubmitted && errors.descriptionErr && ( <div className='label-font spacecraft-errors'>{errors.descriptionErr}</div> )}
                        <textarea id='description' value={description} onChange={(e) => setDescription(e.target.value)} required placeholder="Required">
                        </textarea>
                    </div>
                </div>
                <div className="load-capacity-container width">
                    <div>
                        <p className='form-paragraph-font'>
                            Add Load Capacity for this Spacecraft in Kilograms within the range between 2,000 and 250,000 kg
                        </p>
                    </div>
                    <label className='label-font size'>Load Capacity In Kilograms </label>
                    <br/>
                    {isSubmitted && errors.loadCapacityErr && ( <div className='label-font spacecraft-errors'>{errors.loadCapacityErr}</div> )}
                    <input id='load_capacity_kg' type='number' value={loadCapacity} onChange={(e) => setLoadCapacity(e.target.value)} required placeholder="Required">
                    </input>
                </div>
                <div className="spacecraft-height-container width">
                    <div>
                        <p className='form-paragraph-font'>
                            Add Height for this Spacecraft within the range between 1 and 200 meters
                        </p>
                    </div>
                    <label className='label-font size'>Height In Meters </label>
                    <br/>
                    {isSubmitted && errors.heightErr && ( <div className='label-font spacecraft-errors'>{errors.heightErr}</div> )}
                    <input id='height_m' type='number' value={height} onChange={(e) => setHeight(e.target.value)} required placeholder="Required">
                    </input>
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className='form-paragraph-font'>
                            Add Diameter for this Spacecraft within the range between 1 and 100 meters
                        </p>
                    </div>
                    <label className='label-font size'>Diameter In Meters </label>
                    <br/>
                    {isSubmitted && errors.diameterErr && ( <div className='label-font spacecraft-errors'>{errors.diameterErr}</div> )}
                    <input id='diameter_m' type='number' value={diameter} onChange={(e) => setDiameter(e.target.value)} required placeholder="Required">
                    </input>
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className='form-paragraph-font'>
                            Add Mass for this Spacecraft within the range 10 and 10,000,000 kilograms
                        </p>
                    </div>
                    <label className='label-font size'>Mass In Kilograms </label>
                    <br/>
                    {isSubmitted && errors.massErr && ( <div className='label-font spacecraft-errors'>{errors.massErr}</div> )}
                    <input id='mass_kg' type='number' value={mass} onChange={(e) => setMass(e.target.value)} required placeholder="Required">
                    </input>
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className='form-paragraph-font'>
                            Add Capsule Volume for this Spacecraft within the range between 1 and 100 meters
                        </p>
                    </div>
                    <label className='label-font size'>Capsule Volume In Meters Squared </label>
                    <br/>
                    {isSubmitted && errors.capsuleVolumeErr && ( <div className='label-font spacecraft-errors'>{errors.capsuleVolumeErr}</div> )}
                    <input id='capsule_volume_kg' type='number' value={capsuleVolume} onChange={(e) => setCapsuleVolume(e.target.value)} required placeholder="Required">
                    </input>
                </div>
                <div className="spacecraft-diameter-container width">
                    <div>
                        <p className='form-paragraph-font'>
                            Add Trunk Volume for this Spacecraft within the range between 1 and 100 meters
                        </p>
                    </div>
                    <label className='label-font size'>Trunk Volume In Meters Squared </label>
                    <br/>
                    {isSubmitted && errors.trunkVolumeErr && ( <div className='label-font spacecraft-errors'>{errors.trunkVolumeErr}</div> )}
                    <input id='trunk_volume_m' type='number' value={trunkVolume} onChange={(e) => setTrunkVolume(e.target.value)} required placeholder="Required">
                    </input>
                </div>
                {/* <button type='submit'>{!edit ? 'Create Spacecraft' : 'Edit Spacecraft'}</button> */}
                <div className="spacecraft-diameter-container">
                    <div onClick={onSubmit} className="button animate">
                        <div className="hover-effect"></div>
                        <span className="signup-button-font">{!edit ? 'Create Spacecraft' : 'Edit Spacecraft'}</span>
                    </div>
                </div>
                <div className="spacecraft-generators-container">
                    <div id='valid-spacecraft' className="hoverable" onClick={validSpacecraft}>Generate Valid Spacecraft</div>
                    <div id='invalid-spacecraft' className="hoverable" onClick={invalidSpacecraft}>Generate Invalid Spacecraft</div>
                </div>
            </form>
        </div>
    )
}

export default SpacecraftForm