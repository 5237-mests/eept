import React from 'react'
import { StatesContext } from './StatesContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


function AvailableExams() {
        const {exams, setJob, setUserid, setEligble, setAllowedTime } = useContext(StatesContext)
        const nav =  useNavigate()
        const startExam = (exam)=>{
                setJob(exam.job.id);
                setUserid(exam.user.username)
                const alloweT = exam.job.allowedtime
                setAllowedTime(alloweT)
                setEligble(true)
                localStorage.setItem("eligble", true)
            nav("/exam")
        }
  return (
    <div className='container view-result'>
    <h1>Available Exams</h1>
        <ol>
            {exams.map(exam=>(!exam.exam_taken && (new Date() - new Date(exam.examDate))/60000 >= 0 && 
            (new Date() - new Date(exam.examDate))/60000 <= exam.job.allowedtime
            ) ?(
                <li key={exam.id}>{exam.job.name} - {} <button className='btn btn-link' onClick={()=>startExam(exam)} >Start</button></li>
            ):<></>)}
        </ol>
    </div>
  )
}

export default AvailableExams;
