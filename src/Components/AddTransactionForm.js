// src/components/AddTransactionForm.js
import React, { useState, useEffect } from 'react';
import '../App.css';

const AddTransactionForm = ({ addTransaction, initialData = null, onSubmit, isEditing = false }) => {
    const [description, setDescription] = useState(initialData ? initialData.description : '');
    const [amount, setAmount] = useState(initialData ? Math.abs(initialData.amount) : ''); // Always positive for input
    const [type, setType] = useState(initialData ? initialData.type : 'expense');
    const [date, setDate] = useState(initialData ? initialData.date : new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (initialData) {
            setDescription(initialData.description);
            setAmount(Math.abs(initialData.amount));
            setType(initialData.type);
            setDate(initialData.date);
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !amount) {
            alert('Please enter description and amount');
            return;
        }

        const newTransaction = {
            description,
            amount: type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
            type,
            date,
        };

        if (isEditing) {
            onSubmit({ ...initialData, ...newTransaction }); // Merge with existing ID
        } else {
            addTransaction(newTransaction);
        }

        // Clear form
        setDescription('');
        setAmount('');
        setType('expense');
        setDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <div className="add-transaction-form-wrapper">
            <h3>{isEditing ? 'Edit Transaction' : 'Add New Transaction'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description..."
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount..."
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="type">Type</label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>
                <div className="form-control">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button className="btn">{isEditing ? 'Update Transaction' : 'Add Transaction'}</button>
            </form>
        </div>
    );
};

export default AddTransactionForm;