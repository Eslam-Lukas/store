import React, { useEffect } from 'react';
import { Card, CardGroup, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../puplic/Loading';

export default function MonyMarket() {
	const products = useSelector((state) => state.products);
	const modify = useSelector((state) => state.modify.products);
	const removed = useSelector((state) => state.modify.removedId);
	const orders = localStorage.getItem('orders')
		? JSON.parse(localStorage.getItem('orders'))
		: [];
	const dispatsh = useDispatch();
	let activeProducts = [];
	let removeproducts = [];
	let price = [];
	let totalOrders = [];
	let totalPayes = [];
	let lowRate, highRate, lowRateId, highRateId, lowRateTitle, highRateTitle;
	const setel = () => {
		let rate = [];
		if (modify.length > 0) {
			modify.forEach((ele) => {
				if (ele.opreation === 'add') {
					activeProducts.push(ele);
				} else {
					removeproducts.push(ele);
				}
			});
			// find active products
			for (let i = 0; i < products.length; i++) {
				let id = products[i].id;
				let removedId = !removed.find((e) => e === id);
				if (removedId) {
					activeProducts.push(products[i]);
					totalOrders.push(products[i].rating.count);
				} else {
					removeproducts.push(products[i]);
					totalOrders.push(products[i].rating.count);
				}
				totalPayes.push(products[i].rating.count * products[i].price);
			}
		} else {
			activeProducts = products;
			activeProducts.forEach((e) => totalOrders.push(e.rating.count));
			products.forEach((e) => totalPayes.push(e.rating.count * e.price));
		}

		price = activeProducts
			.reduce((cur, acc) => {
				return cur + acc.price;
			}, 0)
			.toFixed(2);
		totalOrders = totalOrders.reduce((cur, acc) => {
			return cur + acc;
		}, 0);
		totalPayes = totalPayes
			.reduce((cur, acc) => {
				return cur + acc;
			}, 0)
			.toFixed(2);
		rate = [...activeProducts].sort((a, b) => a.rating.rate - b.rating.rate);
		lowRateTitle = rate[0].title;
		lowRate = rate[0].rating.rate;
		lowRateId = rate[0].id;
		highRateTitle = rate[rate.length - 1].title;
		highRate = rate[rate.length - 1].rating.rate;
		highRateId = rate[rate.length - 1].id;
	};
	const classes = [
		'stats-card',
		'justify-content-between',
		'align-items-center',
		'bg-inherit',
	];
	const titles = [
		'store money',
		'active orders',
		'total Orders',
		'total Payes',
		'high rate',
		'low rate',
	];
	const rows = () => {
		setel();
		const vars = [
			price + '$',
			orders.length,
			totalOrders,
			totalPayes,
			highRate,
			lowRate,
		];
		return titles.map((ele, ind) => {
			let item;
			if (ele.split(' ')[1] === 'rate') {
				if (ele === 'high rate') {
					item = (
						<>
							<Card.Text>{highRate}</Card.Text>
							<Card className="rate-order  bg-inherit mb-2">
								<Card.Text>{highRateTitle}</Card.Text>
								<Link
									className="btn btn-primary w-25 align-self-end"
									to={`/products/active/${highRateId}`}>
									title
								</Link>
							</Card>
						</>
					);
				} else {
					item = (
						<>
							<Card.Text>{lowRate}</Card.Text>
							<Card className="rate-order bg-inherit mb-2">
								<Card.Text>{lowRateTitle}</Card.Text>
								<Link
									className="btn btn-primary w-25 align-self-end "
									to={`/products/active/${lowRateId}`}>
									title
								</Link>
							</Card>
						</>
					);
				}
			} else {
				item = <Card.Text> {vars[ind]} </Card.Text>;
			}
			return (
				<Row
					className={`status ${classes.join(' ')}`}
					key={ele}>
					<Card.Title>{ele}</Card.Title>
					{item}
				</Row>
			);
		});
	};

	const setIt = () => {
		if (products === 'loading') {
			return <Loading />;
		} else if (products === 'not found') {
			return <h1>reload</h1>;
		} else if (products.length !== 0) {
			return rows();
		}
	};

	return setIt();
}
