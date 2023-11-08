import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './teacherDetail.css';
import PopUp from "../../../components/popup";


function TeacherDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviewList, setReviewList] = useState([]);
    const skills = [2, 0]
    const times = ["Sept 20, Wed, 10:00 - 10:30", "Sept 20, Wed, 12:00 - 12:30", "Sept 20, Wed, 14:30 - 15:00", "Sept 21, Thu, 9:00 - 9:30", "Sept 21, Thu, 16:00 - 16:30", "Sept 22, Fri, 10:30 - 11:00"]
    const timeList = [
        { text: "Sept 20, Wed, 10:00 - 10:30", selected: false, value: 10 },
        { text: "Sept 20, Wed, 12:00 - 12:30", selected: false, value: 11 },
        { text: "Sept 20, Wed, 14:30 - 15:00", selected: false, value: 20 },
        { text: "Sept 21, Thu, 9:00 - 9:30", selected: false, value: 21 },
        { text: "Sept 21, Thu, 16:00 - 16:30", selected: false, value: 30 },
        { text: "Sept 22, Fri, 10:30 - 11:00", selected: false, value: 31 },
    ];
    const [selectedTimes, setSelectedTimes] = useState(timeList);

    const selectedTime = selectedTimes.find(time => time.selected);

    const updateTime = (index) => {

        const updatedTimes = selectedTimes.map((time, i) => {
            return {
                ...time,
                selected: i === index,
            };
        });
        setSelectedTimes(updatedTimes);
    }


    useEffect(() => {
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
        }])
    }, []);


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
                    src='../../../images/user1.png' />
                <div className='star-chunk'>
                    <h1 className='teacher-name'> Alysa Yang</h1>
                    <p className='teacher-lang'> Spanish </p>
                    <div className='starList'>
                        {
                            Array.from({ length: 5 }) /*not a number before*/
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
                            ["Writing", "Reading", "Speaking", "Grammar"]
                                .filter((skill, index) => skills.includes(index))
                                .map((skill, index) => (
                                    <div className='skill-chip' key={`skill-${index}`}>
                                        <p className='skillBox'>{skill}</p>
                                    </div>
                                ))
                        }
                    </div>
                </div>

                <div className='teacher-text'>
                    <p> Hello, I'm thrilled to introduce myself as your child's teacher for this academic year. My name is Alysa Yang, and I am truly excited to embark on this educational journey with your child and you. Education is a partnership between teachers, students, and parents, and I believe in open communication and collaboration to ensure the best possible learning experience for your child.</p>
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
                            selectedTimes
                                .map((time, index) => (
                                    <div
                                        key={time.value}
                                        className={`time-chip selectable-chip ${time.selected ? 'selected' : ''}`}
                                        onClick={() => updateTime(index)}>
                                        <p className='skillBox'>{time.text}</p>
                                    </div>
                                ))
                        }
                        <div className='user-confirm'>
                            <p id='selection'> You selected: </p>
                            <h2> {selectedTime ? selectedTime.text : 'No timeslot selected'} </h2>
                        </div>
                    </div>

                    <div className='book-button'>
                                <PopUp
                                    id={1}
                                    text="Book Lesson"
                                    content = "Let the teacher know why you want to book with them..."
                                    buttonLabel="Confirm"
                                    popUpLabel="Send a Message" />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TeacherDetailPage;