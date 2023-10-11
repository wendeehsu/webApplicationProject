import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentHome from './containers/student/home/home';
import StudentTeacherList from './containers/student/teacherList/teacherList';
import StudentLessons from './containers/student/lesson';
import StudentTeacherPage from './containers/student/teacherList/teacherDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/teacherDetail/:id" element={<StudentTeacherPage/>} />
          <Route exact path="/teacherList" element={<StudentTeacherList/>} />
          <Route exact path="/myLessons" element={<StudentLessons/>} />
          <Route path="/" element={<StudentHome/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
