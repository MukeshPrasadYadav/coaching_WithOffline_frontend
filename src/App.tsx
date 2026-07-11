// src/App.tsx

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import Home from './pages/otherPages/Home'
import ProtectedRoutes from './helpers/ProtectedRoutes'
import ProtectedAuth from './helpers/ProtectedAuth'
import SignUpPage from './pages/auth/SignUpPage'
import Layout from './Components/Layout'
import Batches from './coaching/pages/Batch'
import Setting from './coaching/pages/Setting'
import TeacherProfile from './pages/otherPages/TeacherProfile'
import CompleteProfile from './pages/otherPages/CompleteProfile'
const App = () => {
  return (

   <Router>
  <Routes>

    <Route
      path="/login"
      element={
        <ProtectedAuth>
          <LoginPage />
        </ProtectedAuth>
      }
    />

    <Route
      path="/signup"
      element={
        <ProtectedAuth>
          <SignUpPage />
        </ProtectedAuth>
      }
    />

    <Route path ="/completeProfile" element={<CompleteProfile />} />

    {/* Protected Layout */}
    <Route
      element={
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      }
    >

      <Route path="/home" element={<Home />} />

      {/* Future pages */}
      <Route path="/batches" element={<Batches />} />
      <Route path="/settings" element ={<Setting />} />
      <Route path="/teacherProfile" element ={<TeacherProfile />} />
      {/* <Route path="/students" element={< />} />
      <Route path="/teachers" element={<Teachers />} />
      
      <Route path="/settings" element={<Settings />} /> */}
    </Route>

    <Route
      path="/"
      element={
        <ProtectedAuth>
          <LoginPage />
        </ProtectedAuth>
      }
    />

  </Routes>
</Router>
  )
}

export default App