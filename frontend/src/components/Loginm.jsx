import React, { useState, useContext} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { StatesContext } from './StatesContext';
import * as Yup from 'yup';
import CSRFToken from './CSRFToken';
import API from './API';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {setLogged, setUserid, setIsAuthenticated, setIsAdmin} = useContext(StatesContext);

  const [data, setData] = useState({})
  let [err, setErr] = useState(false);
  let navigate = useNavigate()

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email('Invalid username address')
      .required('username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const  handleSubmit = async (values, { resetForm }) => {
    // You can add your login logic here
    API.defaults.headers["X-CSRFToken"] = Cookies.get('csrftoken');
    console.log('Logging in with:', values);

    let logResp = await API.post('auth/login', values);

    if (logResp.status === 200)
    {
      setIsAuthenticated(true)
      localStorage.setItem("isAuthenticated", true); 
      const resp = await API.get(`api/users/${data.username}/`)  // get who is logged in isAdmin is_staff
      setLogged(true)
      setUserid(data.username)
      const superuser = resp.data.is_superuser
      if (superuser)
      {
        setIsAdmin(true)
        localStorage.setItem("isAdmin", true)
      }
      else {
        setIsAdmin(false)
        localStorage.setItem("isAdmin", false)
      }
      localStorage.setItem("logged", true)
      localStorage.setItem("userid", data.username)
      navigate("/")
    }
    else{
      setIsAuthenticated(false);
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("logged", false);
      setLogged(false);
      setErr(true);
    }

    resetForm();
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <CSRFToken />
          <div>
            <label htmlFor="username">Username</label>
            <Field type="text" id="username" name="username" />
            <ErrorMessage name="username" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
