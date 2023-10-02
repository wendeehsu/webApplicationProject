import React from 'react';
import './Header.css';

function Header() {
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
        </div>
    )
}

export default Header;