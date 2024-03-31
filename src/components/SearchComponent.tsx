import React, { ChangeEvent, useState } from 'react'
import { SearchProps } from '@/interface/interface';
import { BsSearch } from 'react-icons/bs'


const SearchComponent = (props: SearchProps) => {

    const {onSearch} = props;
    const [value, setValue] = useState('Search location...');

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(value);
            console.log(value);
        }
    }

    const handleClick = () => {
        onSearch(value);
    }

  return (
    <div className='relative w-full text-slate-800'>
        <button type='submit' className='absolute left-0 top-0 mt-3 ml-4'
            onClick={handleClick}
        >
            <BsSearch className='h-4 w-4 ' />
        </button>

        <input className='bg-white border border-slate-900 cursor-pointer h-10 px-5 pl-10 w-full rounded-full text-sm focus:outline-none focus:border-blue-500 '
            placeholder={value}
            type={'search'}
            name={'search'}
            onChange={searchHandler}
            onKeyDown={handleKeyDown}
        />
    </div>
  )
}

export default SearchComponent

