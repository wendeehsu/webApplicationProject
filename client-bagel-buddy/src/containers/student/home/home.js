import React, { useEffect, useState } from 'react';
import Card from '../../../components/card';
import { getAllTeachers } from "../../../api/user";
import './home.css';

function HomePage() {
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        getAllTeachers().then((res) => {
            if (res.success) {
                let { data } = res;
                data = data.filter((d, i) => i < 4);
                setTeacherList(data);
            } else {
                setTeacherList([]);
            }
        });
    }, []);

    return (
        <div className='page'>
            <div className='home-point-earn-section'>
                <div className='home-text-section'>
                    <h1>Section title here</h1>
                    <p>text text text text text text</p>
                </div>

                {/* TODO: add class in the css file if you want to style the image */}
                <img className='' src='' alt="decoration" />
            </div>

            <h1>
                Upcoming Lessons
            </h1>
            <div className='card-horizontal-list'>
                {[1, 2, 3].map((i) => (
                    <Card
                        id={i}
                        key={`card-${i}`}
                        name="Alysa Yang"
                        nationality="U.S.A"
                        star={4}
                        timeslot="Sep 20, Wed, 20:00 - 20:30"
                        meetLink="https://meet.google.com/zzw-cqtw-nkt"
                    />))
                }
            </div>

            <h1>
                Recommended Teachers
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

export default HomePage;