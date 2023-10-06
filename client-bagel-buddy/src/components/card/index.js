import React from 'react';
import './index.css';

function Card() {
    const user_img_url = "../../images/user1.png";
    return (
        <div className='card'>
            <div className='card-img'
                style={{ backgroundImage: `url(${user_img_url})` }}/>
            <h2>Alysa Yang</h2>
            <p>U.S.A</p>
            <div className=''>
                {
                    [1,2,3,4].map(() => (
                        <img className='star' src="../../images/starSolid.png" />
                    ))
                }
            </div>
            <div className='skill-list'>
                {
                    ["speaking", "grammer"].map((skill) => (
                        <div className='skill-chip'>
                            <p>{skill}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Card;