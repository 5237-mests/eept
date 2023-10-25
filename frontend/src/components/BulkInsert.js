import React, { useState } from 'react'
import { useContext } from 'react'
import  Button  from 'react-bootstrap/Button'
import { StatesContext } from './StatesContext'
import API from './API'
import Select from 'react-select'
import Login from './Login'
import Home from './Home'

function BulkInsert() {
    const {userid, isAdmin} = useContext(StatesContext)
    const [jobs, setAllJobs] = useState([])
    const [data, setData] = useState({})
    const [selectdJob, setSelectedJob] = useState("")
    const [complete, setComplete] = useState(false)
    const [load, setLoad] = useState(false)
    const getData = async () => {
        const resp = await API.get("api/jobs/")
        let jbs = []
        for (let j of resp.data)
        {
            jbs.push({"value": j.id, "label":j.jobCode})
        }
    setAllJobs(jbs)
        
    }

    const sendData = async ()=>{
            const payload = {"job": selectdJob,
                            "empId": data.empId,
                             "year": data.year,
                             "month": data.month,
                             "day": data.day,
                              "hour": data.hour,
                              "minute": data.minute
                            }
            try {
                setLoad(true)
                setComplete(false)
                const csrf = API.get("auth/getcsrf/")
                API.defaults.headers["X-CSRFToken"] = `${(await csrf).data.csrftoken}`
                const resp = await API.post("api/exam-cand/bulk/", payload)
                console.log('api resp',resp.data)
                 
                 setTimeout(()=> {
                    setComplete(true)
                    setTimeout(()=> setComplete(false), 4000)
                    setLoad(false)
                 }, 2000)
                 
            }
            catch (e) {
                console.log("Complte with Error")
            }
    }
    const onChange = (e)=>{
        const newVal = new Date(e.target.value)
        if (e.target.type === "datetime-local")
        {
            setData(data=>({...data, "year": newVal.getFullYear(),
            "month": newVal.getMonth() + 1, 
            "day": newVal.getDate(),
            "hour": newVal.getHours(),
            "minute": newVal.getMinutes()
            }))
        }
        else{
            setData(data => ({...data, "empId": e.target.value}))
        }
    }
    const getJobData = (e)=>{
            setSelectedJob(e.value)
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
    <div className='container'>
       <div className='row text-center justify-space-around view-result mt-5'>
        <div className='col-lg-4  '>
        <Button onClick={getData}>Update Jobs List</Button>
        </div>
        <div className='col-lg-4'>
        <Select options={jobs} onChange={(e)=>getJobData(e)}>
        
       </Select>
        </div>
        <div className='form'>

        <div className='col-md-5 col-lg-3 me-auto ms-0  text-start'>
            <label className='form-label'> Employee IDs</label>
             </div>
            <div className='row'>
           <div className='col'>
           <textarea name="employees" rows="5" onChange={(e)=>onChange(e)} className='form-control' placeholder='Enter Employee ID Separated by Comma'></textarea>
         
           </div>
                </div>   
            <div className='col-md-5 col-lg-3 me-auto ms-0  text-start'>
            <label className='form-label'> Exam Date</label>
             </div>
             <div className='col-md-5 col-lg-3 me-auto'>
           
            <input  onChange={(e)=>onChange(e)} className=' form-control' type="datetime-local" name="date"/>
             </div>
            {complete && <p className='text-success  font-weight-bold bg-light text-center'>Process Complted! </p>}
            {load && <p className='text-danger font-weight-bold bg-light text-center'>Processing .... </p>}
            <button className='row btn btn-primary mt-3' onClick={sendData}>Submit</button>

        </div>
       </div>
    </div>
  )
}

export default BulkInsert