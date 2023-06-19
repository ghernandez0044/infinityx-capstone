// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


function AddFunds(){
    // Create state variables
    const [ amount, setAmount ] = useState(0)
    const [ errors, setErrors ] = useState({})

    // Check input validation on change
    useEffect(() => {
        const newErrors = {}

        if(amount < 0) newErrors.amountErr = 'Amount cannot be negative'
        setErrors(newErrors)
    }, [amount])


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`the amount is ${amount}`)
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