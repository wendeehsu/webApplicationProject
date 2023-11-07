import React from 'react';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './containers/home';
import StudentTeacherList from './containers/student/teacherList/teacherList';
import StudentLessons from './containers/student/lesson';
import StudentTeacherPage from './containers/student/teacherList/teacherDetail';
import Onboard from './containers/onboard';

function App() { 
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/teacher/:id" element={<StudentTeacherPage/>} />
          <Route path="/teachers" element={<StudentTeacherList/>} />
          <Route path="/myLessons" element={<StudentLessons/>} />
          <Route path="/login" element={<Onboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
