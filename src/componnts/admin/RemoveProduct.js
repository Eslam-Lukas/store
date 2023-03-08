import React, { useEffect } from 'react';
import { removeProduct } from '../../rtk/slices/Product-slice';
import { Button, Card, Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { removepro } from '../../rtk/slices/Modify-slice';
import FilterProducts from '../client/Filter';
export default function RemoveProduct() {
	const dispatch = useDispatch();

	const products = useSelector((state) => state.products);
	const modify = useSelector((state) => state.modify.products);
	const removed = useSelector((state) => state.modify.removedId);
	let finalCheck = [];
	const setel = () => {
		if (modify.length > 0) {
			modify.forEach((ele) => {
				if (ele.opreation === 'add') {
					finalCheck.push(ele);
				}
			});

			for (let i = 0; i < products.length; i++) {
				let id = products[i].id;
				let removedId = !removed.find((e) => e === id);
				if (removedId) {
					finalCheck.push(products[i]);
				}
			}
		} else {
			finalCheck = products;
		}
		return finalCheck;
	};

	const allproduct = () => {
		setel();
		return finalCheck.map((ele, ind) => {
			return (
				<Card
					className="text-capitalize my-1"
					key={ind}>
					<div className="d-flex mb-2 p-2  justify-content-between  align-items-center">
						<Card.Body className="w-75 ">
							<Card.Title>{ele.title}</Card.Title>
							<Card.Text>price : {ele.price} $</Card.Text>
						</Card.Body>
						<Image
							className="w-st-10"
							src={ele.image}
						/>
					</div>
					<Button
						className="w-st-50 w-sm-30 w-lg-20 ms-auto"
						variant="danger"
						onClick={(e) => {
							dispatch(removepro(ele));
							dispatch(removeProduct(ele.id));
						}}>
						remove product
					</Button>
				</Card>
			);
		});
	};
	return (
		<Container>
			<FilterProducts />
			{allproduct()}
		</Container>
	);
}
