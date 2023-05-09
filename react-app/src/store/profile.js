import { normalizingData } from "./spacecraft"

// Type Variables
const LOAD_PROFILE = "profiles/loadProfile"
const LOAD_PROFILES = "profiles/loadProfiles"

// Action Creators
export const actionLoadProfile = (profile) => {
    return {
        type: LOAD_PROFILE,
        profile
    }
}

export const actionLoadProfiles = (profiles) => {
    return {
        type: LOAD_PROFILES,
        profiles
    }
}

// Thunks
export const getOneProfile = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`)
    if(res.ok){
        const profile = await res.json()
        dispatch(actionLoadProfile(profile))
        return profile
    }
    return res
}

export const getAllProfiles = () => async (dispatch) => {
    const res = await fetch('/api/users/')
    if(res.ok){
        const profiles = await res.json()
        dispatch(actionLoadProfiles(profiles))
        return profiles
    }
    return res
}

// Initial State
const initialState = {
    allProfiles: {},
    singleProfile: {}
}

// Reducer
const profileReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_PROFILES:
            console.log('LOAD_PROFILES: ', action.profiles.users)
            const profiles = normalizingData(action.profiles.users)
            newState.allProfiles = {...profiles}
            return newState
        case LOAD_PROFILE:
            newState.singleProfile = action.profile
            return newState
        default:
            return state
    }
}

export default profileReducer