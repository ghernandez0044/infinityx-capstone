// Type Variables
const LOAD_SPACECRAFTS = "spacecrafts/loadSpacecrafts"
const LOAD_SPACECRAFT = "spacecrafts/loadSpacecraft"
const CREATE_SPACECRAFT = "spacecrafts/createSpacecraft"
const UPDATE_SPACECRAFT = "spacecrafts/updateSpacecraft"
const DELETE_SPACECRAFT = "spacecrafts/deleteSpacecraft"

// Action Creators
export const actionLoadSpacecrafts = (spacecrafts) => {
    return {
        type: LOAD_SPACECRAFTS,
        spacecrafts
    }
}

export const actionLoadSpacecraft = (spacecraft) => {
    return {
        type: LOAD_SPACECRAFT,
        spacecraft
    }
}

export const actionCreateSpacecraft = (spacecraft) => {
    return {
        type: CREATE_SPACECRAFT,
        spacecraft
    }
}

export const actionUpdateSpacecraft = (spacecraft) => {
    return {
        type: UPDATE_SPACECRAFT,
        spacecraft
    }
}

export const actionDeleteSpacecraft = (spacecraftId) => {
    return {
        type: DELETE_SPACECRAFT,
        spacecraftId
    }
}

// Thunks
export const getAllSpacecraft = () => async (dispatch) => {
    const res = await fetch('/api/spacecrafts')

    if(res.ok){
        const spacecrafts = await res.json()
        dispatch(actionLoadSpacecrafts(spacecrafts))
        return spacecrafts
    }
    return res
}

export const getOneSpacecraft = (id) => async (dispatch) => {
    const res = await fetch(`/api/spacecrafts/${id}`)
    if(res.ok){
        const spacecraft = await res.json()
        dispatch(actionLoadSpacecraft(spacecraft))
        return spacecraft
    }
    return res
}

export const createSpacecraft = (spacecraft) => async (dispatch) => {
    const res = await fetch('/api/spacecrafts', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spacecraft)
    })
    if(res.ok){
        const spacecraft = await res.json()
        dispatch(actionCreateSpacecraft(spacecraft))
        return spacecraft
    }
    return res
}

export const updateSpacecraft = (spacecraft) => async (dispatch) => {
    const res = await fetch(`/api/spacecrafts/${spacecraft.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spacecraft)
    })
    if(res.ok){
        const updatedSpacecraft = await res.json()
        dispatch(actionUpdateSpacecraft)
        return updatedSpacecraft
    }
    return res
}

export const deleteSpacecraft = (spacecraftId) => async (dispatch) => {
    const res = await fetch(`/api/spacecrafts/${spacecraftId}`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(actionDeleteSpacecraft(spacecraftId))
    }
    return res
}

// Initial State
const initialState = {
    allSpacecraft: {},
    singleSpacecraft: {}
}

// Reducer
const spacecraftReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_SPACECRAFTS:
            const spacecrafts = normalizingData(action.spacecrafts)
            newState.allSpacecraft = {...spacecrafts}
            return newState
        case LOAD_SPACECRAFT:
            return {...state, singleSpacecraft: {...action.spacecraft}}
        case CREATE_SPACECRAFT:
            return {...state, allSpacecraft: {...state.allSpacecraft, [action.spacecraft.id]: action.spacecraft}}
        case UPDATE_SPACECRAFT:
            return {...state, allSpacecraft: {...state.allSpacecraft, [action.spacecraft.id]: action.spacecraft}}
        case DELETE_SPACECRAFT:
            delete newState.allSpacecraft[action.id]
            return newState
        default:
            return state
    }
}

// Normalize Data
export const normalizingData = (data) => {
    const obj = {};
    data.forEach((ele) => (obj[ele.id] = ele));
    return obj;
  };

  export default spacecraftReducer