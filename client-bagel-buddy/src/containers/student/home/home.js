import React from 'react';
import './home.css';
import Card from '../../../components/card';

function HomePage() {
    return (
        <div className='page'>
            <div className='home-point-earn-section'>
                <div className='home-text-section'>
                    <h1>You've earned 40 points!</h1>
                    <p>Keep working! We'll send you a surprise package once you reach 100 points!</p>
                </div>

                {/* TODO: add class in the css file if you want to style the image */}
                <img className='Home Section' src='../../images/home_section.png' alt="decoration" />
            </div>

            <h1>
                Upcoming Lessons
            </h1>
            <div className='card-row'>
                { [1,2,3].map((i) => (
                    <Card
                        id={i}
                        name="Alysa Yang"
                        nationality="U.S.A"
                        star={4}
                        timeslot="Sep 20, Wed, 20:00 - 20:30"
                        meetLink="https://meet.google.com/zzw-cqtw-nkt"
                    />))
                }
            </div>
            
            <h1>
                Recommended Teachers
            </h1>
            <div className='card-row'>
                { [1,2,3].map((i) => (
                    <Card
                        id={i}
                        name="Alysa Yang"
                        nationality="U.S.A"
                        star={4}
                        skills={[0,1]}
                    />))
                }
            </div>
        </div>
    )
}

export default HomePage;