import React, { useState, useEffect } from 'react';
import PopUp from "../../../../components/popup";
import { MainButton } from "../../../../components/button";
import { getPendingLesson, confirmLesson } from "../../../../api/lesson.js";

function PendingLessonPage() {
    const [lessonList, setLessonList] = useState([]);
    const cancelLesson = (text) => {
        // TODO: cancel a lesson
        console.log("cancel this lesson because:", text);
    }

    const approveLesson = (id) => {
        confirmLesson(id).then((res) => {
            if (res.success) {
                let data = lessonList.filter((lesson) => lesson.lesson._id !== id);
                setLessonList(data);
            } else {
                alert(res.message);
            }
        })
    }

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
                                style={{ backgroundImage: `url('../../images/${lesson.student.img_url}')` }} />
                            <div className='lesson-content'>
                                <div className='content-title'>
                                    <div className='title-text'>
                                        <h2>{lesson.student.name}</h2>
                                        <p>{lesson.student.native_language}</p>
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
                                        text="Confirm"
                                        onClick={() => approveLesson(lesson.lesson._id)}
                                    />
                                    <PopUp
                                        id={1}
                                        text="Cancel"
                                        styleName="secondary"
                                        action={cancelLesson}
                                        content="Let your student know why you canceled..."
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