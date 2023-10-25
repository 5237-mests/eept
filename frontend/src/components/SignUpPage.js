import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form';                                 
import Button from 'react-bootstrap/esm/Button'
import { Helmet } from 'react-helmet'
import '../CSS/SignUpPage.css';  
import API from './API';
import favicon from '../assets/images/favicon_io(2)/favicon-16x16.png'


function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [err, setErr] = useState(false);
  const [data, setData] = useState({})
  let navigate = useNavigate()
  const updateData = (e) =>{
      setData({
          ...data, [e.target.name]:e.target.value
      })
  }
  const sendData = async ()=>{
    try{
      const csrf = await API.get("auth/getcsrf/");
      console.log("The sign up csrf", csrf.data.csrftoken)
      API.defaults.headers.common["X-CSRFToken"] = `${csrf.data.csrftoken}`;
      console.log("signup data", data)
      const resp = await API.post("api/users/", data);
      if (resp.status === 200)
      {
        setErr(false);
        navigate("/activate");
         
      } 
    }
    catch(e)
    {
      setErr(true);
      console.log('error happend!', err);
    }
  }

  return (
    <div>
      <Helmet>
        <title>SignUpPage Page!</title>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      </Helmet>
      <div className='reg'>
        <div className='py-5 ms-auto me-auto'>
          {
          <Form className='forme' onSubmit={handleSubmit(sendData)}>
            <div className='container'>
              <div className='row'>
                  <div className='col-sm col'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>UserName: <Form.Control  type="text" {...register('username', { required: true })} onChange={updateData}/>
                        {errors.username && 
                          <p className='text-danger'>username is required.</p>}
                      </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                      <Form.Label>Email: <Form.Control type="email" placeholder="email@example.com"   {...register('email', { required: false })} onChange={updateData}/>
                        {errors.email && 
                          <p className='text-danger'>Email is required.</p>}
                      </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Current Position: <Form.Control {...register('curposition', { required: false })} onChange={updateData}/>
                      {errors.curposition && 
                        <p className='text-danger'>Current Position is required.</p>} 
                      </Form.Label>  
                    </Form.Group>
                  </div>

                  <div className='col-sm col'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>First Name: <Form.Control {...register('first_name', { required: true})} onChange={updateData}/>
                        {errors.last_name && 
                          <p className='text-danger'>First name is required.</p>} 
                      </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Last Name: <Form.Control {...register('last_name', { required: false })} onChange={updateData}/>
                        {errors.last_name && 
                          <p className='text-danger'>Last name is required.</p>}
                      </Form.Label>  
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Middle Name: <Form.Control  {...register('middlename', { required: false })} onChange={updateData}/>
                        {errors.middlename && 
                          <p className='text-danger'>Middle name is required.</p>}
                      </Form.Label>  
                    </Form.Group>
                  </div>
              </div>

              <div className='row pb-3'>
                <Form.Group className="mb-3 " controlId="formBasicPassword">
                  <Form.Label>Password: 
                    <Form.Control  type="password" {...register('password', { required: true })} onChange={updateData}/>
                    {errors.password && 
                      <p className='text-danger'>Password is required.</p>}
                  </Form.Label>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Signup
                </Button>
              </div>
              <p>Already have account? <Link className='text-dark' to='/login'>Login</Link></p>
            </div>
          </Form>
          }
        </div>
      </div>
    </div>
  )
}

export default SignUpPage;
