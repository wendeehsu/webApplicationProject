import React, { useState, useEffect } from 'react';
import { MainButton, SecondaryButton } from "../../../../components/button";
import PopUp from "../../../../components/popup";
import { getCancelledLesson } from "../../../../api/lesson"

function CanceledLessonPage() {
    const [lessonList, setLessonList] = useState([]);
    const user_img_url = "../../images/user";
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    useEffect(() => {
        getCancelledLesson()
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
                lessonList.map((lessonObject) => (
                    <div className='lesson-row' key={lessonObject.lesson._id}>
                        <div className='profile-img'
                            style={{ backgroundImage: `url('../../images/${lessonObject.student.img_url}')` }} />
                        <div className='lesson-content'>
                            <div className='content-title'>
                                <div className='title-text'>
                                    <h2>{lessonObject.student.name}</h2>
                                    <p>{lessonObject.student.nationality}</p>
                                </div>
                                <div className='chip'>
                                    {lessonObject.lesson.timeslotStart}
                                </div>
                            </div>
                            <p className='content-request'>
                                {lessonObject.lesson.note}
                            </p>

                            <div className='button-section'>
                                <PopUp
                                    text="View Cancellation Message"
                                    isEditMode={false}
                                    content={lessonObject.cancel.note}
                                    buttonLabel="Done"
                                    popUpLabel={`Message from ${lessonObject.cancel.canceler.name}`} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )

}

export default CanceledLessonPage;