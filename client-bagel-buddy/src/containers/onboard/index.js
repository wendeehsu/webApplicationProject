import React, { useState } from 'react';
import './index.css';
import { MainButton } from "../../components/button";
import { useNavigate } from 'react-router-dom';
import { login } from "../../api/user";

function Onboard() {
    const SIGNUP_TEXT = "signup";
    const LOGIN_TEXT = "login";
    const [activeTab, setActiveTab] = useState(SIGNUP_TEXT);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const visitMainPage = async () => {
        await login(email, password)
            .then((res) => {
                if (res.success) {
                    navigate("/");
                } else {
                    alert(res.message);
                }
            });
    }

    return (
        <div className='onboard-page'>
            <div className='onboard-header'>
                <div className={`onboard-nav ${activeTab === SIGNUP_TEXT ? 'active' : ''}`}
                    onClick={() => setActiveTab(SIGNUP_TEXT)}>
                    <h2>
                        Sign up
                    </h2>
                </div>
                <div className={`onboard-nav ${activeTab === LOGIN_TEXT ? 'active' : ''}`}
                    onClick={() => setActiveTab(LOGIN_TEXT)}>
                    <h2>
                        Log in
                    </h2>
                </div>
            </div>
            <div className='onboard-content'>
                <p>Email</p>
                <input
                    className='input-box'
                    type='text'
                    value={email}
                    onInput={(e) => setEmail(e.target.value)} />
                <p>Password</p>
                <input
                    className='input-box'
                    type='password'
                    value={password}
                    onInput={(e) => setPassword(e.target.value)} />
            </div>
            <div className="signup-button">
                <MainButton
                    text={activeTab === LOGIN_TEXT ? "Log in" : "Sign up"}
                    onClick={visitMainPage} />
            </div>
        </div>
    );
}

export default Onboard;