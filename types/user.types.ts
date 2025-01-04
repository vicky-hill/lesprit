export interface UserContextTypes {
    currentUser: User | null
    loading: boolean
    checkUserSession?: any
}

export interface User {
    _id: string
    email: string
}