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

export const actionDeleteSpacecraft = (spacecraft) => {
    return {
        type: DELETE_SPACECRAFT,
        spacecraft
    }
}

// Thunks
export const getAllSpacecraft = () => async (dispatch) => {
    const res = await fetch('api/spacecrafts')

    if(res.ok){
        const spacecrafts = await res.json()
        dispatch(actionLoadSpacecrafts(spacecrafts))
        return spacecrafts
    }
    return res
}