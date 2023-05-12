// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getOneProfile } from "../../store/profile";
import logo from '../../assets/logo-no-background.svg'
import './TransactionReceipt.css'

function TransactionReceipt({ transaction }){
    // Create dispatch method
    const dispatch = useDispatch()

    console.log('transaction: ', transaction)

    // let profile = ''
    useEffect(() => {
        dispatch(getOneProfile(transaction.user_id))
    }, [dispatch, transaction, transaction.user_id])

    const profile = useSelector(state => state.profiles.singleProfile)

    console.log('profile: ', profile)

    return (
        <div className="transaction-receipt-container">
            <div className="receipt-logo-container">
                <img style={{ height: '75px', width: '75px' }} src={logo} alt='' />
            </div>
            <div className="company-info-container">
                <div>InfinityX</div>
                <div>Addres Goes Here</div>
                <div>Maybe Phone Number Goes Here</div>
            </div>
            <div className="receipt-date-container">
                <div>{transaction.created_at}</div>
            </div>
            <div className="user-information-container">
                <div>{profile?.first_name}, {profile?.last_name}</div>
            </div>
            <div className="membership-receipt-container">
                <div>Account Number:{profile?.membership[0]?.account_no}</div>
                <div>Points:{profile?.membership[0]?.points}</div>
            </div>
            <div className="main-receipt-content-container">
                <div>Price Per Kg: ${transaction.unit_price.toLocaleString()}
                </div>
                <div>User Kg: {}</div>
                <div>Tax Percentage: {transaction.tax_percentage}%</div>
                <div>Tax Total: ${transaction.tax_total.toLocaleString()}</div>
                <div>Purchase Total: ${transaction.total.toLocaleString()}</div>
            </div>
        </div>
    )
}

export default TransactionReceipt