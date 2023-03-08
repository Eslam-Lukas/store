import React, { useState } from 'react';
import { Button, Card, Nav, NavItem, NavLink, Row } from 'react-bootstrap';
import { handelExtend } from '../../innerIndex';
export default function AdminOrders() {
	let fullData = [];
	if (localStorage.getItem('orders')) {
		fullData = JSON.parse(localStorage.getItem('orders'));
	}

	const [order, setOrder] = useState(0);
	const showOrder = (ind) => {
		setOrder(ind);
	};
	const [extendOrder, setExtendOrder] = useState(0);
	const showExtendOrder = (ind) => {
		setExtendOrder(ind);
	};
	const classess =
		'details border-0 bg-inherit w-lg-50 flex-row justify-content-between align-items-stretch  ';

	let items = [];
	let adressData = fullData.map((e) => {
		return { ...e.info, money: e.order.money };
	});
	fullData.map((ele) => items.push(ele.order.items));
	let finalCheck = [];
	const adress = () => {
		let newArr = [];
		adressData.map((e, i) =>
			newArr.push(
				<Card
					key={'span'}
					className={` order-adress ${classess}`}>
					<Card.Text>
						<span>name</span> <span>{e.name}</span>
					</Card.Text>
					<Card.Text>
						<span> phone</span> <span>{e.phone}</span>{' '}
					</Card.Text>
					<Card.Text>
						<span>adress</span> <span>{e.adress}</span>{' '}
					</Card.Text>
					<Card.Text>
						<span> state</span> <span>{e.state}</span>{' '}
					</Card.Text>
					<Card.Text>
						<span> city</span> <span>{e.city}</span>{' '}
					</Card.Text>
					<Card.Text>
						<span> note</span> <span>{e.note}</span>{' '}
					</Card.Text>
					<Card.Text>
						<span> items</span> <span>{items[i].length}</span>{' '}
					</Card.Text>
					<Card.Text>
						<span> total</span> <span>{e.money} $</span>{' '}
					</Card.Text>
				</Card>,
			),
		);
		return (adressData = newArr);
	};
	const cardBody = () => {
		return items.map((e, i) => {
			return finalCheck.push([
				<>
					<Card
						key={'order' + i}
						className={` order-details ${classess} `}>
						{e.map((e, i, arr) => {
							if (arr.length > 1) {
								return (
									<React.Fragment key={'details' + i}>
										<Button
											onClick={() => setExtendOrder(i)}
											className={`
											${i === extendOrder ? 'active' : ''}
											 btn-order-extend`}>
											{i + 1}
										</Button>
										<Card
											className={`${
												i === extendOrder ? 'd-flex' : 'd-none'
											} extend-order ${classess}`}>
											<Card.Text>
												<span>product</span> <span>{e.title}</span>{' '}
											</Card.Text>
											<Card.Text>
												<span>count</span> <span>{e.count}</span>
											</Card.Text>
											<Card.Text>
												<span>price</span> <span>{e.price}</span>
											</Card.Text>
											<Card.Text>
												<span>category</span> <span>{e.category}</span>
											</Card.Text>
										</Card>
									</React.Fragment>
								);
							} else {
								return (
									<React.Fragment key={'details' + i}>
										<Card.Text>
											<span>product</span> <span>{e.title}</span>{' '}
										</Card.Text>
										<Card.Text>
											<span>count</span> <span>{e.count}</span>
										</Card.Text>
										<Card.Text>
											<span>price</span> <span>{e.price}</span>
										</Card.Text>
										<Card.Text>
											<span>category</span> <span>{e.category}</span>
										</Card.Text>
									</React.Fragment>
								);
							}
						})}
					</Card>
				</>,
			]);
		});
	};
	const tabs = () => {
		adress();
		cardBody();
		finalCheck.map((e, i) => e.push(adressData[i]));
		return finalCheck.map((_, ind) => (
			<NavItem
				key={`${ind}=>ind`}
				eventKey={`${ind} order`}
				className="prod-link ">
				<NavLink
					eventKey={`${ind} order`}
					onClick={() => {
						setOrder(ind);
						handelExtend();
					}}
					className={`${ind === order ? 'active' : ''} order-tabs`}>
					order {ind + 1}
				</NavLink>
			</NavItem>
		));
	};
	const setIt = () => {
		let items;
		if (localStorage.getItem('orders')) {
			items = (
				<>
					<Card className={`orders border-0 bg-inherit`}>
						<Nav
							justify
							variant="tabs"
							className="orders-nav position-relative "
							defaultActiveKey={1}>
							{tabs()}
						</Nav>
						<Row className="out-rows d-flex flex-column flex-lg-row justify-content-between ">
							{finalCheck[order]}
						</Row>
					</Card>
				</>
			);
		} else {
			items = <h1> sorry we don't have new orders </h1>;
		}
		return items;
	};

	return setIt();
}
