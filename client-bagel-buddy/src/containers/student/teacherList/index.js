import React from 'react';
import './index.css';
import Card from '../../../components/card';

function TeacherListPage() {
    return (
        <div className='page'>
            <h1>
                Teachers
            </h1>
            <div className='card-horizontal-list'>
                {
                    [1,2,3,4,5,6,7,8].map(() => <Card />)
                }
            </div>
        </div>
    )
}

export default TeacherListPage;