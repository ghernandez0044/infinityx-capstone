// Type Variables
const LOAD_TRANSACTIONS = "transactions/loadTransactions"
const LOAD_TRANSACTION = "transactions/loadTransaction"
const CREATE_TRANSACTION = "transactions/createTransaction"

// Action Creators
export const actionLoadTransactions = (transactions) => {
    return {
        type: LOAD_TRANSACTIONS,
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
        type: LOAD_TRANSACTION,
        transaction
    }
}