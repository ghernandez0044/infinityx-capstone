// Necessary imports
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPlanets } from '../../store/planet'
import './Rideshare.css'

function Rideshare(){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create state variables
    const [ orbit, setOrbit ] = useState('')
    const [ userKg, setUserKg ] = useState('')
    const [ earliestDate, setEarliestDate ] = useState('')

    // Load planets into redux store upon component render
    useEffect(() => {
        dispatch(getAllPlanets())
    }, [dispatch])

    // Subscribe to planets slice of state
    const planets = useSelector(state => Object.values(state.planets.allPlanets))

    const planetsArray = Array.from(planets, planet => planet.name)

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
                        <label>Earliest Date</label>
                        <input id='earliest-date' type='date' value={earliestDate} onChange={(e) => setEarliestDate(e.target.value)} required />
                    </div>
                    <div>
                        <label>Payload Mass in Kg</label>
                        <input id='user_kg' type='number' value={userKg} onChange={(e) => setUserKg(e.target.value)} required />
                    </div>
                    <div>
                        <label>Flight Class</label>
                    </div>
                    <div>
                        <div>Estimated Price</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rideshare