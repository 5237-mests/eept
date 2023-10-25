import React from 'react'
import { Helmet } from 'react-helmet'
import favicon from '../assets/images/favicon_io(1)/favicon-16x16.png'

function Home() {
  return (
    <div className='home'>
      <Helmet>
        <title >Home Page</title>
        <link rel="icon" type="image/png" href={favicon} sizes="16x16" />
      </Helmet>
      <div className='row text-center font-weight-bold'>
        <h1 className='col mt-5'>
          <span className='text-success'>Ethiopian </span>
          <span className='text-warning'>Electric </span>
          <span className='text-danger'>Power</span>
        </h1>
        
      </div>
    </div>
  )
}

export default Home
