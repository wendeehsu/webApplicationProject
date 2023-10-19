import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './teacherDetail.css';

function TeacherDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        setReviewList([{
            id:1,
            name: "Jacob Jones",
            nationality: "Singapore",
            imgUrl: "1",
            star: 4,
            comment: "The English teacher in question is an exceptional educator who has left an indelible mark on both my academic and personal growth. Their dedication to fostering a love for literature and language is nothing short of inspiring."
        },{
            id:2,
            name: "Jerome Bell",
            nationality: "Australia",
            imgUrl: "2",
            star: 3,
            comment: "The English teacher in question is an exceptional educator who has left an indelible mark on both my academic and personal growth. Their dedication to fostering a love for literature and language is nothing short of inspiring."
        },{
            id:3,
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
            
            <div>
                {/* TODO: teacher info */}
            </div>

            <div className='teacher-detail-lower-section'>
                <div className='teacher-review-section'>
                    <h1>Review</h1>
                    <div className='review'>
                        { reviewList.map((review, index) => (
                            <div key={`review-${index}`}>
                                <div className='review-header'>
                                    <div
                                        className='review-img'
                                        style={{backgroundImage: `url(../../images/user${index+1}.png)`}}
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
                    {/* TODO: timeslots */}
                </div>
            </div>

        </div>
    )
}

export default TeacherDetailPage;