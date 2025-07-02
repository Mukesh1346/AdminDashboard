import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Login from '../auth/Login'
import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Banner from '../../Pages/Banner/Banner'
import ShowUser from '../../Pages/ShowUsers/Page'

// import AllCategory from '../../Pages/Category/AllCategory'
// import AddCategory from '../../Pages/Category/AddCategory'
// import EditCategory from '../../Pages/Category/EditCategory'

export default function Home() {
  const login = sessionStorage.getItem("login");

  if (!login) {
    // If not logged in, redirect all to login
    return (
      <Routes>
        <Route path="/*" element={<Login />} />
      </Routes>
    );
  }

  // If logged in, show header and app routes
  return (
    <>
      <Header />
      <div className="rightside">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/banner" element={<Banner/>} />
          <Route path="/showUsers" element={<ShowUser/>} />
          
          {/* Uncomment when components are ready */}
          {/* <Route path="/all-category" element={<AllCategory />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/edit-category/:_id" element={<EditCategory />} /> */}
          
          {/* Fallback route */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}
