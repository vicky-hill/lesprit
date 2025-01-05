'use client'

import api from '@/utils/api'
import { getLists } from '@/store/slices/list.slice'
import { getWords } from '@/store/slices/word.slice'
import { AppDispatch } from '@/store/store'
import { User, UserContextTypes } from '@/types/user.types'
import { auth } from '@/utils/firebase'
import { createContext, useState, useEffect, ReactNode, FC } from 'react'
import { useDispatch } from 'react-redux'

const context: UserContextTypes = {
    currentUser: null,
    loading: false
}

export const UserContext = createContext<UserContextTypes>(context);

export const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        checkUserSession();
    }, [])

    useEffect(() => {
        if (currentUser) {
            dispatch(getWords());
            dispatch(getLists());
        }
    }, [currentUser])

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