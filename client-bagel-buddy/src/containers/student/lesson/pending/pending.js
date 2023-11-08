import React, { useState, useEffect } from 'react';
import { MainButton, SecondaryButton } from "../../../../components/button";
import PopUp from "../../../../components/popup";
import "../index.css";
import { getPendingLesson } from "../../../../api/lesson.js";

function PendingLessonPage() {
    const [lessonList, setLessonList] = useState([]);

    useEffect(() => {
        getPendingLesson().then(
            (res) => {
                if (res.success) {
                    let data = res.data.map((lesson) => {
                        lesson.lesson.timeslotStart = new Date(lesson.lesson.timeslotStart)
                            .toLocaleString("en-US", { timeZone: "America/Chicago" });
                        return lesson;
                    });
                    setLessonList(data);
                } else {
                    alert(res.message);
                }
            }
        );
    }, []);

    return (
        <>
            {
                lessonList.length === 0 ? (
                    <p>/* There is no pending lesson */</p>
                ) : (
                    lessonList.map((lesson) => (
                    <div className='lesson-row' key={lesson.lesson._id}>
                        <div className='profile-img'
                            style={{ backgroundImage: `url('../../images/${lesson.teacher.img_url}')` }} />
                        <div className='lesson-content'>
                            <div className='content-title'>
                                <div className='title-text'>
                                    <h2>{lesson.teacher.name}</h2>
                                    <p>{lesson.teacher.native_language}</p>
                                </div>
                                <div className='chip'>
                                    {lesson.lesson.timeslotStart}
                                </div>
                            </div>
                            <p className='content-request'>
                                {lesson.lesson.note}
                            </p>


                            <div className='button-section'>
                                <PopUp
                                    id={1}
                                    text="Cancel"
                                    content="Let your teacher know why you cancelled..."
                                    buttonLabel="Cancel Lesson"
                                    popUpLabel="Send a Message" />
                            </div>

                        </div>
                    </div>
                )))
            }
        </>
    )

}

export default PendingLessonPage;