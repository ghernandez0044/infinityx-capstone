import { normalizingData } from "./spacecraft"

// Type Variables
const LOAD_PROFILE = "profiles/loadProfile"
const LOAD_PROFILES = "profiles/loadProfiles"
const UPDATE_PROFILE = "profiles/updateProfile"

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

export const actionUpdateProfile = (profile) => {
    return {
        type: UPDATE_PROFILE,
        profile
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

export const updateProfile = (profile, id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
    })
    if(res.ok){
        const updatedProfile = await res.json()
        dispatch(actionUpdateProfile(updatedProfile))
        return updatedProfile
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
            const profiles = normalizingData(action.profiles.users)
            newState.allProfiles = {...profiles}
            return newState
        case LOAD_PROFILE:
            newState.singleProfile = action.profile
            return newState
        case UPDATE_PROFILE:
            return {...state, allProfiles: {...state.allProfiles, [action.profile.id]: action.profile}}
        default:
            return state
    }
}

export default profileReducer