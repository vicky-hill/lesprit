import { User } from './user.types'
import { Word } from './word.types'

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
    image: string
    words: Word[]
}

export interface CreateList {    
    title: string
}

export interface UpdateList {    
    _id: string
    title: string
}