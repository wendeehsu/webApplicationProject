import React from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../button';

function Card({
    id,
    name,
    nationality,
    star,
    skills = [],
    timeslot = null,
    meetLink = null
}) {
    const navigate = useNavigate();
    const user_img_url = "../../images/user" + (1 + id % 4) + ".png";

    return (
        <div key={id}
            className='card'
            onClick={() => timeslot == null ? navigate('/teacherDetail/' + id) : undefined}>
            <div className='card-img'
                style={{ backgroundImage: `url(${user_img_url})` }} />
            <h2>{name}</h2>
            <p className='teacher-language'>{nationality}</p>
            <div className=''>
                {
                    Array.from({ length: star })
                        .map((item, index) => (
                            <img
                                key={`star-${index}`}
                                className='star'
                                src="../../images/starSolid.png" />
                        ))
                }
            </div>
            {
                (timeslot == null) ? (
                    <div className='skill-list'>
                        {
                            ["writing", "reading", "speaking", "grammar"]
                                .filter((skill, index) => skills.includes(index))
                                .map((skill, index) => (
                                    <div className='skill-chip' key={`skill-${index}`}>
                                        <p className='skillBox'>{skill}</p>
                                    </div>
                                ))
                        }
                    </div>
                ) : (
                    <>
                        <div className='skill-chip time'>
                            <p className='skillBox'>
                                {timeslot}
                            </p>
                        </div>
                        <MainButton
                            text="Join Meet"
                            className="meet-btn"
                            onClick={() => window.open(meetLink)}
                        />
                    </>
                )
            }
        </div>
    )
}

export default Card;