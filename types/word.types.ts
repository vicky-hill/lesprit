import { List } from './list.types'
import { User } from './user.types'

export interface WordState {
    words: Word[]
    word: Word | null
    results: Word[] | null
    loading: boolean
}

export interface Word {
    _id: string
    language: string
    foreign: string
    native: string
    rating: number
    dueDate: string
    createdAt: string
    list: List
    user: User
}

export interface CreateWord {
    foreign: string
    native: string
    list: string
}

export interface UpdateWord {
    wordId: string
    payload: {
        foreign?: string
        native?: string
        list?: string
        rating?: number
        dueDate?: string
    }
}