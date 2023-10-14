import React from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import './teacherDetail.css';

function TeacherDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

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
                    {/* TODO: teacher reivews */}
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