import { configureStore } from '@reduxjs/toolkit';
import ModifySlice from './slices/Modify-slice';
import CartSlice from './slices/Cart-slice';
import FilterSlice from './slices/Filter-slice';
import MoneySlice from './slices/Money-slice';
import ProductSlice from './slices/Product-slice';
import FormSlice from './slices/admin/Form-slice';

export const store = configureStore({
	reducer: {
		products: ProductSlice,
		modify: ModifySlice,
		filter: FilterSlice,
		cart: CartSlice,
		money: MoneySlice,
		formValidation: FormSlice,
	},
});
