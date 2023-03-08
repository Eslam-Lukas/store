import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import localApi from '../../database/data.json';

// export const fetchCategory = createAsyncThunk(
// 	'productsSlice/fetchCategory',
// 	async () => {
// 		const api = await fetch('https://fakestoreapi.com/products/categories');
// 		const data = await api.json();
// 		return data;
// 	},
// );
export const categories = [...new Set(localApi.map((ele) => ele.category))];
export const fetchCategory = createAsyncThunk(
	'productsSlice/fetchCategory',
	async () => {
		const api = await fetch(localApi);
		const data = await api.json();
		return data;
	},
);

const FilterSlice = createSlice({
	initialState: categories,
	name: 'FilterSlice',
	reducers: {
		filter: (state, action) => {
			state.push(action.payload);
		},
		clear: () => [],
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCategory.pending, (state, action) => {
			return;
		});
		builder.addCase(fetchCategory.fulfilled, (state, action) => {
			state.push(action.payload);
		});
		builder.addCase(fetchCategory.rejected, (state, action) => {});
	},
});
export const { filter, clear } = FilterSlice.actions;
export default FilterSlice.reducer;
