import React, { useState, useEffect } from 'react';
import { MainButton, SecondaryButton } from "../../../../components/button";
import PopUp from "../../../../components/popup";
import "../index.css";

function PendingLessonPage() {
    const [lessonList, setLessonList] = useState([]);
    const user_img_url = "../../images/user";
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    useEffect(() => {
        setLessonList([{
            id: 1,
            name: "Devon Lane",
            nationality: "English",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            meetLink: "https://meet.google.com/zzw-cqtw-nkt",
            imgUrl: user_img_url + "6.png"
        }, {
            id: 2,
            name: "Arlene McCoy",
            nationality: "Portugese",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            meetLink: "https://meet.google.com/zzw-cqtw-nkt",
            imgUrl: user_img_url + "5.png"
        }, {
            id: 3,
            name: "Cody Fisher",
            nationality: "Portugese",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            meetLink: "https://meet.google.com/zzw-cqtw-nkt",
            imgUrl: user_img_url + "8.png"
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
                                <MainButton text="Cancel" onClick={() => setIsPopUpOpen(true)} />

                                {isPopUpOpen && (
                                    <PopUp id={1} text="press this button" />
                                )}
                            </div>

                        </div>
                    </div>
                ))
            }
        </>
    )

}

export default PendingLessonPage;