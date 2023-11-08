import React, { useState, useEffect } from 'react';
import { MainButton, SecondaryButton } from "../../../../components/button";
import { getUpcomingLesson } from '../../../../api/lesson';
import PopUp from "../../../../components/popup";
import "../index.css";

function UpcomingLessonPage() {
    const [lessonList, setLessonList] = useState([]);

    const cancelLesson = () => {
        // TODO: cancel a lesson
    }

    useEffect(() => {
        getUpcomingLesson()
            .then((res) => {
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
            });
    }, []);

    return (
        <>
            {
                lessonList.length === 0 ? (
                    <p>/* There is no upcoming lesson */</p>
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
                                    <MainButton
                                        text="Join Meet"
                                        onClick={() => window.open(lesson.lesson.meetLink, "_blank")}
                                    />
                                    <PopUp
                                        styleName="secondary"
                                        text="Cancel"
                                        action={cancelLesson}
                                        content="Let the teacher know why you want to cancel..."
                                        buttonLabel="Confirm"
                                        popUpLabel="Send a Message" />
                                </div>
                            </div>
                        </div>
                    )))
            }
        </>
    )
}

export default UpcomingLessonPage;