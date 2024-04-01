'use client'
import React from 'react'

const SingleWDComponent = (props: {info:string, icon:any, value:number}) => {
  return (
    <div className='grid grid-rows-3  gap-2 items-center font-semibold'>
        <div className='flex justify-center'>
            <p className='whitespace-nowrap text-4xl md:text-xl'>{props.info}</p>
        </div>

        <div className='flex flex-col  items-center gap-1'>
            <div className='text-7xl md:text-3xl lg:text-2xl'>{props.icon}</div>
        </div>

        <div className='flex flex-col  items-center gap-1'>
            <p>{props.value}</p>
        </div>

    </div>
  )
}

export default SingleWDComponent
