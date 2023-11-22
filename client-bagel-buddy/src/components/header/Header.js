import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout, getProfile, updateUser } from '../../api/user';
import { MainButton, SecondaryButton } from '../button'
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const userRef = useRef(null);

    const [showDropDown, setShowDropDown] = useState(false);
    const [navList, setNavList] = useState([]);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [newBio, setNewBio] = useState("");

    useEffect(() => {
        if (location.pathname !== "/") return;
        getProfile()
            .then((res) => {
                if (res.success) {
                    let { data } = res;
                    setUser(data);
                    setNewBio(data.bio);
                    if (data.type === 0) {
                        setNavList([{
                            text: 'Teachers',
                            path: '/teachers'
                        }, {
                            text: 'Lessons',
                            path: '/myLessons'
                        }]);
                    } else {
                        setNavList([]);
                    }
                }
            })
    }, [location.pathname]);

    useEffect(() => {
        document.addEventListener('click', handleUserClickOutside, true);
        return () => {
            document.removeEventListener('click', handleUserClickOutside, true);
        };
    });

    const handleUserClickOutside = (event) => {
        if (userRef.current && !userRef.current.contains(event.target)) {
            setShowDropDown(false);
        }
    };

    const updateBio = () => {
        updateUser(newBio).then((res) => {
            if (res.success) {
                setUser(res.data);
                setIsEdit(false);
            } else {
                alert(res.message);
            }
        })
    }

    return (
        <div className={location.pathname == "/login" ? 'hide' : 'header-section'}>
            <div className='header-brand'
                onClick={() => navigate('/')}>
                <img
                    className='header-logo'
                    src='../../../images/logo.png'
                    alt='Bagel buddies logo: Cartoon image of a bagel sandwich' />
                <p>
                    Bagel Buddies
                </p>
            </div>
            {
                navList.map((item) => (
                    <p className='header-nav'
                        onClick={() => navigate(item.path)}
                        key={item.text}
                    >
                        {item.text}
                    </p>
                ))
            }
            <div
                className='header-user'
                style={{ backgroundImage: `url('../../images/${user ? user.img_url : 'logo.png'}')` }}
                onClick={() => setShowDropDown(true)}
            />
            {
                showDropDown && (
                    <div className='user-dropdown' ref={userRef}>
                        <p
                            className='dropdown-item'
                            onClick={() => { setOpen(!open); setShowDropDown(false); }}
                            data-toggle="modal"
                            data-target="#profile-popup">
                            Profile
                        </p>
                        <p className='dropdown-item'
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}>
                            Log out
                        </p>
                    </div>
                )
            }
            {open && (
                <div
                    className="popup-overlay"
                    id="profile-popup"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="popup-container" role="document">
                        <div className="modal-content">
                            <button
                                type="button"
                                className="close-button"
                                aria-label="Close"
                                onClick={() => setOpen(false)}
                            >
                                <img src='../../images/close.png' alt="close" />
                               {/* <span aria-hidden="true">&#x2716;</span>*/}
                            </button>
                            <div className="modal-header">
                                <h1 className="modal-title">
                                    Profile
                                </h1>
                            </div>
                            <div className='profile-teacher-info'>
                                <img
                                    className='teacher-img'
                                    src={`../../../images/${user ? user.img_url : "user1.png"}`} />
                                <div className='star-chunk'>
                                    <h1 className='teacher-name'>{user ? user.name : ''}</h1>
                                    <p className='teacher-lang'>{user ? user.native_language : ''} </p>
                                    <div className='skill-list profile-skill'>
                                        {
                                            ["speaking", "writing", "reading", "listening"]
                                                .filter((skill, index) => user ? user.skills.map((s) => s.skill).includes(index) : true)
                                                .map((skill, index) => (
                                                    <div className='skill-chip' key={`skill-${index}`}>
                                                        <p className='skillBox'>{skill}</p>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                    {(user && user.type === 1) &&
                                        <div className='starList'>
                                            {
                                                Array.from({ length: user ? user.points : 0 })
                                                    .map((item, index) => (
                                                        <img
                                                            key={`star-${index}`}
                                                            className='star'
                                                            src="../../images/starSolid.png" />
                                                    ))
                                            }
                                        </div>
                                    }
                                    {(user && user.type === 0) &&
                                        <p className='profile-points-earned'>
                                            {user ? user.points : 0} points earned
                                        </p>
                                    }

                                </div>
                            </div>
                            {
                                isEdit ?
                                    <>
                                        <h1>
                                            Introduction
                                        </h1>
                                        <textarea
                                            className='modal-body profile-modal-body'
                                            id='profile-edit-body'
                                            type='text'
                                            value={newBio}
                                            placeholder="introduce yourself!"
                                            onInput={(e) => setNewBio(e.target.value)} />
                                    </>
                                    :
                                    <p>
                                        {user ? user.bio : 'Hi I am using bagel buddies!'}
                                    </p>
                            }

                            {
                                isEdit ?
                                    <div className='button-section'>
                                        <SecondaryButton
                                            text="Cancel"
                                            onClick={() => setIsEdit(false)}
                                        />
                                        <MainButton
                                            text="Save"
                                            onClick={updateBio}
                                        />
                                    </div> :
                                    <input
                                        className="btn secondary submit-button"
                                        type="button"
                                        value="Edit"
                                        onClick={() => setIsEdit(true)}
                                    />
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Header;