import { normalizingData } from "./spacecraft"

// Type Variables
const LOAD_PLANET_COMMENTS = "planetComments/loadPlanetComments"
const LOAD_ONE_PLANET_COMMENTS = "planetComments/loadPlanetComment"
const CREATE_PLANET_COMMENT = "planetComments/createPlanetComment"
const UPDATE_PLANET_COMMENT = "planetComments/updatePlanetComment"
const DELETE_PLANET_COMMENT = "planetComments/deletePlanetComment"

// Action Creators
export const actionLoadPlanetComments = (comments) => {
    return {
        type: LOAD_PLANET_COMMENTS,
        comments
    }
}

export const actionLoadOnePlanetComments = (comments) => {
    return {
        type: LOAD_ONE_PLANET_COMMENTS,
        comments
    }
}

export const actionCreatePlanetComment = (comment) => {
    return {
        type: CREATE_PLANET_COMMENT,
        comment
    }
}

export const actionUpdatePlanetComment = (comment) => {
    return {
        type: UPDATE_PLANET_COMMENT,
        comment
    }
}

export const actionDeletePlanetComment = (commentId) => {
    return {
        type: DELETE_PLANET_COMMENT,
        commentId
    }
}

// Thunks 
export const getAllPlanetComments = () => async (dispatch) => {
    const res = await fetch('/api/comments')
    if(res.ok){
        const planetComments = await res.json()
        dispatch(actionLoadPlanetComments(planetComments))
        return planetComments
    }
    return res
}

export const getOnePlanetComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/planet/${id}`)
    if(res.ok){
        const comments = await res.json()
        dispatch(actionLoadOnePlanetComments(comments))
        return comments
    }
    return res
}

export const createPlanetComment = (comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })
    if(res.ok){
        const comment = await res.json()
        dispatch(actionCreatePlanetComment(comment))
        return comment
    }
    return res
}

export const updatePlanetComment = (comment, id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${Number(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })
    if(res.ok){
        const updatedComment = await res.json()
        dispatch(actionUpdatePlanetComment(comment))
        return updatedComment
    }
    return res
}

export const deletePlanetComment = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(actionDeletePlanetComment(commentId))
    }
    return res
}

// Initial State
const initialState = {
    allPlanetComments: {},
    singlePlanetComments: {}
}

// Reducer
const planetCommentReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_PLANET_COMMENTS:
            const comments = normalizingData(action.comments)
            newState.allPlanetComments = {...comments}
            return newState
        case LOAD_ONE_PLANET_COMMENTS:
            return {...state, singlePlanetComments: {...action.comments}}
        case CREATE_PLANET_COMMENT:
            return {...state, allPlanetComments: {...state.allPlanetComments, [action.comment.id]: action.comment}}
        case UPDATE_PLANET_COMMENT:
            return {...state, allPlanetComments: {...state.allPlanetComments, [action.comment.id]: action.comment}}
        case DELETE_PLANET_COMMENT:
            delete newState.allPlanetComments[action.commentId]
        default:
            return state
    }
}

export default planetCommentReducer