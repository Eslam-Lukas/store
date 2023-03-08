import { createSlice } from '@reduxjs/toolkit';
// let check = [];
// const initialState = localStorage.getItem('modify')
// 	? JSON.parse(localStorage.getItem('modify'))
// 	: [];
let removedId = [];
const arr = localStorage.getItem('modify')
	? JSON.parse(localStorage.getItem('modify')).map((e) => {
			if (e.opreation === 'removed') {
				removedId.push(e.id);
			}
	  })
	: [];
const initialState = {
	products: localStorage.getItem('modify')
		? JSON.parse(localStorage.getItem('modify'))
		: [],
	removedId,
	accepted: false,
};
export const ModifySlice = createSlice({
	initialState,
	name: 'Modify',
	reducers: {
		addPro: (state, action) => {
			if (
				Object.keys(action.payload).length === 7 &&
				Object.keys(action.payload.rating).length === 2
			) {
				const pro = { opreation: 'add', ...action.payload };
				state.products.push(pro);
				localStorage.setItem('modify', JSON.stringify(state.products));
				state.accepted = true;
			}
		},
		removepro: (state, action) => {
			let checked = state.products.find((pro) => pro.id === action.payload.id);
			if (checked) {
				checked.opreation = 'removed';
			} else {
				const pro = { opreation: 'removed', ...action.payload };
				state.products.push(pro);
				state.removedId.push(pro.id);
			}
			localStorage.setItem('modify', JSON.stringify(state.products));
			state.accepted = true;
		},
		done: (state) => {
			state.accepted = false;
		},
	},
});
export const { addPro, removepro, done } = ModifySlice.actions;
export default ModifySlice.reducer;
