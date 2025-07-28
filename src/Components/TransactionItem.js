// src/components/TransactionItem.js
import React from 'react';
import '../App.css';

const TransactionItem = ({ transaction, deleteTransaction, handleEdit }) => {
    const sign = transaction.amount < 0 ? '-' : '+';
    const transactionClass = transaction.amount < 0 ? 'minus' : 'plus';

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <li className={transactionClass}>
            <span className="transaction-description">{transaction.description}</span>
            <span className="transaction-date">({formatDate(transaction.date)})</span>
            <span>{sign} ₹{Math.abs(transaction.amount).toFixed(2)}</span>
            <div className="transaction-actions">
                <button onClick={() => handleEdit(transaction)} className="edit-btn">
                    Edit
                </button>
                <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">
                    x
                </button>
            </div>
        </li>
    );
};

export default TransactionItem;