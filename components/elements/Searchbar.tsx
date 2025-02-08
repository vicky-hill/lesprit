'use client'

import { clearSearch, searchWords } from '@/store/slices/word.slice'
import { AppDispatch } from '@/store/store'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form, { Input } from './Form'


function Searchbar({ }) {
    const [search, setSearch] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        search
            ? dispatch(searchWords(search))
            : dispatch(clearSearch());
    }, [search])

    const onChange = (e: any) => {
        setSearch(e.target.value);
    }

    return (
        <div className='w-1/3 mx-auto'>
            <Form onSubmit={(e: any) => e.preventDefault()}>
                <Input type="text" placeholder="Search" value={search} onChange={onChange} />
            </Form>
        </div>
    )
}

export default Searchbar;