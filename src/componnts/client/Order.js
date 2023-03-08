import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import index from '../../innerIndex';
import {
	blurValid,
	feildEnter,
	resetState,
	submitCheck,
} from '../../rtk/slices/admin/Form-slice';

export default function Order() {
	const dispatch = useDispatch();
	const finalCheck = useSelector((state) => state.formValidation.order.valid);
	const Validation = useSelector((state) => state.formValidation.submit);
	const login = useSelector((state) => state.formValidation.login);
	const order = useSelector((state) => state.formValidation.order.order);
	let saved = [];
	let navBtn;
	let savedAdd = [];
	const handeBlur = (e) => {
		const name = e.target.name;
		const type = 'order';
		let value = e.target.value;
		if (e.target.id === 'save-check') {
			e.target.checked ? (e.target.value = true) : (e.target.value = false);
		} else if (e.target.id === 'save-click') {
			e.target.value = e.target.previousElementSibling.value;
		} else if (e.target.getAttribute('data-value')) {
			value = savedAdd[e.target.getAttribute('data-value')];
			document
				.querySelectorAll('.order-form')
				.forEach((e) => (e.value = value[e.name]));
		}
		dispatch(blurValid({ name, type, value }));
	};
	const handelFocus = (e) => {
		dispatch(feildEnter({ name: e.target.name, type: 'order' }));
	};
	const handelSubmit = (e) => {
		let checked, arrLenght;
		let unKnown = Object.keys(finalCheck).find((e) => e === 'finish');
		if (unKnown) {
			arrLenght = Object.values(finalCheck).length - 3;
		} else {
			arrLenght = Object.values(finalCheck).length - 2;
		}

		for (let i = 0; i < arrLenght; i++) {
			if (Object.values(finalCheck)[i] === true) {
				checked = true;
			} else {
				checked = false;
				break;
			}
		}
		dispatch(submitCheck({ type: 'order', value: checked }));
	};

	const savedAdress = () => {
		let btn = [];
		if (login.length > 0) {
			if (localStorage.getItem('orders')) {
				JSON.parse(localStorage.getItem('orders')).map((e) => {
					saved.push(e.info.save);
					savedAdd.push(e.info);
				});
			}
			if (saved.length > 0) {
				for (let i = 0; i < saved.length; i++) {
					let variant;
					if (saved[i] !== 'false') {
						i % 2 === 0 ? (variant = 'primary') : (variant = 'success');
						btn.push(
							<Button
								key={i}
								variant={variant}
								data-value={i}
								name="saved"
								onClick={handeBlur}
								className="ms-2">
								{saved[i]}
							</Button>,
						);
					}
				}
			}
		}
		if (btn.length > 0) {
			return btn;
		}
	};
	useEffect(() => {
		index();
	});
	useEffect(() => {
		dispatch(resetState({ type: 'order' }));
		if (Validation) {
			document.querySelectorAll('.order-form').forEach((e) => (e.value = ''));
		}
	}, [Validation]);
	useEffect(() => {
		submitBtn();
		let selectors = document.querySelectorAll('.order-selector');
		Object.keys(order).length <= 0
			? selectors.forEach((e) => e.setAttribute('disabled', true))
			: selectors.forEach((e) => e.removeAttribute('disabled'));
	}, [order]);
	const submitBtn = () =>
		Object.keys(order).length > 0
			? // order// > 0
			  (navBtn = (
					<Button
						type="submit"
						id="order-nav"
						onClick={(e) => {
							e.preventDefault();
							handelSubmit(e);
						}}>
						Submit
					</Button>
			  ))
			: (navBtn = (
					<Link
						to={'/'}
						id="order-nav"
						className="btn btn-primary">
						home
					</Link>
			  ));
	submitBtn();
	const options = (key) => {
		let opt = [];
		for (let i = 0; i < 20; i++) {
			opt.push(<option key={key + i}>option {i + 4}</option>);
		}
		return opt;
	};
	return (
		<Form className="w-lg-50  order-form">
			<fieldset className="fildset-reset">
				<legend className="legend-reset">personal info</legend>

				<Form.Group className="mb-3">
					<Form.Label
						className="w-st-20"
						htmlFor="name">
						name
					</Form.Label>
					<Form.Control
						onBlur={handeBlur}
						onFocus={handelFocus}
						name="name"
						className="order-selector order-form w-st-75 d-inline-block mb-2"
						id="name"
						placeholder="name"
					/>
					<Form.Label
						className="w-st-20"
						htmlFor="number">
						number
					</Form.Label>
					<Form.Control
						onBlur={handeBlur}
						onFocus={handelFocus}
						name="phone"
						className="order-selector order-form w-st-75 d-inline-block mb-2"
						id="number"
						type="number"
						placeholder="number"
					/>
				</Form.Group>
			</fieldset>
			<fieldset className="fildset-reset">
				<legend className="legend-reset">adress</legend>
				<Form.Group className="mb-3">
					<Form.Label
						className="w-st-20"
						htmlFor="state">
						state
					</Form.Label>
					<Form.Select
						onBlur={handeBlur}
						onFocus={handelFocus}
						name="state"
						className="order-selector order-form w-st-75 d-inline-block mb-2"
						id="state"
						placeholder="state">
						<option checked>cairo</option>
						<option>alexandria</option>
						<option>suiz</option>
						<option>el menofia</option>
						<option>matroh</option>
						{options('state')}
					</Form.Select>
					<Form.Label
						className="w-st-20"
						htmlFor="city">
						city
					</Form.Label>
					<Form.Select
						onBlur={handeBlur}
						onFocus={handelFocus}
						name="city"
						placeholder="city"
						className="order-selector order-form w-st-75 d-inline-block mb-2"
						id="city">
						<option checked>option 1</option>
						<option>option 2</option>
						<option>option 3</option>
						{options('city')}
					</Form.Select>
					<Form.Label
						className="w-st-20"
						htmlFor="adress">
						adress
					</Form.Label>
					<Form.Control
						onBlur={handeBlur}
						onFocus={handelFocus}
						name="adress"
						className="order-selector order-form w-st-75 d-inline-block mb-2"
						id="adress"
						placeholder="adress"
					/>
					<Form.Label
						className="w-st-20"
						htmlFor="note">
						note
					</Form.Label>
					<textarea
						className="order-selector order-form w-st-75 d-inline-block mb-2 form-control"
						id="note"
						placeholder="note"
						onBlur={handeBlur}
						onFocus={handelFocus}
						name="note"></textarea>
				</Form.Group>
				<Form.Check
					type="checkbox"
					name="save"
					onClick={handeBlur}
					id="save-check"
					label="rememmber this adress"
					className="order-selector save-check"
				/>
				<Form.Group
					id="adress-title"
					className=" adress-title close-save d-flex justify-content-between align-items-center position-relative">
					<Form.Label
						className="w-st-20 m-0"
						htmlFor="adressname">
						save as
					</Form.Label>
					<Form.Control
						className="w-st-75 d-inline-block"
						id="adress-name"
						type="adressname"
						name="order-selector save-as"
						placeholder="adress name"
					/>
					<Button
						variant="success"
						name="save-as"
						id="save-click"
						onClick={handeBlur}
						className="order-selector save-order-btn  ">
						save
					</Button>
				</Form.Group>
			</fieldset>
			<Form.Group className="mb-3">
				<fieldset className="fildset-reset">
					<legend className="legend-reset">saved adresses</legend>
					<Form.Group>{savedAdress()}</Form.Group>
				</fieldset>
			</Form.Group>
			{navBtn}
		</Form>
	);
}
