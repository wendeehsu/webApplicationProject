import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from "../../api/user";

import StudentHomePage from "../student/home/home";
import TeacherHomePage from "../teacher/lesson";

function HomePage() {
    const [isStudent, setIsStudent] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getProfile()
            .then((res) => {
                if (res.success) {
                    let { data } = res;
                    setIsStudent(data.type === 0);
                } else {
                    alert("Login Session expired. Please login again");
                    navigate("/login");
                }
            })
    }, []);

    return (
        isStudent ? <StudentHomePage /> : <TeacherHomePage />
    )
}

export default HomePage;