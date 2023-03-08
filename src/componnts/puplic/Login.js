import { Button, Container, Form } from 'react-bootstrap';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	blurValid,
	feildEnter,
	resetState,
	submitCheck,
} from '../../rtk/slices/admin/Form-slice';

export default function Login() {
	const finalCheck = useSelector((state) => [
		state.formValidation.valid.email,
		state.formValidation.valid.password,
	]);
	const valid = useSelector((state) => state.formValidation.valid);
	const feedback = useSelector((state) => state.formValidation.feedback);
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	//

	const Validation = useSelector((state) => state.formValidation.submit);

	useEffect(() => {
		dispatch(resetState({ objectId: 'login' }));
		setTimeout(() => {}, 1000);
	}, [Validation]);

	//

	const handeBlur = (e) => {
		dispatch(
			blurValid({
				name: e.target.name,
				value: e.target.value,
				type: 'login',
			}),
		);
	};
	const handelFocus = (e) => {
		dispatch(feildEnter({ name: e.target.name, id: e.target.id }));
	};
	const handelSubmit = (e) => {
		let checked;
		for (let i = 0; i < finalCheck.length; i++) {
			if (finalCheck[i] === true) {
				checked = true;
			} else {
				checked = false;
				break;
			}
		}
		dispatch(submitCheck({ type: 'login', value: checked }));
		if (!checked) {
			e.preventDefault();
			// dispatch(resetState());
			// e.target.firstElementChild.click();
		} else {
			dispatch(resetState({ type: 'login' }));
		}
	};
	return (
		<Form className="w-lg-30 m-auto center-left	">
			<Form.Group className="mb-3">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					name="email"
					id="email"
					type="email"
					placeholder="Enter email"
					onBlur={handeBlur}
					onFocus={handelFocus}
					isValid={valid.email}
					isInvalid={!valid.email}
				/>
				<Form.Control.Feedback type={'invalid'}>
					{feedback.email}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="mb-3">
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					name="password"
					id="password"
					onBlur={handeBlur}
					onFocus={handelFocus}
					isValid={valid.password}
					isInvalid={!valid.password}
				/>
				<Form.Control.Feedback type={'invalid'}>
					{feedback.password}
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="d-flex justify-content-between">
				<Link
					to={'/admin'}
					onClick={(e) => {
						handelSubmit(e);
					}}
					id="login-btn"
					className=" btn-primary btn text-capitalize">
					log in
				</Link>

				<Link
					onClick={() => dispatch(resetState({ type: 'rigster' }))}
					to={'/rigster'}
					className="btn btn-success text-capitalize"
					type="submit">
					rigster
				</Link>
			</Form.Group>
		</Form>
	);
}
