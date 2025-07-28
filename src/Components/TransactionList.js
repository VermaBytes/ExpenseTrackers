// src/components/TransactionList.js
import React from 'react';
import TransactionItem from './TransactionItem';
import '../App.css';

const TransactionList = ({ transactions, deleteTransaction, handleEdit }) => {
    return (
        <div className="transaction-list-wrapper">
            <h3>History</h3>
            <ul className="list">
                {transactions.length === 0 ? (
                    <p className="no-transactions">No transactions yet. Add some!</p>
                ) : (
                    transactions
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date, newest first
                        .map(transaction => (
                            <TransactionItem
                                key={transaction.id}
                                transaction={transaction}
                                deleteTransaction={deleteTransaction}
                                handleEdit={handleEdit}
                            />
                        ))
                )}
            </ul>
        </div>
    );
};

export default TransactionList;