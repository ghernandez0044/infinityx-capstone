import { normalizingData } from "./spacecraft"

// Type Variables
const LOAD_TRANSACTIONS = "transactions/loadTransactions"
const LOAD_USER_TRANSACTIONS = "transactions/loadUserTransactions"
const LOAD_TRANSACTION = "transactions/loadTransaction"
const CREATE_TRANSACTION = "transactions/createTransaction"

// Action Creators
export const actionLoadTransactions = (transactions) => {
    return {
        type: LOAD_TRANSACTIONS,
        transactions
    }
}

export const actionLoadUserTransactions = (transactions) => {
    return {
        type: LOAD_USER_TRANSACTIONS,
        transactions
    }
}

export const actionLoadTransaction = (transaction) => {
    return {
        type: LOAD_TRANSACTION,
        transaction
    }
}

export const actionCreateTransaction = (transaction) => {
    return {
        type: CREATE_TRANSACTION,
        transaction
    }
}

// Thunks
export const getAllTransactions = () => async (dispatch) => {
    const res = await fetch('/api/transactions')
    if(res.ok){
        const transactions = res.json()
        dispatch(actionLoadTransactions(transactions))
        return transactions
    }
    return res
}

export const getAllUserTransactions = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/transactions`)
    if(res.ok){
        const transactions = await res.json()
        console.log('inside thunk all user transactions: ', transactions)
        dispatch(actionLoadUserTransactions(transactions))
        return transactions
    }
    return res
}

export const getOneTransaction = (transactionId) => async (dispatch) => {
    const res = await fetch(`/api/transactions/${transactionId}`)
    if(res.ok){
        const transaction = res.json()
        dispatch(actionLoadTransaction(transaction))
        return transaction
    }
    return res
}

export const createOneTransaction = (transaction) => async (dispatch) => {
    const res = await fetch(`/api/users/${transaction.user_id}/transactions`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(transaction)

    })
    if(res.ok){
        const transaction = await res.json()
        console.log('created transaction thunk: ', transaction)
        dispatch(actionCreateTransaction(transaction))
        return transaction
    }
    return res
}

// Initial State
const initialState = {
    allTransactions: {},
    singleTransaction: {},
    userTransactions: {}
}

// Reducer
const transactionReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type){
        case LOAD_TRANSACTIONS:
            const transactions = normalizingData(action.transactions)
            newState.allTransactions = {...transactions}
            return newState
        case LOAD_USER_TRANSACTIONS:
            const userTransactions = normalizingData(action.transactions)
            newState.userTransactions = {...userTransactions}
            return newState
        case LOAD_TRANSACTION:
            return {...state, singleTransaction: {...action.transaction}}
        case CREATE_TRANSACTION:
            return {...state, allTransactions: {...state.allTransactions, [action.transaction.id]: action.transaction}}
        default:
            return state
    }
}

export default transactionReducer