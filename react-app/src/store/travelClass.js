import { normalizingData } from "./spacecraft"

// Type Variables
const LOAD_TRAVEL_CLASSES = "spacecrafts/loadTravelClasses"

// Action Creators
export const actionLoadTravelClasses = (travelClasses) => {
    return {
        type: LOAD_TRAVEL_CLASSES,
        travelClasses
    }
}

// Thunks
export const getAllTravelClasses = () => async (dispatch) => {
    const res = await fetch('/api/travelclasses')

    if(res.ok){
        const travelClasses = await res.json()
        dispatch(actionLoadTravelClasses(travelClasses))
        return travelClasses
    }
    return res
}

// Initial State
const initialState = {
    allTravelClasses: {},
    singleTravelClass: {}
}

// Reducer
const travelClassReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_TRAVEL_CLASSES:
            const travelClasses = normalizingData(action.travelClasses)
            newState.allTravelClasses = {...travelClasses}
            return newState
        default:
            return state
    }
}

export default travelClassReducer