
import React from 'react'
import Image from "next/image";

const WeatherIconsComponent = ( props: React.HTMLProps<HTMLDivElement> & {name:string}) => {

  return (
    <div {...props}>
    <img
      src={`https://openweathermap.org/img/wn/${props.name}@4x.png`} alt={'weather-icon'}
      className='relative h-20 w-20 mx-auto' />
  </div>
  )
}

export default WeatherIconsComponent
