import { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import { NavbarProps } from '@/interface/interface';
import { MdMyLocation, MdOutlineLocationOn, MdWbSunny } from 'react-icons/md';
import { PiMoonFill } from 'react-icons/pi';


const NavbarComponent: React.FC<NavbarProps> = ({ handleSearch, cityName, country }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [tog, setTog] = useState(false)

    useEffect(() => {
        if(!tog){
          document.documentElement.classList.add('dark');
        }else{
          document.documentElement.classList.remove('dark');
        }
      }, [tog])



    return (
        <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
            <div className="h-[80px] w-full flex justify-between items-center max-x-7xl px-3 mx-auto">
                <section className="hidden md:flex items-center gap-2">
                    <h2 className="text-gray-500 text-3xl">Weather App</h2>
                </section>

                <section className="flex gap-2 items-center justify-center text-slate-900/80 md:justify-start">
                    <MdOutlineLocationOn className="text-3xl text-slate-900" />
                    <p className=" text-sm whitespace-nowrap">{cityName}, {country}</p>
                    <SearchComponent onSearch={handleSearch} />
                </section>


                <div className="flex">
                    {isMenuOpen && (
                        <div className={`${isMenuOpen ? 'animate-fade-in' : 'animate-fade-out'} bg-white`}>
                            <section className='text-slate-900 flex flex-row items-center'>
                                <MdMyLocation className="text-2xl w-8 h-8 leading-9 rounded-lg border hover:opacity-50 cursor-pointer" />
                                <button onClick={() => {setTog(!tog)}}>
                                    {!tog ? 
                                        <MdWbSunny  className="text-3xl w-8 h-8 leading-9 rounded-lg border" />
                                        :
                                        <PiMoonFill className="text-3xl w-8 h-8 leading-9 rounded-lg border" />
                                    }
                                </button>
                            </section>
                        </div>
                    )}
                    <button onClick={toggleMenu} className="text-2xl text-slate-900 hover:opacity-50 cursor-pointer ">
                        ☰
                    </button>
                </div>

            </div>
        </nav>

    );
}

export default NavbarComponent;
