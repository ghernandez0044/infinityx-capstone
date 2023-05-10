// Necessary imports
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import OpenModalIcon from "../OpenModalIcon";
import Confirmation from "../Confirmation";
import './TransactionCard.css'

function TransactionCard({ transaction }){
    // Create dispatch method
    const dispatch = useDispatch()

    // Create history method
    const history = useHistory()

    // Consume useModal context for desired function
    const { closeModal } = useModal()




    return (
        <div className="transaction-card-container">
            <div id='date'>Date: {transaction.created_at}</div>
            <div className="details-container">
                <div id='price'>Price Per Kg: ${transaction.unit_price.toLocaleString()}</div>
                <div id='quantity'>Quantity: {transaction.quantity}</div>
                <div id='total'>Total: ${transaction.total.toLocaleString()}</div>
                <div className="pointer">
                    <OpenModalIcon modalComponent={<h1>Receipt</h1>} icon='fa-solid fa-receipt' />
                </div>
            </div>
        </div>
    )
}

export default TransactionCard