// src/components/BalanceDisplay.js
import React from 'react';
import '../App.css';

const BalanceDisplay = ({ totalBalance }) => {
    const balanceClass = totalBalance >= 0 ? 'positive-balance' : 'negative-balance';
    return (
        <div className="balance-display">
            <h2>Your Balance</h2>
            <p className={balanceClass}>₹{totalBalance.toFixed(2)}</p>
        </div>
    );
};

export default BalanceDisplay;