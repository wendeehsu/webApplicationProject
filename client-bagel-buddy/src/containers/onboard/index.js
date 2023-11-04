import React, { useState } from 'react';
import './index.css';
import { MainButton, SecondaryButton } from "../../components/button";
import { useNavigate } from 'react-router-dom';
import { login, register } from "../../api/user";

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
    const timeList = [
        { text: "Monday AM", selected: false, value: 10 },
        { text: "Monday PM", selected: false, value: 11 },
        { text: "Tuesday AM", selected: false, value: 20 },
        { text: "Tuesday PM", selected: false, value: 21 },
        { text: "Wednesday AM", selected: false, value: 30 },
        { text: "Wednesday PM", selected: false, value: 31 },
        { text: "Thursday AM", selected: false, value: 40 },
        { text: "Thursday PM", selected: false, value: 41 },
        { text: "Friday AM", selected: false, value: 50 },
        { text: "Friday PM", selected: false, value: 51 },
        { text: "Saturday AM", selected: false, value: 60 },
        { text: "Saturday PM", selected: false, value: 61 },
        { text: "Sunday AM", selected: false, value: 70 },
        { text: "Sunday PM", selected: false, value: 71 }];

    const [activeTab, setActiveTab] = useState(LOGIN_TEXT);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);
    const [username, setUsername] = useState("");
    const [imgUrl, setImgUrl] = useState("user1.png");
    const [language, setLanguage] = useState(languageList[0]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState(timeList);
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
            if (username === "" || username === undefined) {
                alert("Please input your name >_<");
                return;
            }
        } else if (onboardStage === 2) {
            if (selectedSkills.length === 0) {
                alert("Please select at least 1 skill!");
                return;
            }
            if (role === 0) {
                let skills = [...selectedSkills];
                skills.sort();
                register(email, password, role, imgUrl, username, language, skills)
                    .then((res) => {
                        if (res.success) {
                            navigate("/");
                            resetStates();
                        } else {
                            alert(res.message)
                        }
                    })
                return;
            }
        } else {
            if (selectedTimes.filter((t) => t.selected).length === 0) {
                alert("Please select at least 1 timeslot!");
                return;
            }
            let skills = [...selectedSkills];
            skills.sort();
            let times = selectedTimes.filter((i) => i.selected).map((i) => i.value);
            register(email, password, role, imgUrl, username, language, skills, times)
                .then((res) => {
                    if (res.success) {
                        navigate("/");
                        resetStates();
                    } else {
                        alert(res.message)
                    }
                })
            return;
        }
        setOnboardStage(onboardStage + 1);
    }

    const resetStates = () => {
        setEmail("");
        setPassword("");
        setRole(0);
        setUsername("");
        setImgUrl("user1.png");
        setLanguage(languageList[0]);
        setSelectedSkills([]);
        setSelectedTimes(timeList);
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

    const updateTime = (index) => {
        let data = [...selectedTimes];
        data[index].selected = !data[index].selected;
        setSelectedTimes(data);
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
                                        <label onClick={() => setRole(0)}>
                                            I want to be a student
                                        </label>
                                        <br />
                                        <input
                                            type="radio"
                                            value="1"
                                            checked={role === 1}
                                            onChange={() => setRole(1)}
                                            name="userType" />
                                        <label onClick={() => setRole(1)}>
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
                                    value={username}
                                    onInput={(e) => { updateProfile(); setUsername(e.target.value) }} />
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
                                <div className='skill-list time-list'>
                                    {
                                        selectedTimes
                                            .map((time, index) => (
                                                <div
                                                    key={time.value}
                                                    className={`skill-chip selectable-chip ${time.selected ? 'selected' : ''}`}
                                                    onClick={() => updateTime(index)}>
                                                    <p className='skillBox'>{time.text}</p>
                                                </div>
                                            ))
                                    }
                                </div>
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