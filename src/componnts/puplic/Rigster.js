import { useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	blurValid,
	feildEnter,
	submitCheck,
	resetState,
} from '../../rtk/slices/admin/Form-slice';
export default function Rigster() {
	const dispatch = useDispatch();
	const errors = useSelector((state) => state.formValidation.errors);
	const feedback = useSelector((state) => state.formValidation.feedback);
	const finalCheck = useSelector((state) => state.formValidation.valid);
	const Validation = useSelector((state) => state.formValidation.submit);
	const handelFocus = (e) => {
		dispatch(feildEnter({ name: e.target.name, id: e.target.id }));
	};
	const handeBlur = (e) => {
		dispatch(
			blurValid({
				name: e.target.name,
				value: e.target.value,
				type: 'rigster',
			}),
		);
	};
	const handelSubmit = (e) => {
		let checked;
		for (let i = 0; i < Object.values(finalCheck).length; i++) {
			if (Object.values(finalCheck)[i] === true) {
				checked = true;
			} else {
				checked = false;
				break;
			}
		}
		dispatch(submitCheck({ type: 'rigster', value: checked }));
		checked
			? dispatch(resetState({ objectId: 'rigster' }))
			: e.preventDefault();
	};

	// useEffect(() => {
	// 	if (Validation) {
	// 		// document.getElementById('rigster-btn').click();
	// 	}
	// }, [Validation]);
	return (
		<Container className="position-relative rigester">
			<Form className="w-lg-30 v m-auto center-left">
				<Form.Group className="mb-3">
					<Form.Label htmlFor="first-name">first name</Form.Label>
					<Form.Control
						required
						id="first-name"
						type="text"
						name="firstName"
						placeholder="First Name"
						onFocus={handelFocus}
						onBlur={handeBlur}
						isValid={!errors.firstName}
						isInvalid={errors.firstName}
					/>
					<Form.Control.Feedback type={'invalid'}>
						{feedback.firstName}
					</Form.Control.Feedback>
					<Form.Label htmlFor="last-name">last name</Form.Label>
					<Form.Control
						required
						id="last-name"
						type="text"
						placeholder="Last Name"
						name="lastName"
						onFocus={handelFocus}
						onBlur={handeBlur}
						isValid={!errors.lastName}
						isInvalid={errors.lastName}
					/>
					<Form.Control.Feedback type={'invalid'}>
						{feedback.lastName}
					</Form.Control.Feedback>
					<Form.Label htmlFor="phone">phone</Form.Label>
					<Form.Control
						required
						id="phone"
						type="number"
						name="phone"
						placeholder="Enter Phone Number"
						onFocus={handelFocus}
						onBlur={handeBlur}
						isValid={!errors.phone}
						isInvalid={errors.phone}
					/>
					<Form.Control.Feedback type={'invalid'}>
						{feedback.phone}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="email">Email address</Form.Label>
					<Form.Control
						id="email"
						type="email"
						name="email"
						placeholder="Enter email"
						onFocus={handelFocus}
						onBlur={handeBlur}
						isValid={!errors.email}
						isInvalid={errors.email}
					/>
					<Form.Control.Feedback type={'invalid'}>
						{feedback.email}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label htmlFor="password">Password</Form.Label>
					<Form.Control
						id="password"
						type="password"
						name="password"
						placeholder="Password"
						onFocus={handelFocus}
						onBlur={handeBlur}
						isValid={!errors.password.valueAct}
						isInvalid={errors.password.valueAct}
					/>

					<Form.Label htmlFor="passwordConfirm">confirm Password</Form.Label>
					<Form.Control
						id="passwordConfirm"
						type="password"
						name="password"
						placeholder="Confirm Password"
						onFocus={handelFocus}
						onBlur={handeBlur}
						isValid={!errors.password.valueAct}
						isInvalid={errors.password.valueAct}
					/>
					<Form.Control.Feedback type={'invalid'}>
						{feedback.password}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId="finish">
					<Link
						className="btn btn-success"
						onClick={(e) => {
							handelSubmit(e);
						}}
						value="rigster"
						id="rigster-btn"
						to={'/login'}>
						rigster
					</Link>
				</Form.Group>
			</Form>
		</Container>
	);
}
