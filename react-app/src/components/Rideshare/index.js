// Necessary imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPlanets } from '../../store/planet'
import { getAllTravelClasses } from '../../store/travelClass'
import './Rideshare.css'

function Rideshare(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variables
    const [ orbit, setOrbit ] = useState('')
    const [ userKg, setUserKg ] = useState('')
    const [ earliestDate, setEarliestDate ] = useState('')
    const [ travelClass, setTravelClass ] = useState('Base Class')
    const [ num, setNum ] = useState(0)
    const [ errors, setErrors ] = useState({})

    // Load planets into redux store upon component render
    useEffect(() => {
        dispatch(getAllPlanets())
        dispatch(getAllTravelClasses())
    }, [dispatch])

    useEffect(() => {
        if(travelClass === 'Base Class') setNum(6250)
        if(travelClass === 'Cruise Class') setNum(7250)
        if(travelClass === 'Launch Class') setNum(9250)
    }, [userKg, travelClass, num])

    useEffect(() => {
        let errors = {}
        if(userKg.length <= 0) errors.userKgErr = 'Payload Mass Required'
        setErrors(errors)
    }, [userKg])

    // Subscribe to planets slice of state
    const planets = useSelector(state => Object.values(state.planets.allPlanets))

    const planetsArray = Array.from(planets, planet => planet.name)

    // Subcribe to travel classes slice of state
    const travelClasses = useSelector(state => Object.values(state.travelClasses.allTravelClasses))

    const travelClassesArray = Array.from(travelClasses, travelClass => travelClass.name)

    // Function to redirect to available flights page
    const redirectAvailableFlights = (e) => {
        e.preventDefault()
        const payload = {
            userKg,
            earliestDate,
            travelClass,
            orbit
        }
        console.log('payload: ', payload)
    }

    return planets && (
        <div>
            <div className='rideshare-container'>
                <div className='rideshare-content-container'>
                    <div className='header-font rideshare-header'>Intergalactic Rideshare Program</div>
                    <div className='small-content-font'>Dedicated Rideshare Missions as Low as $275k*. Search Flights Below.</div>
                </div>
                <div className='rideshare-dropdowns-container'>
                    <div>
                        <label className='label-font'>Desired Orbit</label>
                        <select id='orbit' onChange={(e) => setOrbit(e.target.value)} value={orbit} name='orbit' placeholder='Choose An Orbit'>
                        {planetsArray.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <label className='label-font'>Earliest Date</label>
                        <input id='earliest-date' type='date' value={earliestDate} onChange={(e) => setEarliestDate(e.target.value)} required />
                    </div>
                    <div>
                        <label className='label-font'>Payload Mass in Kg</label>
                        <input id='user_kg' type='number' value={userKg} onChange={(e) => setUserKg(e.target.value)} required />
                    </div>
                    <div>
                        <label className='label-font'>Travel Class</label>
                        <select id='travel_class' onChange={(e) => setTravelClass(e.target.value)} value={travelClass} name='travel_class' placeholder='Choose A Travel Class'>
                        {travelClassesArray.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <div className='content-font'>Estimated Price</div>
                        <div>${(userKg * num).toLocaleString()}</div>
                    </div>
                    <div className={Object.values(errors).length > 0 ? 'hidden' : ''}>
                        <div onClick={redirectAvailableFlights} className="button animate resize">
                            <div className="hover-effect"></div>
                            <i className='fa-solid fa-arrow-right fa-2xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rideshare