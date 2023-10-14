import React, { useState, useEffect } from 'react';
import { MainButton, SecondaryButton } from "../../../../components/button";
import "../index.css";

function UpcomingLessonPage() {
    const [lessonList, setLessonList] = useState([]);
    const user_img_url = "../../images/user";

    useEffect(() => {
        setLessonList([{
            id: 1,
            name: "Eleanor Pena",
            nationality: "Russian Federation",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            meetLink: "https://meet.google.com/zzw-cqtw-nkt",
            imgUrl: user_img_url + "1.png"
        }, {
            id: 2,
            name: "Leslie Alexander",
            nationality: "United Kindom",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            meetLink: "https://meet.google.com/zzw-cqtw-nkt",
            imgUrl: user_img_url + "2.png"
        }, {
            id: 3,
            name: "Jerome Bell",
            nationality: "Australia",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            meetLink: "https://meet.google.com/zzw-cqtw-nkt",
            imgUrl: user_img_url + "3.png"
        }])
    }, []);

    return (
        <>
            {
                lessonList.map((lesson) => (
                    <div className='lesson-row' key={lesson.id}>
                        <div className='profile-img'
                            style={{ backgroundImage: `url(${lesson.imgUrl})` }} />
                        <div className='lesson-content'>
                            <div className='content-title'>
                                <div className='title-text'>
                                    <h2>{lesson.name}</h2>
                                    <p>{lesson.nationality}</p>
                                </div>
                                <div className='chip'>
                                    {lesson.timeSlot}
                                </div>
                            </div>
                            <p className='content-request'>
                                {lesson.content}
                            </p>
                            <div className='button-section'>
                                <MainButton
                                    text="Join Meet"
                                    onClick={() => window.open(lesson.meetLink, "_blank")}
                                />
                                <SecondaryButton
                                    text="Cancel"
                                    onClick={() => console.log("Cancel")}
                                />
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default UpcomingLessonPage;