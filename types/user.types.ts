export type Language = { foreign: string, native: string }

export interface UserContextTypes {
    currentUser: User | null
    loading: boolean
    checkUserSession?: any
}

export interface User {
    _id: string
    firebaseId: string
    name: string
    email: string
    languages: Language[]
}