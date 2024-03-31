import React from 'react'
import WeatherIconsComponent from './WeatherIconsComponent'

const ForcastComponent = ( props:{ day:string, iconName:string, high:string, low:string;}) => {
  return (
    <div className='text-center py-4'>
        <p className="mb-1">{props.day}</p>
        
        <WeatherIconsComponent name={props.iconName}/>
        
        <p className="mt-1">
            {props.low}
            &nbsp;
            {props.high}
        </p>
    </div>
  )
}

export default ForcastComponent
