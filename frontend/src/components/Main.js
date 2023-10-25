import React from 'react'
import { useEffect , useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/esm/Button'

function Main({logged, headers}) {
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState(0)
   
    const fetchApi =  async ()=> {
        const resp  =  await axios.get("http://localhost:8000/api/users/", {headers})
        setUsers(resp.data)
        alert(resp.data)
    } 
    const handleClick = (e)=>{
        setUserId(e)
    }
    // List all question on startup
    useEffect(()=>{
        fetchApi()
    }, [logged])
  return (
    <div>
        <p>Loading</p>
        <ul>
        {users.map(user=>(
            <li>{user.username}
            <Button onClick={()=> handleClick(user.id)}>User</Button>
            </li>
        ))}
        </ul>
        <h1>selected UserID {userId}</h1>
    </div>
  )
}

export default Main;
