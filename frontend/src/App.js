import './App.css';
import AddStudent from './components/AddStudent';
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
import AllStudents from './components/AllStudents';
import EditStudent from './components/EditStudent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  


function App() {
  return (
    <Router>
       <Header/>
       <ToastContainer />
     
        <Routes> 
         
            <Route path='/add' exact Component={AddStudent}/>  
            {/* <Route path='/allstudent' exact Component={AllStudents}/>  */}
            <Route path='/' exact Component={AllStudents}/> 
            <Route path='/edit/:studentId' exact Component={EditStudent}/> 
          
        </Routes>
    </Router>
  );
}

export default App;
