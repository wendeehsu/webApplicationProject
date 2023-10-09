import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentHome from './containers/student/home/home';
import StudentTeacherLsit from './containers/student/teacherList/teacherList';
import StudentLessons from './containers/student/lesson/lesson';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/teacherList" element={<StudentTeacherLsit/>} />
          <Route exact path="/myLessons" element={<StudentLessons/>} />
          <Route path="/" element={<StudentHome/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
