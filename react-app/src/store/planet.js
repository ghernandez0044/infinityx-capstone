// Necessary imports
import { normalizingData } from "./spacecraft"

// Type Variables
const LOAD_PLANETS = "planets/loadPlanets"
const LOAD_PLANET = "planets/loadPlanet"
const CREATE_PLANET = "planets/createPlanet"
const UPDATE_PLANET = "planets/updatePlanet"
const DELETE_PLANET = "planets/deletePlanet"

// Action Creators
export const actionLoadPlanets = (planets) => {
    return {
        type: LOAD_PLANETS,
        planets
    }
}

export const actionLoadPlanet = (planet) => {
    return {
        type: LOAD_PLANET,
        planet
    }
}

export const actionCreatePlanet = (planet) => {
    return {
        type: CREATE_PLANET,
        planet
    }
}

export const actionUpdatePlanet = (planet) => {
    return {
        type: UPDATE_PLANET,
        planet
    }
}

export const actionDeletePlanet = (planetId) => {
    return {
        type: DELETE_PLANET,
        planetId
    }
}

// Thunks
export const getAllPlanets = () => async (dispatch) => {
    const res = await fetch('/api/planets')

    if(res.ok){
        const planets = await res.json()
        dispatch(actionLoadPlanets(planets))
        return planets
    }
    return res
}

export const getOnePlanet = (id) => async (dispatch) => {
    const res = await fetch(`/api/planets/${id}`)
    if(res.ok){
        const planet = await res.json()
        dispatch(actionLoadPlanet(planet))
        return planet
    }
    return res
}

export const createPlanet = (planet) => async (dispatch) => {
    const res = await fetch('/api/spacecrafts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planet)
    })
    if(res.ok){
        const planet = await res.json()
        dispatch(actionCreatePlanet(planet))
        return planet
    }
    return res
}

export const updatePlanet = (planet, id) => async (dispatch) => {
    const res = await fetch(`/api/planets/${Number(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planet)
    })
    if(res.ok){
        const updatedPlanet = await res.json()
        dispatch(actionUpdatePlanet(updatedPlanet))
        return updatedPlanet
    }
    return res
}

export const deletePlanet = (planetId) => async (dispatch) => {
    const res = await fetch(`/api/planets/${planetId}`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(actionDeletePlanet(planetId))
    }
    return res
}

// Initial State
const initialState = {
    allPlanets: {},
    singlePlanet: {}
}

// Reducer
const planetReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_PLANETS:
            const planets = normalizingData(action.planets)
            newState.allPlanets = {...planets}
            return newState
        case LOAD_PLANET:
            return {...state, singlePlanet: {...action.planet}}
        case CREATE_PLANET:
            return {...state, allPlanets: {...state.allPlanets, [action.planet.id]: action.planet}}
        case UPDATE_PLANET:
            return {...state, allPlanets: {...state.allPlanets, [action.planet.id]: action.planet}}
        case DELETE_PLANET:
            delete newState.allPlanets[action.id]
            return newState
        default:
            return state
    }
}

export default planetReducer