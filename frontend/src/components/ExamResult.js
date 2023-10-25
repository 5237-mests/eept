import React, { useContext, useEffect, useState } from 'react'
import {StatesContext} from './StatesContext'
import API from './API';
import '../CSS/AllResults.css'
import Login from './Login';

function ExamResult() {
    const {score, userid}  =useContext(StatesContext);
    const [pass, setPass] = useState(false);
    const [results, setResults] = useState([])

   useEffect(()=>{
      (
         async ()=>{
            
            try{
               const examresult = await API.get(`api/exam-result/${userid}/`)
               setResults(examresult.data)
            }
            catch(e)
            {
               setResults([])
            }
         }
      )()
      function checkpass(){
         if (score.score / score.total >= 0.5) {
            setPass(true);
         }
      }
      checkpass();
   }, []);
   if (!userid)
   {
      return (
         <Login/>
      )
   }
  return (
    <div className='container-fluid bcg '>
      <div className='pt-5'>
      <table className='table text-dark '>
        <thead className='bg-secondary '>
          <th>Employee Id</th>
          <th>First Name</th>
          <th> Last Name</th>
          <th> Job Code</th>
          <th> Score</th>
        </thead>
         {results && results.map(result => (
        <tr key={result.id}>
          <td>{result.user.username}</td>
          <td>{result.user.first_name}</td>
          <td>{result.user.last_name}</td>
          <td>{result.job.jobCode}</td>
          <td>{Math.round(result.score * 100 / result.total, 2)}%</td>
        </tr>
        ))}
      </table>
      {pass && <h2>You well done! Have a good day!</h2>}
      </div>
    </div>
  )
}

export default ExamResult;
