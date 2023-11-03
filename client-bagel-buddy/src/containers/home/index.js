import React, { useState, useEffect } from 'react';
import StudentHomePage from "../student/home/home";
import TeacherHomePage from "../teacher/lesson";

function HomePage() {
    const [isStudent, setIsStudent] = useState(true);
    
    return (
        isStudent ? <StudentHomePage /> : <TeacherHomePage />
    )
}

export default HomePage;