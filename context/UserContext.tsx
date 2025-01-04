'use client'

import { UserContextTypes } from '@/types/user.types';
import { createContext, useState, useEffect, ReactNode, FC } from 'react'

const context: UserContextTypes = {
    loading: false
}

export const UserContext = createContext<UserContextTypes>(context);

export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, [])


    const value = {
        loading
    }

    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;