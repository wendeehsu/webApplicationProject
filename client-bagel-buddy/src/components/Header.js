import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const user_img_url = "../../images/user1.png";
    const navigate = useNavigate();

    const navList = [{
        text: 'Teachers',
        path: '/teacherList'
    }, {
        text: 'Lessons',
        path: '/myLessons'
    }];

    return (
        <div className="header-section">
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
                    >
                        {item.text}
                    </p>
                ))
            }
            <div className='header-user' style={{ backgroundImage: `url(${user_img_url})` }} />
        </div>
    )
}

export default Header;