import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
	initialState: [],
	name: 'CartSlice',
	reducers: {
		addToCart: (state, action) => {
			const product = state.find((pro) => pro.id === action.payload.id);
			if (product) {
				product.count += 1;
			} else {
				let clonePro = { ...action.payload, count: 1 };
				state.push(clonePro);
			}
		},
		minFromCart: (state, action) => {
			const product = state.find((pro) => pro.id === action.payload.id);
			if (!product.count >= 0) {
				product.count -= 1;
			}
		},
		removeFromCart: (state, action) => {
			return state.filter((pro) => pro.id !== action.payload.id);
		},
		clearCart: () => [],
	},
});
export const { addToCart, minFromCart, removeFromCart, clearCart } =
	CartSlice.actions;
export default CartSlice.reducer;
