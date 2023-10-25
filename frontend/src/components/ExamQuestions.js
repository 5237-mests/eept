import React, { useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Button  from 'react-bootstrap/Button';
import ExamQuestionsForm from './ExamQuestionsForm';
import NavigatorButton from './NavigatorButton'
import { StatesContext } from './StatesContext';
import CountdownTimer from './RemainingTime';
import API from './API';
import Home from './Home'
import Login from './Login';

function ExamQuestions() {
  const [loginSuccesss] = useState(true);
  let navigate = useNavigate()

  let {
    job,
    setIsloading,
    setPosts,
    posts,
    setStarted,
    currentPage,
    setCurrentPage,
    postsPerPage,
    logged,
    eligble} = useContext(StatesContext);
    const [progress, setProgress] = useState(false)
  const fetchPosts = async () => {
    
    setIsloading(true);
  try{
    const res = await API.get(`api/questions/${job}`)
    setPosts(res.data);
    setIsloading(false);
    setStarted(true)
    setProgress(true)
    localStorage.setItem("isLoading", false)
    localStorage.setItem("started", true)
    localStorage.setItem("progress", true)
    navigate("/exam")
  }
  catch (e)
  {
    setIsloading(false)
    setStarted(false)
    setProgress(false)
    localStorage.setItem("isLoading", false)
    localStorage.setItem("started", false)
    localStorage.setItem("progress", false)
    navigate("/")
  }
    
  }
  const currentPosts = posts.slice(currentPage, currentPage + postsPerPage);
  // paginate
  const paginatePrev = ()=> {
    setCurrentPage(currentPage = currentPage >= 1 ? currentPage - postsPerPage : 0)
  }
  const paginateNext = ()=> {
    setCurrentPage(currentPage = currentPage < posts.length - 1? currentPage + postsPerPage : posts.length - 1)
  }

  // if (logged) {
  //   setTimeout(()=>{
  //     setLoginSuccesss(false);
  //   }, 72000)
  // }

if (!logged )
{
  return <Login/>
}
if (!eligble)
{
  return <Home/>
}
  return (
    <div className='container-fluid '>
      {
      eligble && !progress? 
      <div className='row justify-content-center bcg'>
       
        <div className=' mt-1 text-center view-result'>
          {logged && loginSuccesss && <h5 className='text-success border border-light bg-light py-3 text-center'>You Logged in successfully!</h5>}
          <Button className='col-6 col-md-2 col-lg-2' onClick={fetchPosts}>Start Exam</Button>
        </div>
      </div>
      :
      <div className='row justify-content-center mt-5'>
        <h2 className='col-sm-6 col-lg-4'>Exam on Progress!</h2> 
        <hr/>

        <CountdownTimer />
        <hr/>

        <NavigatorButton paginatePrev={paginatePrev} paginateNext={paginateNext}/>
        <hr/>

        <p>{currentPage} of {posts.length - 1}</p>
        <ExamQuestionsForm currentPosts={currentPosts}/>   
      </div>
      }
    </div>
  )
}

export default ExamQuestions;
