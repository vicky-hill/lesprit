import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { api } from '@/utils/api'
import { Word, WordState, CreateWord, UpdateWord, } from '@/types/word.types'
import { RootState } from '../store';


const initialState: WordState = {
    words: [],
    word: null,
    results: null,
    loading: true
}

export const getWords = createAsyncThunk('words/getWords', async () => {
    try {
        const words: Word[] = await api.get('/words');
        return words;
    } catch (err) {
        console.log(err);
    }
});

export const getWord = createAsyncThunk('word/getWord', async () => {
    try {
        const word: Word = await api.get('/words');
        return word;
    } catch (err) {
        console.log(err);
    }
});

export const createWord = createAsyncThunk('word/createWord', async (payload: CreateWord) => {
    try {
        const word: Word = await api.post('/words', payload);
        return word;
    } catch (err) {
        console.log(err);
    }
});

export const updateWord = createAsyncThunk('word/updateWord', async ({ wordId, payload }: UpdateWord) => {
    try {
        const word: Word = await api.put(`/words/${wordId}`, payload);
        return word;
    } catch (err) {
        console.log(err);
    }
});

export const deleteWord = createAsyncThunk('word/deleteWord', async (wordId: string) => {
    try {
        const word: Word = await api.delete(`/words/${wordId}`);
        return word;
    } catch (err) {
        console.log(err);
    }
});

export const searchWords = createAsyncThunk('word/searchWords', async (search: string, { getState }) => {
    try {
        const state = getState() as RootState;
        const words = state.wordReducer.words;

        return words.filter(word => (
            word.foreign.toLowerCase().includes(search.toLowerCase()) ||
            word.native.toLowerCase().includes(search.toLowerCase())
        ))
    } catch (err) {
        console.log(err);
    }
});


export const clearSearch = createAction('word/clearSearch', () => {
    return {
        payload: null,
    };
})

export const wordSlice = createSlice({
    name: 'words',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWords.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getWords.fulfilled, (state: any, action: any) => {
                state.loading = false
                state.words = action.payload
            })
            .addCase(getWord.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getWord.fulfilled, (state: any, action: any) => {
                state.loading = false
                state.word = action.payload
            })
            .addCase(createWord.fulfilled, (state: any, action: any) => {
                state.words = [...state.words, action.payload]
            })
            .addCase(updateWord.fulfilled, (state: any, action: any) => {
                const updatedWords = state.words.map((word: Word) => word._id !== action.payload._id ? word : action.payload)
                
                state.words = updatedWords
                state.results = state.results && updatedWords
            })
            .addCase(deleteWord.fulfilled, (state: any, action: any) => {
                const updatedWords = state.words.filter((word: Word) => word._id !== action.payload._id);
                const updatedResults = state.results.filter((word: Word) => word._id !== action.payload._id);
                
                state.words = updatedWords
                state.results = state.results && updatedResults
            })
            .addCase(searchWords.fulfilled, (state: any, action: any) => {
                state.results = action.payload
            })
            .addCase(clearSearch, (state, action) => {
                state.results = null;
            })
    }
});

export default wordSlice.reducer;