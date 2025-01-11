'use client'

import { clearSearch, searchWords } from '@/store/slices/word.slice'
import { AppDispatch } from '@/store/store'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'


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
        <div>
            <i className="fas fa-search input-icon" />
            <input className="searchbar rounded-input" type="text" placeholder="Search Vocabulary" value={search} onChange={onChange} />
        </div>
    )
}

export default Searchbar;