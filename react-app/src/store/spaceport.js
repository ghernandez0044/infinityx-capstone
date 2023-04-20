// Necessary imports
import { normalizingData } from "./spacecraft"

// Type Variables
const LOAD_SPACEPORTS = "spaceports/loadSpaceports"
const LOAD_SPACEPORT = "spaceports/loadSpaceport"
const CREATE_SPACEPORT = "spaceports/createSpaceport"
const UPDATE_SPACEPORT = "spaceports/updateSpaceport"
const DELETE_SPACEPORT = "spaceports/deleteSpaceport"

// Action Creators
export const actionLoadSpaceports = (spaceports) => {
    return {
        type: LOAD_SPACEPORTS,
        spaceports
    }
}

export const actionLoadSpaceport = (spaceport) => {
    return {
        type: LOAD_SPACEPORT,
        spaceport
    }
}

export const actionCreateSpaceport = (spaceport) => {
    return {
        type: CREATE_SPACEPORT,
        spaceport
    }
}

export const actionUpdateSpaceport = (spaceport) => {
    return {
        type: UPDATE_SPACEPORT,
        spaceport
    }
}

export const actionDeleteSpaceport = (spaceportId) => {
    return {
        type: DELETE_SPACEPORT,
        spaceportId
    }
}

// Thunks
export const getAllSpaceport = () => async (dispatch) => {
    const res = await fetch('/api/spaceports')

    if(res.ok){
        const spaceports = await res.json()
        dispatch(actionLoadSpaceports(spaceports))
        return spaceports
    }
    return res
}

export const getOneSpaceport = (id) => async (dispatch) => {
    const res = await fetch(`/api/spaceports/${id}`)
    if(res.ok){
        const spaceport = await res.json()
        dispatch(actionLoadSpaceport(spaceport))
        return spaceport
    }
    return res
}

export const createSpaceport = (spaceport) => async (dispatch) => {
    const res = await fetch('/api/spaceports/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spaceport)
    })
    if(res.ok){
        const spaceport = await res.json()
        dispatch(actionCreateSpaceport(spaceport))
        return spaceport
    }
    return res
}

export const updateSpaceport = (spaceport, id) => async (dispatch) => {
    const res = await fetch(`/api/spaceports/${Number(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spaceport)
    })
    if(res.ok){
        const updatedSpaceport = await res.json()
        dispatch(actionUpdateSpaceport(spaceport))
        return updatedSpaceport
    }
    return res
}

export const deleteSpaceport = (spaceportId) => async (dispatch) => {
    const res = await fetch(`/api/spaceports/${spaceportId}`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(actionDeleteSpaceport(spaceportId))
    }
    return res
}

// Initial State
const initialState = {
    allSpaceports: {},
    singleSpaceport: {}
}

// Reducer
const spaceportReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_SPACEPORTS:
            const spaceports = normalizingData(action.spaceports)
            newState.allSpaceports = {...spaceports}
            return newState
        case LOAD_SPACEPORT:
            return {...state, singleSpaceport: {...action.spaceport}}
        case CREATE_SPACEPORT:
            return {...state, allSpaceports: {...state.allSpaceports, [action.spaceport.id]: action.spaceport}}
        case UPDATE_SPACEPORT:
            return {...state, allSpaceports: {...state.allSpaceports, [action.spaceport.id]: action.spaceport}}
        case DELETE_SPACEPORT:
            delete newState.allSpaceports[action.id]
            return newState
        default:
            return state
    }
}

export default spaceportReducer