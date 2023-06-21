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

    // Consume useModal context
    const { closeModal } = useModal()

    useEffect(() => {
        dispatch(getOneProfile(transaction.user_id))
    }, [dispatch, transaction, transaction.user_id])

    const profile = useSelector(state => state.profiles.singleProfile)

    return (
        <div className="transaction-receipt-container">
            <div className="receipt-logo-container">
                <img style={{ height: '75px', width: '75px' }} src={logo} alt='' />
            </div>
            <div className="company-info-container">
                <div className="profile-font">InfinityX</div>
                <div className="profile-font">Addres Goes Here</div>
                <div className="profile-font">Maybe Phone Number Goes Here</div>
            </div>
            <div className="receipt-date-container">
                <div className="profile-font">{transaction.created_at}</div>
            </div>
            <div className="user-information-container">
                <div className="profile-font">{profile?.first_name}, {profile?.last_name}</div>
            </div>
            <div className="membership-receipt-container">
                <div className="profile-font">Account Number:{profile?.membership[0]?.account_no}</div>
                <div className="profile-font">Points:{profile?.membership[0]?.points}</div>
            </div>
            <div className="main-receipt-content-container">
                <div className="profile-font">Price Per kg: ${transaction.unit_price.toLocaleString()}
                </div>
                <div className="profile-font">User kg: {transaction.user_kg} kg</div>
                <div className="profile-font">Tax Percentage: {transaction.tax_percentage}%</div>
                <div className="profile-font">Tax Total: ${transaction.tax_total.toLocaleString()}</div>
                <div className="profile-font">Purchase Total: ${transaction.total.toLocaleString()}</div>
            </div>
            <div>
                <div onClick={() => closeModal()} className="button animate">
                    <div className="hover-effect"></div>
                    <span className="signup-button-font">Close</span>
                </div>
            </div>
        </div>
    )
}

export default TransactionReceipt