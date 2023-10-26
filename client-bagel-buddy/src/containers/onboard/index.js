import React, { useState } from 'react';
import './index.css';
import { MainButton } from "../../components/button";
import { useNavigate } from 'react-router-dom';

function Onboard() {
    const signup = "signup";
    const login = "login";
    const [activeTab, setActiveTab] = useState(signup);
    const navigate = useNavigate();
    
    function visitMainPage() {
        // TODO: auth + nav based on role
        navigate("/");
    }

    return (
        <div className='onboard-page'>
            <div className='onboard-header'>
                <div className={`onboard-nav ${activeTab == signup ? 'active' : ''}`}
                    onClick={() => setActiveTab(signup)}>
                    <h2>
                        Sign up
                    </h2>
                </div>
                <div className={`onboard-nav ${activeTab == login ? 'active' : ''}`}
                    onClick={() => setActiveTab(login)}>
                    <h2>
                        Log in
                    </h2>
                </div>
            </div>
            <div className='onboard-content'>
                <p>Email</p>
                <input
                    className='input-box'
                    type='text' />
                <p>Password</p>
                <input
                    className='input-box'
                    type='text' />
            </div>
            <div className="signup-button">
                <MainButton
                    text={ activeTab == login ? "Log in" : "Sign up"}
                    onClick={visitMainPage} />
            </div>
        </div>
    );
}

export default Onboard;