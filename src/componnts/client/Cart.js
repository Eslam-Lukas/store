import { Button, Container, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToCart,
	clearCart,
	minFromCart,
	removeFromCart,
} from '../../rtk/slices/Cart-slice';
import { Link } from 'react-router-dom';
import { clear, money } from '../../rtk/slices/Money-slice';
import { useEffect } from 'react';
import { blurValid } from '../../rtk/slices/admin/Form-slice';

export default function Cart() {
	const items = useSelector((state) => state.cart);
	const total = useSelector((state) => state.money);
	const dispatch = useDispatch();
	let totalPrice = () => {
		return items.reduce((acc, ele) => {
			acc += ele.count * ele.price;
			return +acc.toFixed(2);
		}, 0);
	};
	const handelSubmit = (e) => {
		if (total > 0) {
			dispatch(
				blurValid({
					name: 'finish',
					type: 'order',
					value: { items, money: total[0] },
				}),
			);
		} else {
			e.preventDefault();
		}
	};
	useEffect(() => {
		dispatch(clear());
		dispatch(money(totalPrice()));
	}, [totalPrice()]);
	let productMange = (pro) => {
		return (
			<div className="d-flex mb-2 p-2  justify-content-between align-items-center">
				<div className="d-flex mb-2 p-2 w-25 justify-content-between align-items-center">
					<Button
						className="mx-2"
						variant="success"
						onClick={() => dispatch(addToCart(pro))}>
						+
					</Button>
					<span>{pro.count}</span>
					<Button
						className="mx-2"
						onClick={(e) =>
							pro.count > 0 ? dispatch(minFromCart(pro)) : e.preventDefault()
						}>
						-
					</Button>
				</div>
				<Button
					className="mx-2"
					variant="danger"
					onClick={() => dispatch(removeFromCart(pro))}>
					Remove
				</Button>
			</div>
		);
	};
	let showItem = () => {
		return items.map((ele) => {
			return (
				<Card
					className="cart-product bg-variant text-capitalize my-1"
					key={ele.id}>
					<div className="d-flex mb-2 p-2  justify-content-between align-items-center">
						<Card.Body className="w-75 ">
							<Card.Title>{ele.title}</Card.Title>
							<Card.Text>price : {ele.price} $</Card.Text>
							<Card.Text>total : {ele.price * ele.count} $</Card.Text>
						</Card.Body>
						<Image
							className="w-st-10"
							src={ele.image}
							alt="product img"
						/>
					</div>
					{productMange(ele)}
				</Card>
			);
		});
	};
	const link = () => {
		return (
			<Link
				to={'/order'}
				className="btn-primary btn "
				onClick={(e) => {
					handelSubmit(e);
				}}>
				finish
			</Link>
		);
	};
	return (
		<Container className="text-capitalize">
			{items.length > 0 ? (
				<>
					<h1>Ready to finish</h1>
					<div className="d-flex justify-content-between  ">
						{link()}
						<div className="fw-bold">
							total : <span>{totalPrice()}</span>
						</div>
					</div>
					{showItem()}
					<div className="d-flex justify-content-between py-2">
						<Button
							variant="danger"
							onClick={() => dispatch(clearCart())}>
							Clear Cart
						</Button>
						{link()}
						<div className="fw-bold">
							total : <span>{totalPrice()}</span>
						</div>
					</div>
				</>
			) : (
				<h1>no items yet</h1>
			)}
		</Container>
	);
}
