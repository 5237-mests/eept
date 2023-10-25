import React, { useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useForm} from 'react-hook-form'
import API from './API'
import { useNavigate } from 'react-router-dom'

function ResetPasword() {
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
        const resp = await API.post("auth/reset-password/", data)
        nav("/reset-confirm")
      //   setTimeout(()=> {
      //     setComplete(true)
      //     setTimeout(()=> setComplete(false), 4000)
      //     setLoad(false)
      //  }, 2000)
       }
       catch (e) {
        setLoad(false)
        setComplete(true)
       }
  }
  return (
    <div className='container bg-light'>
         <Form className='view-result m-5 p-5' onSubmit={handleSubmit(sendData)}>
            <div className='container'>
              <div className='row'>
                  <div className='col-sm col'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>UserName: <Form.Control  type="text" {...register('username', { required: true })} className='mt-2' onChange={updateData}/>
                        {errors.username && 
                          <p className='text-danger'>username is required.</p>}
                      </Form.Label>  
                    </Form.Group>
                  </div>
              </div>
              <div className='row py-3'>
              {complete && <p className='text-success  font-weight-bold bg-light text-center'>Process Complted! </p>}
                {load && <p className='text-danger font-weight-bold bg-light text-center'>Processing .... </p>}
                <Button className='col-sm-3 col-md-2 col-lg-1 ms-3' variant="primary" type="submit">
                
                  Reset
                </Button>
              </div>
            </div>
          </Form>
    </div>
  )
}

export default ResetPasword