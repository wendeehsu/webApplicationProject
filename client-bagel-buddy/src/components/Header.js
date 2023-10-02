import React from 'react';
import './Header.css';

function Header() {
    const user_img_url = "../../images/user1.png";

    return (
        <div className="header-section">
            <div className='header-brand'>
                <img
                    className='header-logo'
                    src='../../../images/logo.png' />
                <p>
                    Bagel Buddies
                </p>
            </div>
            <p className='header-nav'>
                Teachers
            </p>
            <p className='header-nav'>
                Lessons
            </p>
            <div className='header-user' style={{ backgroundImage: `url(${user_img_url})` }} />
        </div>
    )
}

export default Header;