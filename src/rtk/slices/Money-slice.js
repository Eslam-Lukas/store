import { createSlice } from '@reduxjs/toolkit';

export const MoneySlice = createSlice({
	initialState: [],
	name: 'MoneySlice',
	reducers: {
		money: (state, action) => {
			state.push(action.payload);
		},
		clear: () => [],
	},
});

export const { money, clear } = MoneySlice.actions;
export default MoneySlice.reducer;
