// Type Variables
const LOAD_WALLETS = "wallets/loadWallets"
const LOAD_WALLET = "wallets/loadWallet"
const CREATE_WALLET = "wallets/createWallet"
const UPDATE_WALLET = "wallets/updateWallet"
const DELETE_WALLET = "wallets/deleteWallet"

// Action Creators
export const actionLoadWallets = (wallets) => {
    return {
        type: LOAD_WALLETS,
        wallets
    }
}

export const actionLoadWallet = (wallet) => {
    return {
        type: LOAD_WALLET,
        wallet
    }
}

export const actionCreateWallet = (wallet) => {
    return {
        type: CREATE_WALLET,
        wallet
    }
}

export const actionUpdateWallet = (wallet) => {
    return {
        type: UPDATE_WALLET,
        wallet
    }
}

export const actionDeleteWallet = (walletId) => {
    return {
        type: DELETE_WALLET,
        walletId
    }
}

// Thunks
export const getAllWallets = () => async (dispatch) => {
    const res = await fetch('/api/wallets')
    if(res.ok){
        const wallets = await res.json()
        dispatch(actionLoadWallets(wallets))
        return wallets
    }
    return res
}

export const getOneWallet = (id) => async (dispatch) => {
    const res = await fetch(`/api/wallets/${id}`)
    if(res.ok){
        const wallet = await res.json()
        dispatch(actionLoadWallet(wallet))
        return wallet
    }
    return res
}

export const createWallet = (wallet) => async (dispatch) => {
    const res = await fetch('/api/wallets/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wallet)
    })
    if(res.ok){
        const wallet = await res.json()
        dispatch(actionCreateWallet(wallet))
        return wallet
    }
    return res
}

export const updateWallet = (wallet, id) => async (dispatch) => {
    const res = await fetch(`/api/wallets/${Number(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wallet)
    })
    if(res.ok){
        const updatedWallet = await res.json()
        dispatch(actionUpdateWallet(wallet))
        return updatedWallet
    }
}

