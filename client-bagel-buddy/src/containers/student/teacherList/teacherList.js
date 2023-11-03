import React, { useState, useEffect } from 'react';
import { getAllTeachers } from "../../../api/user";
import Card from '../../../components/card';
import './teacherList.css';

function TeacherListPage() {
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        getAllTeachers().then((res) => {
            if (res.success) {
                let { data } = res;
                setTeacherList(data);
            } else {
                setTeacherList([]);
            }
        });
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
                            id={teacher._id}
                            name={teacher.name}
                            nativeLanguage={teacher.native_language}
                            star={teacher.points}
                            imgURL={teacher.img_url}
                            skills={teacher.skills.map((s) => s.skill)}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default TeacherListPage;