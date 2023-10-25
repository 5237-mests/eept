import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from 'react-hook-form'
import API from './API'
import { useNavigate } from 'react-router-dom'

function ResetPaswordConfirm() {
  const [data, setData] = useState({})
  const [complete, setComplete] = useState(false)
  const [load, setLoad] = useState(false)
  const nav = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const updateData = (e) =>{
      setData(data=> ({...data, [e.target.name]: e.target.value}))
  }
  const sendData = async () => {
       try{
        setLoad(true)
        setComplete(false)
        const csrf = await API.get("auth/getcsrf/");
        console.log("The sign up csrf", csrf.data.csrftoken)
        API.defaults.headers.common["X-CSRFToken"] = `${csrf.data.csrftoken}`;
        const resp = await API.post("auth/reset-password-done/", data)
        nav("/login")
       }
       catch (e)
       {
        setLoad(false)
        setComplete(true) // uladqaqweqsexadp
        nav("/reset-password")
       }
  }
  return (
    <div className='container my-3 log'>     
      <Form className='bg-light m-5 p-5' onSubmit={handleSubmit(sendData)}>
        <div className=''>
          <div>
            <div className='col-sm col'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>UserName: <Form.Control  type="text" {...register('username', { required:    true })} onChange={updateData}/>
                  {errors.username && 
                    <p className='text-danger'>username is required.</p>}
                </Form.Label>  
              </Form.Group>
            </div>
          </div>

          <div>
            <div className='col-sm col'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>New password: <Form.Control  type="password" {...register('password', { required: true })} onChange={updateData}/>
                  {errors.username && 
                    <p className='text-danger'>password required</p>}
                </Form.Label>  
              </Form.Group>
            </div>
          </div>

          <div>
            <div className='col-sm col'>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Your Code: <Form.Control  type="text" {...register('code', { required: true })} onChange={updateData}/>
                  {errors.username && 
                    <p className='text-danger'>reset Code Required</p>}
                </Form.Label>  
              </Form.Group>
            </div>
          </div>
        
          <div className='pb-3'>
            {complete && <p className='text-success  font-weight-bold bg-light text-center'>Process Complted! </p>}
              {load && <p className='text-danger font-weight-bold bg-light text-center'>Processing .... </p>}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default ResetPaswordConfirm;
