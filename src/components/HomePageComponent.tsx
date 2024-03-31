import React, { useEffect, useState } from 'react'
import WeatherIconsComponent from './WeatherIconsComponent';
import SingleWDComponent from './SingleWDComponent';
import ForcastComponent from './ForcastComponent';

import { HomePageProps, Weather } from '@/interface/interface'
import { format, parseISO } from 'date-fns'
import { CgEye } from 'react-icons/cg';
import { WiHumidity } from 'react-icons/wi';
import { BsWind } from 'react-icons/bs';
import { PiWarningCircleBold } from 'react-icons/pi';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from '../utils/localStorage'

const HomePageComponent: React.FC<HomePageProps> = ({ searchValue, tog, setTog}) => {

  const [data, setData] = useState<Weather>({} as Weather);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  const getWeather = async (searchValue: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=imperial`);
    const responseData = await promise.json();
    setData(responseData);
    setLoading(false);
  };

  const dataArr = data.list;

  const handleStarClick = () => {
    const city = `${data.city.name}, ${data.city.country}`;
    if (!favorites.includes(city)) {
      saveToLocalStorage(city);
      setFavorites([...favorites, city]);
    } else {
      removeFromLocalStorage(city);
      setFavorites(favorites.filter((fav) => fav !== city));
    }
  };

  const removeCity = (cityName: string) => {
    removeFromLocalStorage(cityName);
    setFavorites(favorites.filter((fav) => fav !== cityName));
  };

  useEffect(() => {
    if(!tog){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  }, [tog])


  useEffect(() => {
    getWeather(searchValue);
    setFavorites(getLocalStorage());
  }, [searchValue]);

  if (loading) {
    return <div className='flex items-center min-h-screen justify-center'><p className='loadingText2'>Getting Data...</p></div>;
  }


  return (
    <div className='gap-4 min-h-screen dark:text-gray-100 dark:bg-slate-900 duration-100'>
      {/* Navbar */}

      <main className='px-3 max-w-7xl mx-auto min-h-screen gap-9 w-full p-10 pt-4 '>
        <section className='space-y-5 mt-5'>
          {/* heading ? */}
          <div className='flex flex-col md:flex-row justify-between text-3xl'>
            <div className="flex items-center">
              <h1>{data && data.city.name}, {data && data.city.country} </h1>
              <div className=''> {favorites.includes(`${data.city.name}, ${data.city.country}`) ? (
                <AiFillStar onClick={handleStarClick} className="text-yellow-500 cursor-pointer" />
              ) : (
                <AiOutlineStar onClick={handleStarClick} className="text-yellow-500 cursor-pointer" />
              )}</div>
            </div>
            <h1>{format(parseISO(data?.list[0]?.dt_txt ?? ""), "EEEE")} {format(parseISO(data?.list[0]?.dt_txt ?? ""), "dd.MM.yyyy")}</h1>
          </div>

          
          <section className='flex flex-col sm:flex-row gap-4'>
            {/* first box */}
            <div className='border rounded-xl w-1/2 grid mx-auto lg:grid-cols-2'>
              <div className='w-full flex flex-col items-center justify-center'>
                <span className='text-4xl'>
                  {data && `${data.list[0].main.temp}°F`}
                </span>
                <div className='text-xs text-center'>
                  <p className="mb-1">
                    Feels like: {data && `${data.list[0].main.feels_like} °F`}
                  </p>
                  <p>
                    {data && `${data.list[0].main.temp_min}°↓`}
                    &nbsp;
                    {data && `${data.list[0].main.temp_max}°↑`}
                  </p>
                </div>
              </div>

              <div className='w-full flex flex-col items-center justify-center'>
                <img src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`} alt={'weather-icon'} className='relative h-24 w-24' />
                <p className='capitalize text-center px-4'>{data && data.list[0].weather[0].description}</p>
              </div>
            </div>

            {/* Second box */}
            <div className=' flex w-full py-2 px-4 h-[175px] justify-between border rounded-xl gap-4 overflow-x-auto shadow-sm ms:order-last flex-row order-3'>
              <SingleWDComponent info={'Visibility'} icon={<CgEye />} value={data && data.list[0].visibility} />
              <SingleWDComponent info={'Humidity'} icon={<WiHumidity />} value={data && data.list[0].main.humidity} />
              <SingleWDComponent info={'Wind Speed'} icon={<BsWind />} value={data && data.list[0].wind.speed} />
              <SingleWDComponent info={'Air Pressure'} icon={<PiWarningCircleBold />} value={data && data.list[0].main.pressure} />
            </div>

            {/* third box */}
            {/* favorites */}
            <div className={`w-2/4 h-[175px] order-last mx-auto ${!tog ? 'bg-white/30 border' : 'border-cyan-500'} rounded-xl py-1 px-1 shadow-sm`}>
              <p className='text-center text-2xl'>Favorites</p>
              <div className='overflow-y-scroll flex flex-col align-center'>
                {favorites.map((cityName, index) => (
                  <div key={index} className='flex align-center justify-between px-2'>
                    <span>{cityName}</span>
                    <button onClick={() => removeCity(cityName)}>x</button>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </section>

        {/* Hourly */}
        <section>
          <p className="flex w-full flex-col gap-4 mt-8 text-2xl">3 hour forcast</p>
          <div className="flex gap-4">
            <div className='w-full sm:border rounded-xl flex flex-col transition-transform duration-1000 ease-in-out mt-2'>
              {/* weather and Icon  for today*/}
              <div className='flex gap-10 sm:gap-16 overflow-x-auto w-full justify-evenly pb-4'>
                {dataArr.slice(0, 6).map((d, i) => (
                  <div key={i} className='flex flex-col justify-center items-center gap-2 text-xs font-semibold'>
                    <WeatherIconsComponent className='w-20 h-20' name={d.weather[0].icon} />
                    <p className='whitespace-nowrap'>{format(parseISO(d.dt_txt), "h:mm a")}</p>
                    <p>{`${d?.main.temp ?? 0}°`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5 day forcast */}
        <section className='flex w-full flex-col gap-4 '>
          <p className="flex w-full flex-col gap-4 mt-8 text-2xl"> 5 day forcast</p>
          <div className=' grid lg:grid-cols-5 md:grid-cols-3 sm:w-full bg-white/30 border rounded-xl '>
            <ForcastComponent day={format(parseISO(data?.list[8]?.dt_txt ?? ""), "EEEE")} iconName={data.list[8].weather[0].icon} high={data && `${data.list[8].main.temp_max}°↑`} low={data && `${data.list[8].main.temp_min}°↓`} />
            <ForcastComponent day={format(parseISO(data?.list[16]?.dt_txt ?? ""), "EEEE")} iconName={data.list[16].weather[0].icon} high={data && `${data.list[16].main.temp_max}°↑`} low={data && `${data.list[16].main.temp_min}°↓`} />
            <ForcastComponent day={format(parseISO(data?.list[24]?.dt_txt ?? ""), "EEEE")} iconName={data.list[24].weather[0].icon} high={data && `${data.list[24].main.temp_max}°↑`} low={data && `${data.list[24].main.temp_min}°↓`} />
            <ForcastComponent day={format(parseISO(data?.list[32]?.dt_txt ?? ""), "EEEE")} iconName={data.list[32].weather[0].icon} high={data && `${data.list[32].main.temp_max}°↑`} low={data && `${data.list[32].main.temp_min}°↓`} />
            <ForcastComponent day={format(parseISO(data?.list[39]?.dt_txt ?? ""), "EEEE")} iconName={data.list[39].weather[0].icon} high={data && `${data.list[39].main.temp_max}°↑`} low={data && `${data.list[39].main.temp_min}°↓`} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePageComponent