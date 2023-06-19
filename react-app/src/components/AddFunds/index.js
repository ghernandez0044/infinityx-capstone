// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";


function AddFunds(){
    // Create state variables
    const [ amount, setAmount ] = useState(0)


    // Function to handle form submission
    const handleSubmit = () => {
        alert('submit!')
    }


    return (
        <div className="add-funds-container">
            <div className="header-font" style={{ textAlign: 'center', fontSize: '44px' }}>Add Funds</div>
            <form className="form-container" onSubmit={handleSubmit}>
                <label className="label-font">Amount</label>
                <input></input>
            </form>
        </div>
    )
}

export default AddFunds