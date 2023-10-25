import React, { useState } from 'react'
import Select from 'react-select'
import { StatesContext } from './StatesContext'
import { useContext } from 'react'
import '../CSS/AllResults.css'
import API from './API'
import Home from './Home'
import Login from './Login'
import Button  from 'react-bootstrap/Button'

function AllResults() {
    const {userid, isAdmin} = useContext(StatesContext);
    const [results, setResults] = useState([])
    const [jobs, setJobs] = useState([])
    const updateData = async ()=>{
          try {
            const resp2 = await API.get("api/jobs/")
            const res = []
            console.log(resp2.data, "resp2")
            for (let data of resp2.data) {
              res.push({"value":data.id, "label": data.jobCode})
            }
            setJobs([{"value": "", "label":"ALL"}, ...res])
          }
          catch (e) {
            
          }
         
      }
  const getDetail = async (e) =>{
    let url = null;
    if (e.value){
      url = `api/exam-result-per-job/${e.value}`
    } else {
        url = `api/exam-result/`
    }
    try{
      const resp = await API.get(url)
    console.log(resp.data)
    setResults(resp.data)
    }
    catch (e) {
      alert("No Result Available")
    }
  }

  if (!userid)
{
    return (
        <Login/>
    )
}
else if (userid && !isAdmin)
{
  return (
    <Home/>
  )
}
  return (
    <div className='container-fluid mt-3 view-result'>
       <div className='row justify-content-center'>
        <div className='col-sm-3 col-lg-2'>
          <Button onClick={updateData}>Update</Button>
        </div>
        <div className='col-sm-3 col-lg-2 me-auto'>
        {jobs && <Select options={jobs} onChange={(e)=>getDetail(e)}/>}
        </div>
       </div>
       <table className='table mt-5'>
        <thead className='bg-secondary'>
         <tr>
         <th>Employee Id</th>
          <th>First Name</th>
          <th> Last Name</th>
          <th> Job Code</th>
          <th> Score</th>
         </tr>
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
    </div>
  )
}

export default AllResults;
