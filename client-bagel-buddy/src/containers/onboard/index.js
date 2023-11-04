import React, { useState } from 'react';
import './index.css';
import { MainButton, SecondaryButton } from "../../components/button";
import { useNavigate } from 'react-router-dom';
import { login } from "../../api/user";

function Onboard() {
    const SIGNUP_TEXT = "signup";
    const LOGIN_TEXT = "login";
    const languageList = ["English",
        "Mandarin Chinese",
        "Hindi",
        "Spanish",
        "French",
        "Standard Arabic",
        "Bengali",
        "Russian",
        "Portuguese",
        "Indonesian",
        "Others"];
    const [activeTab, setActiveTab] = useState(LOGIN_TEXT);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("user1.png");
    const [language, setLanguage] = useState(languageList[0]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [onboardStage, setOnboardStage] = useState(0);
    const navigate = useNavigate();

    const visitMainPage = async () => {
        if (email === "" || email === undefined
            || password === "" || password === undefined) {
            alert("Please input the email and password >_<");
            return;
        }
        await login(email, password)
            .then((res) => {
                if (res.success) {
                    navigate("/");
                } else {
                    alert(res.message);
                }
            });
    }

    const next = () => {
        if (onboardStage === 0) {
            if (email === "" || email === undefined
                || password === "" || password === undefined) {
                alert("Please input the email and password >_<");
                return;
            }
        } else if (onboardStage === 1) {
            if (name === "" || name === undefined) {
                alert("Please input your name >_<");
                return;
            }
        } else if (onboardStage === 2) {
            if (selectedSkills.length === 0) {
                alert("Please select at least 1 skill!");
                return;
            }
            if (role === 0) {
                // TODO: register api
                navigate("/");
                resetStates();
                return;
            }
        } else {
            // TODO: register api
            navigate("/");
            resetStates();
            return;
        }
        setOnboardStage(onboardStage + 1);
    }

    const resetStates = () => {
        setEmail("");
        setPassword("");
        setRole(0);
        setName("");
        setImgUrl("user1.png");
        setLanguage(languageList[0]);
        setSelectedSkills([]);
        setOnboardStage(0);
    }

    const back = () => {
        setOnboardStage(onboardStage - 1);
    }

    const updateProfile = () => {
        let num = Math.floor(Math.random() * 13) + 1;
        setImgUrl(`user${num}.png`);
    }

    const updateSkill = (index) => {
        let data = [...selectedSkills];
        let i = data.indexOf(index);
        if (i > -1) {
            data.splice(i, 1);
        } else {
            data.push(index);
        }
        setSelectedSkills(data);
    }

    return (
        <div className='onboard-page'>
            {
                (activeTab === LOGIN_TEXT || onboardStage === 0) ? (
                    <>
                        <div className='onboard-header'>
                            <div className={`onboard-nav ${activeTab === SIGNUP_TEXT ? 'active' : ''}`}
                                onClick={() => { setOnboardStage(0); setActiveTab(SIGNUP_TEXT); }}>
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
                            {
                                activeTab === SIGNUP_TEXT && (
                                    <div className='role-setection'>
                                        <input
                                            type="radio"
                                            value="0"
                                            checked={role === 0}
                                            onChange={() => setRole(0)}
                                            name="userType" />
                                        <label>
                                            I want to be a student
                                        </label>
                                        <br />
                                        <input
                                            type="radio"
                                            value="1"
                                            checked={role === 1}
                                            onChange={() => setRole(1)}
                                            name="userType" />
                                        <label>
                                            I want to be a teacher
                                        </label>
                                    </div>
                                )
                            }
                        </div>
                        <div className="signup-button">
                            <MainButton
                                text={activeTab === LOGIN_TEXT ? "Log in" : "Sign up"}
                                onClick={activeTab === LOGIN_TEXT ? visitMainPage : next} />
                            <SecondaryButton
                                text={"Cancel"}
                                onClick={() => setActiveTab(activeTab === LOGIN_TEXT ? SIGNUP_TEXT : LOGIN_TEXT)} />
                        </div>
                    </>) : (
                    (onboardStage === 1) ? (
                        <div className='horizontal'>
                            <div
                                className='onboard-profile'
                                onClick={updateProfile}
                                style={{ backgroundImage: `url('../../images/${imgUrl}')` }} />
                            <div className='onboard-content'>
                                <p>What is your name?</p>
                                <input
                                    className='input-box'
                                    type='text'
                                    value={name}
                                    onInput={(e) => { updateProfile(); setName(e.target.value) }} />
                                <p>What is your native language?</p>
                                <select
                                    className='language-selection'
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    {languageList.map((lan) =>
                                        <option key={lan} value={lan}>{lan}</option>
                                    )}
                                </select>
                                <div className="signup-button">
                                    <SecondaryButton
                                        text={"Back"}
                                        onClick={back} />
                                    <MainButton
                                        text={"Continue"}
                                        onClick={next} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        (onboardStage === 2) ? (
                            <div>
                                <p>{`What skills do you want to ${role === 0 ? 'improve' : 'teach'}?`}</p>
                                <div className='skill-list'>
                                    {
                                        ["speaking", "writing", "reading", "listening"]
                                            .map((skill, index) => (
                                                <div
                                                    className={`skill-chip selectable-chip ${selectedSkills.includes(index) ? 'selected' : ''}`}
                                                    key={`skill-${index}`}
                                                    onClick={() => updateSkill(index)}>
                                                    <p className='skillBox'>{skill}</p>
                                                </div>
                                            ))
                                    }
                                </div>
                                <div className="signup-button">
                                    <SecondaryButton
                                        text={"Back"}
                                        onClick={back} />
                                    <MainButton
                                        text={role === 0 ? "Done" : "Continue"}
                                        onClick={next} />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p>Which days are you available?</p>
                                {/* TODO: add timechip */}
                                <div className="signup-button">
                                    <SecondaryButton
                                        text={"Back"}
                                        onClick={back} />
                                    <MainButton
                                        text={"Done"}
                                        onClick={next} />
                                </div>
                            </div>
                        )))
            }

        </div>
    );
}

export default Onboard;