import { User } from './user.types'

export interface ListState {
    lists: List[]
    list: List | null
    loading: boolean
}

export interface List {    
    _id: string
    title: string
    urlKey: string
    createdAt: Date
    user: string | User
}

export interface CreateList {    
    _id: string
    title: string
}

export interface UpdateList {    
    _id: string
    title: string
}