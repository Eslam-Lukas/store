import { createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
const Patterns = {
	firstName: /[a-zA-z]+/,
	lastName: /[a-zA-z]+/,
	phone: /\+?\d{11,12}/,
	email: /^[a-zA-Z]+[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
	password:
		// /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"?><,./\';:][\\=-])(?=.*[^s]).{8,}$/,
		/[a-zA-Z]/,
};
const initialState = {
	errors: {
		firstName: true,
		lastName: true,
		phone: true,
		email: true,
		password: {
			valueAct: true,
			firstValue: '',
			secondValue: '',
		},
	},
	feedback: {
		firstName: 'feild requierd',
		lastName: 'feild requierd',
		phone: 'feild requierd',
		email: '',
		password: '',
	},
	valid: {
		firstName: false,
		lastName: false,
		phone: false,
		email: false,
		password: false,
	},
	inpValue: {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		password: '',
	},
	order: {
		info: {
			name: '',
			phone: '',
			state: '',
			city: '',
			adress: '',
			save: false,
			note: '',
		},
		valid: {
			name: false,
			phone: false,
			state: false,
			city: false,
			adress: false,
			save: false,
			note: true,
		},
		order: {},
		saveAs: '',
	},
	accounts: localStorage.getItem('admin')
		? JSON.parse(localStorage.getItem('admin'))
		: [],
	login: localStorage.getItem('active')
		? JSON.parse(localStorage.getItem('active'))
		: false,
	submit: false,
};
let Pattern;

export const FormSlice = createSlice({
	initialState,
	name: 'FormSlice',
	reducers: {
		feildEnter: (state, action) => {
			const { name, id, type } = action.payload;
			if (type === 'rigster' || type === 'login') {
				state.inpValue[name] = '';
				if (name === 'password' && id === 'password') {
					state.errors.password.firstValue = '';
				}
				if (name === 'password' && id === 'passwordConfirm') {
					state.errors.password.secondValue = '';
				}
			} else if (type === 'order') {
				if (name === 'note') {
					state.order.info[name] = '';
					state.order.valid[name] = true;
				} else {
					state.order.info[name] = '';
					state.order.valid[name] = false;
				}
			}
		},
		blurValid: (state, action) => {
			const { name, value, type } = action.payload;
			Pattern = Patterns[name];
			switch (type) {
				case 'order':
					const { order } = state;
					let title = order.info[name];
					let valid = order.valid[name];

					switch (true) {
						case name === 'finish':
							order.order = value;
							state.order.info = initialState.order.info;
							break;
						//if loged in
						case state.login.length > 0:
							const account = state.login[0].email;
							const info = state.accounts.filter((e) =>
								e.email === account ? e : false,
							)[0]; // all acount info as object
							// check data
							switch (value) {
								case '':
									// if valu null
									switch (name) {
										case 'name':
											title = `${info.firstName} ${info.lastName}`;
											valid = true;
											break;
										case 'phone':
											title = info.phone;
											valid = true;
											break;

										case 'save-as':
											state.order.saveAs = value;
											break;
										default:
											valid = false;
											break;
									}
									// if valu not null
									break;
								default:
									switch (name) {
										case 'phone':
											if (Pattern.test(value)) {
												title = value;
												valid = true;
											}
											break;
										case 'save-as':
											state.order.saveAs = value;
											break;
										case 'saved':
											order.info = value;
											order.saveAs = '';
											order.info.save = 'false';
											Object.keys(order.valid).map((e) =>
												e !== 'save'
													? (order.valid[e] = true)
													: (order.valid[e] = false),
											);

											break;
										default:
											title = value;
											valid = true;
											break;
									}
									break;
							} // if not loged in
							break;
						case !state.login:
							if (value !== '') {
								if (name === 'phone' && !Pattern.test(value)) {
									valid = false;
								} else if (name === 'note') {
									title = value;
									valid = true;
								} else if (name === 'save-as') {
									break;
								} else {
									title = value;
									valid = true;
								}
							}

							break;
					}
					if (name !== 'save-as') {
						state.order.info[name] = title;
						state.order.valid[name] = valid;
					}
					break;
				case 'rigster':
				case 'login':
					switch (name) {
						case 'email':
							let checked;
							const emails = state.accounts.map((e) => e.email);
							state.errors.email = true;
							state.valid.email = false;
							if (type === 'rigster') {
								for (let i = 0; i < emails.length; i++) {
									if (emails[i] === value) {
										checked = false;
										break;
									} else {
										checked = true;
									}
								}
							} else if (type === 'login') {
								for (let i = 0; i < emails.length; i++) {
									if (emails[i] === value) {
										checked = true;
										break;
									} else {
										checked = false;
									}
								}
							}
							switch (true) {
								case !Pattern.test(value): //false
									state.feedback.email = 'enter a valid email ';
									break;
								case type === 'rigster':
									switch (true) {
										case state.accounts.length > 0 && !checked:
											state.feedback.email = 'account exist';
											break;
										default:
											state.feedback.email = 'looks good';
											state.errors.email = false;
											state.valid.email = true;
											break;
									}
									break;
								case type === 'login':
									switch (true) {
										case state.accounts.length === 0:
											state.feedback.email = 'rigster firist';
											break;
										case !checked:
											state.feedback.email = 'password or account  not exist';
											break;
										case checked:
											state.feedback.email = 'looks good';
											state.errors.email = false;
											state.valid.email = true;
											break;
									}
									break;
							}
							break;
						//email
						case 'password':
							switch (true) {
								case Pattern.test(value):
									switch (true) {
										case type === 'login' && state.accounts.length > 0:
											let password;
											for (let i = 0; i < state.accounts.length; i++) {
												if (state.accounts[i].email === state.inpValue.email) {
													password = state.accounts.map((e) => e.password)[i];
													break;
												} else {
													password = false;
												}
											}
											if (state.valid.email && value === password) {
												state.feedback.password = 'looks good';
												state.errors.password.valueAct = false;
												state.valid.password = true;
											} else {
												state.feedback.password =
													'password or account not exist';
												state.errors.password.valueAct = true;
												state.valid.password = false;
											}
											break; //login
										case state.errors.password.firstValue === '':
											state.errors.password.firstValue = value;
											break;
										case state.errors.password.secondValue === '':
											state.errors.password.secondValue = value;
											if (value === state.errors.password.firstValue) {
												state.feedback.password = 'looks good ';
												state.errors.password.valueAct = false;
												state.valid.password = true;
											} else {
												state.feedback.password = 'password not match confirm';
												state.errors.password.valueAct = true;
												state.valid.password = false;
											}
											break;
									}
									break;
								case !Pattern.test(value):
									state.errors.password.valueAct = true;
									state.valid.password = false;
									state.feedback.password = 'feild requaierd ';
									if (state.errors.password.firstValue === '') {
										state.errors.password.firstValue = value;
									} else {
										state.errors.password.secondValue = value;
									}
									switch (true) {
										case type === 'login':
											state.feedback.password = 'password or account not exist';
											break;

										case state.errors.password.firstValue === '':
											state.feedback.password =
												'must contain at least one special quracter';
											break;
										case state.errors.password.secondValue === '':
											state.feedback.password = 'password not match ';
											break;
									}
									break;
							}
							if (
								state.errors.password.firstValue !==
								state.errors.password.secondValue
							) {
								state.errors.password.valueAct = true;
								state.valid.password = false;
							}
							break;
						//password
						default:
							switch (true) {
								case !Pattern.test(value):
									state.errors[name] = true;
									state.valid[name] = false;
									if (state.inpValue[name] !== '') {
										state.feedback[name] = "can't be empty";
									} else {
										state.feedback[name] = 'not match pattern';
									}

									break;

								default:
									state.feedback[name] = 'looks good';
									state.errors[name] = false;
									state.valid[name] = true;
									break;
							}
							break; //default break
					}
					if (state.valid[name]) {
						state.inpValue[name] = value;
					}
					break;
			}
		},
		submitCheck: (state, action) => {
			const { type, value } = action.payload;
			let inputValueObj;
			if (type === 'rigster') {
				inputValueObj = Object.values(state.inpValue);
			} else if (type === 'login') {
				inputValueObj = [state.inpValue.email, state.inpValue.password];
			} else if (type === 'logout') {
				inputValueObj = true;
			} else if (type === 'order') {
				inputValueObj = Object.values(state.order.info);
				if (inputValueObj.includes('true')) {
					state.order.info.save = state.order.saveAs;
					inputValueObj[inputValueObj.indexOf('true')] = state.order.saveAs;
				}
			}
			let checkEmpty,
				i = 0,
				accountsArr = [],
				add = [];
			while (i < inputValueObj.length) {
				checkEmpty = false;
				if (inputValueObj[i] === '') {
					if (type === 'order' && i >= inputValueObj.length - 2) {
						break;
					} else {
						checkEmpty = true;
						break;
					}
				}
				i++;
			}
			if (type === 'login' || type === 'rigster') {
				if (JSON.parse(localStorage.getItem('admin'))) {
					accountsArr = JSON.parse(localStorage.getItem('admin'));
					add = Array.from(accountsArr);
				}
			} else if (type === 'order') {
				if (JSON.parse(localStorage.getItem('orders'))) {
					accountsArr = JSON.parse(localStorage.getItem('orders'));
					add = Array.from(accountsArr);
				}
			}
			if (value) {
				if (checkEmpty) {
					state.submit = false;
				} else if (type === 'rigster') {
					add.push(state.inpValue);
					localStorage.setItem('admin', JSON.stringify(add));
					state.accounts = JSON.parse(localStorage.getItem('admin'));
					state.submit = true;
				} else if (type === 'login') {
					for (let i = 0; i < accountsArr.length; i++) {
						if (
							accountsArr[i].email === state.inpValue.email &&
							accountsArr[i].password === state.inpValue.password
						) {
							add = [
								{
									email: accountsArr[i].email,
									password: accountsArr[i].password,
								},
							];
							localStorage.setItem('active', JSON.stringify(add));
							state.submit = true;
							break;
						}
					}
				} else if (type === 'logout') {
					localStorage.removeItem('active');
					state.login = false;
				} else if (type === 'order') {
					let parel = { info: state.order.info, order: state.order.order };
					add.push(parel);
					localStorage.setItem('orders', JSON.stringify(add));
					state.submit = true;
				}
			}
		},
		resetState: (state, action) => {
			const { type } = action.payload;
			let objects;
			if (state.submit) {
				return produce(state, (draftState) => {
					draftState.submit = initialState.submit;
					if (type === 'rigster' || type === 'login') {
						objects = ['errors', 'valid', 'feedback', 'inpValue', 'login'];
						objects.forEach((obj) => {
							draftState[obj] = initialState[obj];
						});
					} else {
						draftState[type] = initialState[type];
					}
				});
			}
		},
	},
});
export const { feildEnter, submitCheck, blurValid, resetState } =
	FormSlice.actions;
export default FormSlice.reducer;
