// Necessary imports
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getOneWallet, updateWallet } from "../../store/wallet";

function AddFunds({ wallet }){
    // Create state variables
    const [ amount, setAmount ] = useState('')
    const [ errors, setErrors ] = useState({})

    // Create dispatch method
    const dispatch = useDispatch()

    // Consume modal context
    const { closeModal } = useModal()

    // Check input validation on change
    useEffect(() => {
        const newErrors = {}

        if(amount < 0) newErrors.amountErr = 'Amount cannot be negative'
        setErrors(newErrors)
    }, [amount])

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        if(Object.values(errors).length === 0){
            const newAmount = Number(amount) + Number(wallet?.funds)
            const newWallet = {
                'user_id': wallet.user_id,
                'address': wallet.address,
                'funds': newAmount
            }
            dispatch(updateWallet(newWallet, wallet.id)).then(res => dispatch(getOneWallet(wallet.id))).then(res => closeModal())
        }
        else {
            return
        }
    }

    return (
        <div className="add-funds-container">
            <div className="header-font" style={{ textAlign: 'center', fontSize: '44px' }}>Add Funds</div>
            <form className="form-container" onSubmit={handleSubmit}>

                <label className="label-font">Amount $</label>
                <br/>
                {errors.amountErr && ( 
                    <div className="label-font spacecraft-errors">{errors.amountErr}</div>
                 )}
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <div onClick={handleSubmit} className="button animate">
                    <div className="hover-effect"></div>
                    <span className="signup-button-font">Deposit Funds</span>
                </div>
            </form>
        </div>
    )
}

export default AddFunds