import React, { useState, useEffect } from 'react';
import { MainButton, SecondaryButton } from "../../../../components/button";
import PopUp from "../../../../components/popup";

function HistoryLessonPage() {
    const [lessonList, setLessonList] = useState([]);
    const user_img_url = "../../images/user";

    useEffect(() => {
        setLessonList([{
            id: 1,
            name: "Eleanor Pena",
            nationality: "Russian Federation",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in. Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in. Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            imgUrl: user_img_url + "4.png",
            star: null,
            review: null
        }, {
            id: 2,
            name: "Leslie Alexander",
            nationality: "United Kindom",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            imgUrl: user_img_url + "3.png",
            star: 4,
            review: "A gooood teacher!"
        }, {
            id: 3,
            name: "Jerome Bell",
            nationality: "Australia",
            timeSlot: "Sep 20, Wed, 20:00 - 20:30",
            content: "Hi, I want to practice speaking about topics like introducing Japanese culture, travel, and current events. I'm also happy to talk about anything else that you're interested in.",
            imgUrl: user_img_url + "2.png",
            star: 2,
            review: "A gooood teacher!"
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
                            {
                                lesson.star !== null && (
                                    <>
                                        <div className='star-section'>
                                            {
                                                Array.from({ length: lesson.star }).map((val, index) =>
                                                    <img
                                                        key={`star-solid-${index}`}
                                                        src="../../images/starSolid.png"
                                                        alt="solid star"
                                                    />
                                                ).concat(
                                                    Array.from({ length: 5 - lesson.star }).map((val, index) =>
                                                        <img
                                                            key={`star-empty-${index}`}
                                                            src="../../images/starLine.png"
                                                            alt="Empty star"
                                                        />
                                                    )
                                                )
                                            }
                                            <PopUp
                                                id={1}
                                                text="View Review"
                                                isEditMode={false}
                                                content="I had a great time in my lesson, learned a lot of new conversation skills. "
                                                buttonLabel="Done"
                                                popUpLabel="Message from Leslie Alexander" />
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default HistoryLessonPage;