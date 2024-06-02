import React from 'react'
import img from '../../../public/Rectangle 303.png'

export default function Background() {
  return (
    <div className="relative bg-cover bg-center h-64" style={{ backgroundImage: `url(${img})` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-8xl font-abel text-red1 flex items-center">
            4
            <span className="relative inline-block">
              <span className="text-8xl leading-none ">0</span>
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl leading-none">%</span>
                <span className="text-xs leading-none">OFF</span>
              </span>
            </span>
          </h1>
          <span className="text-xl text-white">|</span>
          <div>
            <p className="text-xl text-white">DON'T</p>
            <p className="text-xl text-white">Miss it</p>
          </div>
        </div>
      </div>
    </div>
  )
}
