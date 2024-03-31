'use client'
import React, { useEffect, useState } from 'react';
import NavbarComponent from './NavbarComponent'
import HomePageComponent from './HomePageComponent'

const HoldAll = () => {
    const [searchValue, setSearchValue] = useState<string>('sacramento');
    const [loading, setLoading] = useState<boolean>(true);

    const [cityName, setCityName] = useState<string>('');
    const [country, setCountry] = useState<string>('');

    const [tog, setTog] = useState(false)

    const handleSearch = (value: string) => {
        setSearchValue(value);
    };

    useEffect(() => { 

        const getName = async (searchValue: string) => {
            const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=imperial`);

            const responseData = await promise.json();
            setCityName(responseData.city.name);
            setCountry(responseData.city.country);
            setLoading(false);
        };
        getName(searchValue)

        // const getCityNameAndCountry = async (latitude: number, longitude: number) => {
        //     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={YOUR_API_KEY}`);
        //     const data = await response.json();
        //     const cityName = data.name;
        //     const country = data.sys.country;
        //     return { cityName, country };
        // };
        // getCityNameAndCountry(searchValue);

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000); 

        return () => clearTimeout(timeout);
    }, [searchValue]);

    

    return (
        <div>
            {loading ? (
                <div className='flex items-center min-h-screen justify-center'>
                    <p className='loadingText'>
                        {'Loading...'.split('').map((letter, index) => (
                            <span key={index} className='bounce' style={{ animationDelay: `${index * 0.1}s` }}>{letter}</span>
                        ))}
                    </p>
                </div>
            ) : (
                <div>
                    <NavbarComponent handleSearch={handleSearch} cityName={cityName} country={country}/>
                    <HomePageComponent searchValue={searchValue} tog={tog} setTog={setTog}/>
                </div>
            )}
        </div>
    )
}

export default HoldAll
