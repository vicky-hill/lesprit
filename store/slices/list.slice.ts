import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '@/utils/api'
import { List, ListState, CreateList, UpdateList, } from '@/types/list.types'
      
const initialState: ListState = {
    lists: [],
    list: null,
    loading: true
}

export const getLists = createAsyncThunk('lists/getLists', async () => {
    try {
        const lists: List[] = await api.get('/lists');
        return lists;
    } catch (err) {
        console.log(err);
    }
});

export const getList = createAsyncThunk('list/getList', async () => {
    try {
        const list: List = await api.get('/lists');
        return list;
    } catch (err) {
        console.log(err);
    }
});
    
export const createList = createAsyncThunk('list/createList', async (payload: CreateList) => {
    try {
        const list: List = await api.post('/lists', payload);
        return list;
    } catch (err) {
        console.log(err);
    }
});

export const updateList = createAsyncThunk('list/updateList', async ({ listId, payload}: {listId: string, payload: UpdateList}) => {
    try {
        const list: List = await api.put(`/lists/${listId}`, payload);
        return list;
    } catch (err) {
        console.log(err);
    }
});

export const deleteList = createAsyncThunk('list/deleteList', async (listId: string) => {
    try {
        const list: List = await api.delete(`/lists/${listId}`);
        return list;
    } catch (err) {
        console.log(err);
    }
});

export const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLists.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getLists.fulfilled, (state: any, action: any) => {
                state.loading = false
                state.lists = action.payload
            })
            .addCase(getList.pending, (state: any) => {
                state.loading = true
            })
            .addCase(getList.fulfilled, (state: any, action: any) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(createList.fulfilled, (state: any, action: any) => {
                state.lists = [...state.Lists, action.payload]
            })
            .addCase(updateList.fulfilled, (state: any, action: any) => {
                state.lists = state.lists.map((list: List) => list._id !== action.payload._id ? list : action.payload)
            })
            .addCase(deleteList.fulfilled, (state: any, action: any) => {
                state.lists = state.lists.filter((list: List) => list._id !== action.payload)
            })
    }
});

export default listSlice.reducer;