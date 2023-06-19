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
        const transactions = res.json()
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
    const res = await fetch(`/api/users/${transaction.user_id}/transactions`)
    if(res.ok){
        const transaction = res.json()
        dispatch(actionCreateTransaction(transaction))
        return transaction
    }
    return res
}