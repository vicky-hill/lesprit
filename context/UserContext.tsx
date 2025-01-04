'use client'

import { User, UserContextTypes } from '@/types/user.types'
import api from '@/utils/api'
import { auth } from '@/utils/firebase'
import { createContext, useState, useEffect, ReactNode, FC } from 'react'

const context: UserContextTypes = {
    currentUser: null,
    loading: false
}

export const UserContext = createContext<UserContextTypes>(context);

export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        checkUserSession();
    }, [])

    const checkUserSession = async () => {
        try {
            const user: User = await api.get('/user');

            const unsubscribe = auth.onAuthStateChanged(() => {
                unsubscribe();
            });

            user && setCurrentUser(user);

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    const logout = () => {
        auth.signOut();
        setCurrentUser(null);
        localStorage.removeItem('token');
    }


    const value = {
        loading,
        currentUser,
        checkUserSession
    }

    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;