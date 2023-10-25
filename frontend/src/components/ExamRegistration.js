import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom';
import API from './API'

function ExamRegistration() {
  let [err, setErr] = useState(false);
  const [data, setData] = useState({})
  let navigate = useNavigate()
  const updateData = (e) =>{
      setData({
          ...data, [e.target.name]:e.target.value
      })
  }
  const sendData = async (e)=>{
      e.preventDefault()
      try {
        const resp = await API.post("api/exam-register/", data)
        if (resp.status === 200)
        {
            navigate("/login")
        } 
      } catch(error) {
        setErr(error)
      }
  }

  return (
   <div className='container mt-5 bg-secondary justify-space-around'>
    <div className=' pt-5 ms-auto me-auto'>
      {
        <Form>
            {err && <span className='text-danger'>UserName Already taken or check your Email</span>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>users: <Form.Control name="users" type="text" placeholder="Users ID List" onChange={updateData} />
              </Form.Label>  
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Job Code: <Form.Control name="job" type="text" placeholder="Job Code" onChange={updateData} />
              </Form.Label>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Exam Date: <Form.Control name="exam-date" type="datetime-local" placeholder="Job Code" onChange={updateData} /></Form.Label>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={sendData}>
              Register All
            </Button>
           
        </Form>
      }
    </div>
   </div>
  )
}

export default ExamRegistration;
