import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getUser, getUserTimeslot } from "../../../api/user";
import { createLesson } from "../../../api/lesson";
import './teacherDetail.css';
import PopUp from "../../../components/popup";

function TeacherDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviewList, setReviewList] = useState([]);
    const [user, setUser] = useState(undefined);
    const [selectedTime, setSelectedTime] = useState(undefined);
    const [timeList, setTimeList] = useState([]);

    const getEndTime = (startTime) => {
        let endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 1);
        return endTime.toLocaleString("en-US", { timeZone: "America/Chicago", hour: '2-digit', hour12: true, minute: '2-digit' });
    }

    useEffect(() => {
        getUser(id).then((res) => {
            if (res.success) {
                setUser(res.data);
            } else {
                alert(res.message);
            }
        });
        getUserTimeslot(id).then((res) => {
            if (res.success) {
                let data = res.data.map((i) => {
                    let startTime = new Date(i);
                    return startTime.toLocaleString("en-US", { timeZone: "America/Chicago", year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: true, minute: '2-digit' });
                })
                setTimeList(data);
            } else {
                alert(res.message);
            }
        });
        setReviewList([{
            id: 1,
            name: "Jacob Jones",
            nationality: "Singapore",
            imgUrl: "1",
            star: 4,
            comment: "The English teacher in question is an exceptional educator who has left an indelible mark on both my academic and personal growth. Their dedication to fostering a love for literature and language is nothing short of inspiring."
        }, {
            id: 2,
            name: "Jerome Bell",
            nationality: "Australia",
            imgUrl: "2",
            star: 3,
            comment: "The English teacher in question is an exceptional educator who has left an indelible mark on both my academic and personal growth. Their dedication to fostering a love for literature and language is nothing short of inspiring."
        }, {
            id: 3,
            name: "Akita Yagor",
            nationality: "Japan",
            imgUrl: "3",
            star: 0,
            comment: "I don't like this teacher"
        }]);
    }, []);

    const bookLesson = (text) => {
        createLesson(id, selectedTime, text).then((res) => {
            if (res.success) {
                alert("request sent! Wait for the teacher to confirm :D");
            } else {
                alert(res.message);
            }
        })
    }

    return (
        <div className='page'>
            <div className='back-btn' onClick={() => navigate(-1)}>
                <img
                    className='back-arrow'
                    src="../../images/arrow-left.png"
                    alt="back icon" />
                <h2>Back</h2>
            </div>

            <div className='teacher-info'>
                <img
                    className='teacher-img'
                    src={`../../../images/${user ? user.img_url : "user1.png"}`} />
                <div className='star-chunk'>
                    <h1 className='teacher-name'>{user ? user.name : ''}</h1>
                    <p className='teacher-lang'>{user ? user.native_language : ''} </p>
                    <div className='starList'>
                        {
                            Array.from({ length: user ? user.points : 0 })
                                .map((item, index) => (
                                    <img
                                        key={`star-${index}`}
                                        className='star'
                                        src="../../images/starSolid.png" />
                                ))
                        }
                    </div>

                    <div className='skill-list'>
                        {
                            ["speaking", "writing", "reading", "listening"]
                                .filter((skill, index) => user !== undefined && user.skills.map(i => i.skill).includes(index))
                                .map((skill, index) => (
                                    <div className='skill-chip' key={`skill-${index}`}>
                                        <p className='skillBox'>{skill}</p>
                                    </div>
                                ))
                        }
                    </div>
                </div>

                <div className='teacher-text'>
                    <p> {user && user.bio ? user.bio :
                        `Hello, I'm thrilled to introduce myself as your child's teacher for this academic year. My name is ${user ? user.name : ''}, and I am truly excited to embark on this educational journey with your child and you. Education is a partnership between teachers, students, and parents, and I believe in open communication and collaboration to ensure the best possible learning experience for your child.`}
                    </p>
                </div>

            </div>

            <div className='teacher-detail-lower-section'>
                <div className='teacher-review-section'>
                    <h1>Review</h1>
                    <div className='review'>
                        {reviewList.map((review, index) => (
                            <div key={`review-${index}`}>
                                <div className='review-header'>
                                    <div
                                        className='review-img'
                                        style={{ backgroundImage: `url(../../images/user${index + 1}.png)` }}
                                    />
                                    <h2>{review.name}</h2>
                                    <p className='review-nationality'>{review.nationality}</p>
                                    <div className='star-section'>
                                        {
                                            Array.from({ length: review.star }).map((val, index) =>
                                                <img
                                                    key={`star-solid-${index}`}
                                                    src="../../images/starSolid.png"
                                                    alt="solid star"
                                                />
                                            ).concat(
                                                Array.from({ length: 5 - review.star }).map((val, index) =>
                                                    <img
                                                        key={`star-empty-${index}`}
                                                        src="../../images/starLine.png"
                                                        alt="Empty star"
                                                    />
                                                )
                                            )
                                        }
                                    </div>
                                </div>
                                <p className='review-comment'>
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='book-section'>
                    <h1>Select a time to book</h1>

                    <div className='time-avail-list'>
                        {
                            timeList.length === 0 ? (
                                <p>There is no available time to book.</p>
                            ) : (
                                timeList
                                    .map((time, index) => (
                                        <div
                                            key={time}
                                            className={`skill-chip time-chip selectable-chip ${time === selectedTime ? 'selected' : ''}`}
                                            onClick={() => setSelectedTime(time)}>
                                            <p className='skillBox'>{time}</p>
                                        </div>
                                    )))
                        }
                    </div>
                    <div className='user-confirm'>
                        <p className='gray-text'> You selected: </p>
                        <h2> {selectedTime ? `${selectedTime} ~ ${getEndTime(selectedTime)}` : 'No timeslot selected'} </h2>
                    </div>

                    <div className='book-button'>
                        <PopUp
                            id={1}
                            text="Book Lesson"
                            action={bookLesson}
                            content="Let the teacher know why you want to book with them..."
                            buttonLabel="Confirm"
                            popUpLabel="Send a Message" />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TeacherDetailPage;