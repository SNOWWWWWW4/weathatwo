export interface Weather {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}

export interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface Coord {
    lat: number;
    lon: number;
}

export interface List {
    dt: number;
    main: MainClass;
    weather: WeatherElement[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
    rain?: Rain;
}

export interface Clouds {
    all: number;
}

export interface MainClass {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface Rain {
    "3h": number;
}

export interface Sys {
    pod: Pod;
}

export enum Pod {
    D = "d",
    N = "n",
}

export interface WeatherElement {
    id: number;
    main: MainEnum;
    description: Description;
    icon: string;
}

export enum Description {
    BrokenClouds = "broken clouds",
    ClearSky = "clear sky",
    LightRain = "light rain",
    ModerateRain = "moderate rain",
    OvercastClouds = "overcast clouds",
    ScatteredClouds = "scattered clouds",
}

export enum MainEnum {
    Clear = "Clear",
    Clouds = "Clouds",
    Rain = "Rain",
}

export interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

export interface HomePageProps {
    searchValue: string;
    tog: boolean;
    setTog: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavbarProps {
    handleSearch: (value: string) => void;
    cityName: string;
    country: string;
}

export type SearchProps = {
    onSearch: (value: string) => void;
}