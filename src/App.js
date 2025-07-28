// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import BalanceDisplay from './Components/BalanceDisplay';
import IncomeExpenseSummary from './Components/IncomeExpenseSummary';
import TransactionList from './Components/TransactionList';
import AddTransactionForm from './Components/AddTransactionForm';
import Modal from './Components/Modal';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem('transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = (transaction) => {
        setTransactions([...transactions, { id: uuidv4(), ...transaction }]);
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    };

    const handleEdit = (transaction) => {
        setIsEditing(true);
        setCurrentTransaction(transaction);
    };

    const updateTransaction = (updatedTransaction) => {
        setTransactions(transactions.map(transaction =>
            transaction.id === updatedTransaction.id ? updatedTransaction : transaction
        ));
        setIsEditing(false);
        setCurrentTransaction(null);
    };

    const income = transactions
        .filter(item => item.type === 'income')
        .reduce((acc, item) => acc + item.amount, 0);

    const expense = transactions
        .filter(item => item.type === 'expense')
        .reduce((acc, item) => acc + item.amount, 0);

    const totalBalance = income - expense;

    return (
        <div className="app-wrapper"> {/* Main app container/card */}
            <Header /> {/* Expense Tracker title - full width top */}

            {/* This section combines Balance and Income/Expense Summary */}
            {/* It will span full width between header and two columns */}
            <div className="summary-section">
                <BalanceDisplay totalBalance={totalBalance} />
                <IncomeExpenseSummary income={income} expense={expense} />
            </div>

            <div className="main-content-columns"> {/* This is the primary two-column flex container */}
                <div className="left-column"> {/* Contains the Add Transaction Form */}
                    <AddTransactionForm addTransaction={addTransaction} />
                </div>
                <div className="right-column"> {/* Contains the Transaction History */}
                    <TransactionList
                        transactions={transactions}
                        deleteTransaction={deleteTransaction}
                        handleEdit={handleEdit}
                    />
                </div>
            </div>

            {isEditing && (
                <Modal onClose={() => setIsEditing(false)}>
                    <AddTransactionForm
                        initialData={currentTransaction}
                        onSubmit={updateTransaction}
                        isEditing={true}
                    />
                </Modal>
            )}
        </div>
    );
}

export default App;