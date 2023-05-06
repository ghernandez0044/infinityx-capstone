// Type Variables
const LOAD_PROFILE = "profiles/loadProfile"

// Action Creators
export const actionLoadProfile = (profile) => {
    return {
        type: LOAD_PROFILE,
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

// Initial State
const initialState = {
    singleProfile: {}
}

// Reducer
const profileReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_PROFILE:
            newState.singleProfile = action.profile
            return newState
        default:
            return state
    }
}

export default profileReducer