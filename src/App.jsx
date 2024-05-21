import './App.css';
import AdminLogin from './Pages/AdminLogin';
import Dashboard from './Pages/Dashboard';
import MyPerformance from './Pages/MyPerformance';
import MyProfile from './Pages/MyProfile';
import StudentDb from './Pages/StudentDb';
import StudentLogin from './Pages/StudentLogIn';
import StudentSignUp from './Pages/StudentSignUp';
import { Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route exact path='/' element={<Dashboard/>}/>
          <Route path='/login' element={<StudentLogin/>}/>
          <Route path='/myperformance' element={<MyPerformance/>}/>
          <Route path='/myprofile' element={<MyProfile/>}/>
          <Route path='/signup' element={<StudentSignUp />}/>
          <Route path='/adminlogin' element={<AdminLogin />}/>
          <Route path='/studentdb' element={<StudentDb />}/>
          <Route path='/myperformance' element={<MyPerformance />}/>
      </Routes>
    </div>
  );
}

export default App;
