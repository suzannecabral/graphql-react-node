import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const CompleteRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    let history = useHistory();

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'));
    }, [history]);

    const handleSubmit = () => {
        //
    };

    return (
        <div className="contianer p-5">
            {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Register</h4>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="Enter email"
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Enter password"
                        disabled={loading}
                    />
                </div>
                <button className="btn btn-raised btn-primary" disabled={!email || loading}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CompleteRegistration;
