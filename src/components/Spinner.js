import React from 'react'
import loading from './loading.gif'

const Spinner = () => {
    return (
      <div>
        <div className="container text-center">
        <img src={loading} alt="loading" />
        </div>
      </div>
    )
}

export default Spinner