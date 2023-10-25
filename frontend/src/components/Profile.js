import Button from 'react-bootstrap/Button'
import React, { useContext, useState } from 'react'
import API from './API'
import { StatesContext } from './StatesContext'
function Profile() {
  const {userid} = useContext(StatesContext)
  const [user ,setUser] = useState({})
  const [complete, setComplete] = useState(false)
  const [load, setLoad] = useState(false)
  const [data, setData] = useState(
    {"username": user.username || "",
  "email": user.email || "", 
  "first_name": user.first_name  || "",
  "last_name": user.last_name || "",
  "curposition": user.curposition || "",
  "middlename": user.middlename || "",
    })
  const getMe = async () => {
    
    const resp = await API.get(`auth/users/me/${userid}/`)
    setUser(resp.data)
    setData(resp.data)
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in data)
    {
      if (data[key] === "")
      {
        data[key] = user[key]
      }
    }
    setLoad(true)
                setComplete(false)
    const csrf = await API.get("auth/getcsrf/") //free to get csrf
    API.defaults.headers["X-CSRFToken"] = `${csrf.data.csrftoken}`; 
    const update = await API.put(`auth/users/me/${data.username}/`, data)
    console.log(update.data)
    setTimeout(()=> {
      setComplete(true)
      setTimeout(()=> setComplete(false), 1000)
      setLoad(false)
   }, 1000)

  }
const onChange = (e) => {
  setData(data => ({...data, [e.target.name]: e.target.value}))
}
  return (
    <div className='container text-center view-result mt-5'>
      <Button className='mt-3 mb-3' onClick={getMe}>Get My Detail</Button>
      <form onSubmit={(e)=>handleSubmit(e)}>
        
      <div className="form-group row">
        <label for="username" className="col-sm-2 col-form-label">Username</label>
          <div className="col-sm-10">
            <input type="text" readOnly className="form-control" name="username" onChange={(e)=> onChange(e)} value={data.username}/>
          </div>
      </div>
      <div className="form-group row">
        <label for="email" className="col-sm-2 col-form-label">Email: </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" name="email" onChange={(e)=> onChange(e)} value={data.email}/>
          </div>
      </div>
      <div className="form-group row">
        <label for="first_name" className="col-sm-2 col-form-label">FirstName: </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="first_name" onChange={(e)=> onChange(e)} value={data.first_name}/>
          </div>
      </div>
      <div className="form-group row">
        <label for="middlename" className="col-sm-2 col-form-label">MiddleName: </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="middlename" onChange={(e)=> onChange(e)} value={data.middlename}/>
          </div>
      </div>
      <div className="form-group row">
        <label for="last_name" className="col-sm-2 col-form-label">LastName: </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" name="last_name" onChange={(e)=> onChange(e)}  value={data.last_name}/>
          </div>
      </div>
      <div className="form-group row">
        <label for="curposition" className="col-sm-2 col-form-label">Current Position: </label>
          <div className="col-sm-10">
            <input type="text" readOnly className="form-control" name="curposition" onChange={(e)=> onChange(e)} value={data.curposition}/>
          </div>
      </div>
      <div className="col-auto mt-4">
      {complete && <p className='text-success  font-weight-bold bg-light text-center'>Process Complted! </p>}
            {load && <p className='text-danger font-weight-bold bg-light text-center'>Processing .... </p>}
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
      </div>
  </form>
    </div>
  )
}

export default Profile;
