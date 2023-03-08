import React, { useEffect, useState } from 'react';
import { Card, Container, Nav, NavItem, NavLink } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import index from '../../innerIndex';
import { fetchProducts } from '../../rtk/slices/Product-slice';
import AddProduct from './AddProduct';
import AdminOrders from './AdminOrders';
import MonyMarket from './MonyMarket';
import RemoveProduct from './RemoveProduct';
import Theme from './Theme';

export default function Samry() {
	let variant;
	if (JSON.parse(localStorage.getItem('theme'))) {
		if (JSON.parse(localStorage.getItem('theme')).variant) {
			variant = JSON.parse(localStorage.getItem('theme')).variant;
		} else {
			variant = 'primary';
		}
	} else {
		variant = 'primary';
	}
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProducts());
		index();
	}, []);
	const componnts = [
		<Theme />,
		<MonyMarket />,
		<AdminOrders />,
		<AddProduct />,
		<RemoveProduct />,
	];
	const title = ['theme', 'status', 'orders', 'add product', 'remove product'];
	const [componnt, setComponnt] = useState(0);
	const handelClick = (ind) => {
		setComponnt(ind);
	};
	const samryComp = () => {
		let index = 0;
		return (
			<NavItem
				key={`${index}`}
				eventKey={`${index}`}
				className="head-link"
				text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}>
				{title.map((title, ind) => {
					index += 1;
					return (
						<NavLink
							eventKey={`${index}`}
							onClick={() => handelClick(ind)}
							className={`${
								componnt === ind ? 'active' : ''
							}  link-componnt border-1`}
							text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}>
							{title}
						</NavLink>
					);
				})}
			</NavItem>
		);
	};
	const setIt = () => (
		<Container className="cont-samry position-relative ">
			<Card
				key={variant + 'asb'}
				className="mb-2 h-100 border-0 bg-inherit">
				<Card.Header className="fw-bold text-center text-capitalize ">
					control Panel
				</Card.Header>
				<Card.Body>
					<Nav
						justify
						variant="tabs"
						className="samry-nav position-relative"
						defaultActiveKey={'12'}>
						{samryComp()}
						<Card.Body className="componnt">
							<Card
								key={variant + '55'}
								className="componnt-inter mb-2 bg-inherit border-0 ">
								<Card.Body
									className="m3ana"
									style={{ minHeight: '26rem' }}>
									{componnts[componnt]}
								</Card.Body>
							</Card>
						</Card.Body>
					</Nav>
				</Card.Body>
			</Card>
		</Container>
	);
	return setIt();
}
