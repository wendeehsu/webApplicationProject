import React, { useState, useEffect } from 'react';
import './teacherList.css';
import Card from '../../../components/card';

function TeacherListPage() {
    const [teacherList, setTeacherList] = useState([]);
    useEffect(() => {
        setTeacherList([{
            id:1,
            name: "Alysa Yang",
            nationality: "U.S.A.",
            star: 4,
            skills: [0,1]
        },{
            id:2,
            name: "Leslie Alexander",
            nationality: "United Kindom",
            star: 2,
            skills: [1]
        },{
            id:3,
            name: "Jerome Bell",
            nationality: "Australia",
            star: 5,
            skills: [1,2]
        },{
            id:4,
            name: "Kathryn Murphy",
            nationality: "U.S.A.",
            star: 3,
            skills: [0,1,2,3]
        },{
            id:5,
            name: "Alysa Yang",
            nationality: "U.S.A.",
            star: 4,
            skills: [0,1]
        }])
    }, []);

    return (
        <div className='page'>
            <h1>
                Teachers
            </h1>
            <div className='card-horizontal-list'>
                {
                    teacherList.map((teacher, index) => 
                        <Card
                            key={index}
                            id={teacher.id}
                            name={teacher.name}
                            nationality={teacher.nationality}
                            star={teacher.star}
                            skills={teacher.skills}
                         />
                    )
                }
            </div>
        </div>
    )
}

export default TeacherListPage;