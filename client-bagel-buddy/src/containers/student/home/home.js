import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from '../../../components/card';
import { getAllTeachers } from "../../../api/user";
import { getUpcomingLesson } from '../../../api/lesson';
import { getProfile } from '../../../api/user';

import './home.css';

function HomePage() {
    const [teacherList, setTeacherList] = useState([]);
    const [lessonList, setLessonList] = useState([]);
    const location = useLocation();
    const [navList, setNavList] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        getAllTeachers().then((res) => {
            if (res.success) {
                let { data } = res;
                data = data.filter((d, i) => d.points >= 3);
                setTeacherList(data);
            } else {
                setTeacherList([]);
            }
        });
        getUpcomingLesson()
            .then((res) => {
                if (res.success) {
                    let data = res.data
                        .map((lesson) => {
                            lesson.lesson.timeslotStart = new Date(lesson.lesson.timeslotStart)
                                .toLocaleString("en-US", { timeZone: "America/Chicago" });
                            return lesson;
                        })
                        .filter((lesson, i) => i < 4);;
                    setLessonList(data);
                } else {
                    alert(res.message);
                }
            });
    }, []);
    useEffect(() => {
    getProfile()
            .then((res) => {
                if (res.success) {
                    let { data } = res;
                    setUser(data);
                    if (data.type === 0) {
                        setNavList([{
                            text: 'Teachers',
                            path: '/teachers'
                        }, {
                            text: 'Lessons',
                            path: '/myLessons'
                        }]);
                    } else {
                        setNavList([]);
                    }
                }
            })
    }, [location.pathname]);

    return (
        <div className='page'>
            <div className='home-point-earn-section'>
                <div className='home-text-section'>
                    <h1>{user ? user.name : ''}, you've earned {user ? user.points : ''} points!</h1>
                    <p>Keep working! We'll send you a surprise package once you reach 100 points!</p>
                </div>

                {/* TODO: add class in the css file if you want to style the image */}
                <img src='../../images/home_section.png' alt="decoration" />
            </div>

            <h1>
                Upcoming Lessons
            </h1>
            <div className='card-horizontal-list'>
                {(lessonList === undefined || lessonList.length === 0) ?
                    (
                        <p>* There is no upcoming lesson. *</p>
                    ) : (lessonList.map((lesson) => (
                        <Card
                            id={lesson.lesson._id}
                            key={`card-${lesson.lesson._id}`}
                            name={lesson.teacher.name}
                            nativeLanguage={lesson.teacher.native_language}
                            imgURL={lesson.teacher.img_url}
                            star={lesson.teacher.points}
                            timeslot={lesson.lesson.timeslotStart}
                            meetLink={lesson.lesson.meetLink}
                        />))
                    )
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