import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import localApi from '../../database/data.json';
export const fetchProducts = createAsyncThunk(
	'productsSlice/fetchProducts',
	async (cat) => {
		const api = await fetch('https://fakestoreapi.com/products');
		const data = await api.json();
		return data;
	},
);

export const fetchProductsCategory = createAsyncThunk(
	'productsSlice/fetchProductsCategory',
	async (cat) => {
		const api = await fetch(
			`https://fakestoreapi.com/products/category/${cat}`,
		);
		const data = await api.json();
		return data;
	},
);
const productsSlice = createSlice({
	initialState: [],
	name: 'productsSlice',
	reducers: {
		clearProducts: () => [],
		filterdProducts: (state, action) => {
			return state.filter((pro) => pro.category === action.payload);
		},
		addProduct: (state, action) => {
			return state.push(action.payload);
		},
		removeProduct: (state, action) => {
			return state.filter((pro) => pro.id !== action.payload);
		},
		localFetch: (state, action) => {
			return state.push(action.payload);
		},
	},
	extraReducers: (buldier) => {
		buldier.addCase(fetchProducts.pending, (state, action) => {
			return 'loading';
		});
		buldier.addCase(fetchProducts.fulfilled, (state, action) => {
			return action.payload;
		});
		buldier.addCase(fetchProducts.rejected, (state, action) => {
			return localApi;
		});
		buldier.addCase(fetchProductsCategory.pending, (state, action) => {
			return 'loading';
		});
		buldier.addCase(fetchProductsCategory.fulfilled, (state, action) => {
			return action.payload;
		});
		buldier.addCase(fetchProductsCategory.rejected, (state, action) => {
			return 'not found';
		});
	},
});

export const {
	addProduct,
	removeProduct,
	filterdProducts,
	localFetch,
	clearProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
