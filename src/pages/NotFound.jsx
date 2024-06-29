import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
     <div className='flex flex-col items-center mt-2'>
      <Link to="/" className="mb-4">
        <button className="bg-button text-white font-medium text-lg py-1 px-10 rounded cursor-pointer">
          Back To Home
        </button>
      </Link>
      <img
        className='object-cover max-w-full h-auto rounded shadow-lg'
        src="https://i.pinimg.com/736x/b8/fb/70/b8fb705699100d965d1ede440f63bd35.jpg"
        alt="Not Found"
      />
    </div>
    </>
  )
}
