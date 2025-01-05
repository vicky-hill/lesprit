import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/utils/api'
import { Word, WordState, CreateWord, UpdateWord, } from '@/types/word.types'
      
const initialState: WordState = {
    words: [],
    word: null,
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

export const updateWord = createAsyncThunk('word/updateWord', async ({wordId, payload}: UpdateWord) => {
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
                state.words = [...state.Words, action.payload]
            })
            .addCase(updateWord.fulfilled, (state: any, action: any) => {
                state.words = state.words.map((word: Word) => word._id !== action.payload._id ? word : action.payload)
            })
            .addCase(deleteWord.fulfilled, (state: any, action: any) => {
                state.words = state.words.filter((word: Word) => word._id !== action.payload)
            })
    }
});

export default wordSlice.reducer;