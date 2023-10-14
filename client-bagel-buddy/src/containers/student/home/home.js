import React from 'react';
import './home.css';
import Card from '../../../components/card';

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