import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NavBar from './components/NavBar'
import Footer from './components/Footer';
import StatesProvider from './components/StatesContext';
import Home from './components/Home';
import Login from './components/Login';
import ExamQuestions from './components/ExamQuestions';
import ExamResult from './components/ExamResult';
import SignUpPage from './components/SignUpPage';
import ExamRegistration from './components/ExamRegistration';
import AllResults from './components/AllResults';
import AvailableExams from './components/AvailableExams';
import Profile from './components/Profile';
import BulkInsert from './components/BulkInsert';
import BulkInsertQuestions from './components/BulkInsertQuestions'
import ActivationStatus from './components/ActivationStatus';
import ResetPasword from './components/ResetPasword';
import ResetPaswordConfirm from './components/ResetPaswordConfirm';
function App() {
  return (
     <StatesProvider>
      <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/exam' element={<ExamQuestions/>}/>
            <Route path='/exam-result' element={<ExamResult/>}/>
            <Route path='/register' element={<SignUpPage/>}/>
            <Route path='/register-exam' element={<ExamRegistration/>}/>
            <Route path='/result-all' element={<AllResults/>}/>
            <Route path='/avails' element={<AvailableExams/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/bulk-insert' element={<BulkInsert/>}/>
            <Route path='/bulk-insert-questions' element={<BulkInsertQuestions/>}/>
            <Route path='/activate' element={<ActivationStatus/>}/>
            <Route path='/reset-password' element={<ResetPasword/>}/>
            <Route path='/reset-confirm' element={<ResetPaswordConfirm/>}/>
          </Routes>
          <Footer/>
      </Router>
     </StatesProvider>
  );
}
export default App;
