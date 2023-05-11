// Necessary imports
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import logo from '../../assets/logo-no-background.svg'
import './TransactionReceipt.css'

function TransactionReceipt({ transaction }){


    return (
        <div className="transaction-receipt-container">
            <div className="receipt-logo-container">
                <img style={{ height: '75px', width: '75px' }} src={logo} alt='' />
            </div>
        </div>
    )
}

export default TransactionReceipt