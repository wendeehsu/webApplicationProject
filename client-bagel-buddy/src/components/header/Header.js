import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../api/user';
import './Header.css';

function Header() {
    const user_img_url = "../../images/user1.png";
    const navigate = useNavigate();
    const location = useLocation();
    const userRef = useRef(null);

    const [showDropDown, setShowDropDown] = useState(false);

    const navList = [{
        text: 'Teachers',
        path: '/teachers'
    }, {
        text: 'Lessons',
        path: '/myLessons'
    }];

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

    return (
        <div className={location.pathname == "/login" ? 'hide' : 'header-section'}>
            <div className='header-brand'
                onClick={() => navigate('/')}>
                <img
                    className='header-logo'
                    src='../../../images/logo.png' />
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
                style={{ backgroundImage: `url(${user_img_url})` }}
                onClick={() => setShowDropDown(true)}
            />
            {
                showDropDown && (
                    <div className='user-dropdown' ref={userRef}>
                        <p className='dropdown-item'>Profile</p>
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
        </div>

    )
}

export default Header;