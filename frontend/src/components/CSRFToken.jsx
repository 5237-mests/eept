import React, { useState, useEffect } from 'react'
import API from './API'

function CSRFToken() {
  const [csrftoken, setcsrftoken] = useState('');

  const getCookie = (name) => {
      let cookieValue = null;
      console.log(document.cookie)
      if (document.cookie && document.cookie !== '') {
          let cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              let cookie = cookies[i].trim();
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      console.log('first', cookieValue)
      return cookieValue;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await API.get('auth/getcsrf');
        console.log(resp.data)
      } catch (error) {
        console.log('c', error)
      }
    };
console.log('count*')
    fetchData();
    setcsrftoken(getCookie('csrftoken'));
  }, [])

  console.log('crf', csrftoken)

  return (
      <input type="hidden"  value={csrftoken}/>
  )
}

export default CSRFToken