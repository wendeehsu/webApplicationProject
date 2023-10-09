import React from 'react';
import './home.css';

function HomePage() {
    return (
        <div className='page'>
            <div className='home-point-earn-section'>
                <div className='home-text-section'>
                    <h1>Section title here</h1>
                    <p>text text text text text text</p>
                </div>

                {/* TODO: add class in the css file if you want to style the image */}
                <img className='' src='' alt="decoration" />
            </div>

            <h1>
                Upcoming Lessons
            </h1>
            <h1>
                Recommended Teachers
            </h1>
            
        </div>
    )
}

export default HomePage;