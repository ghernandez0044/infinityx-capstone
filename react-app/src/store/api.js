// Type Variables
const LOAD_APOD = 'api/loadApod'

// Action Creators
export const actionLoadApod = (data) => {
    return {
        type: LOAD_APOD,
        data
    }
}

// Thunks
export const getApod = () => async (dispatch) => {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`)
    if(res.ok){
        const apod = await res.json()
        dispatch(actionLoadApod(apod))
        return apod
    }
    return res
}

// Initial State
const initialState = {
    apod: {}
}

// Reducer
const apiReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_APOD:
            newState.apod = action.data
            return newState
        default:
            return state
    }
}

export default apiReducer