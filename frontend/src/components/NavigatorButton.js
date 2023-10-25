import React from 'react'
import Button  from 'react-bootstrap/Button'

const NavigatorButton = ({ paginatePrev, paginateNext }) => {
  return (
    <div className='row justify-content-between'>
      <Button
        className='col-4 col-md-2 col-lg-1'
        onChange={(e) => {e.preventDefault()}}
        onClick={() => paginatePrev()}
        type="submit"
      >
        {'<'} Previous
      </Button>

      <Button
        className='col-4 col-md-2 col-lg-1'
        onChange={(e) => {e.preventDefault()}}
        onClick={() => paginateNext()}
        type="submit"
      >
        Next {'>'}
      </Button>

    </div>
  )
}

export default NavigatorButton;
