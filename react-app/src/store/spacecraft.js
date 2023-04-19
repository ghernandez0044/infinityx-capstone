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