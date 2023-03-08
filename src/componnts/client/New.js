import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../rtk/slices/Cart-slice';

export default function New() {
	const modify = useSelector((state) => state.modify.products);
	const dispatch = useDispatch();

	let newProduct = [];
	if (modify.length !== 0) {
		modify.map((e) => {
			if (e.opreation === 'add') {
				newProduct.push(e);
			}
			return newProduct;
		});
	}
	const setIt = () => {
		let products;
		newProduct.length !== 0
			? (products = newProduct.map((ele, ind) => (
					<Col
						className="mx-auto my-2"
						key={ele.id + ele.title + ind}>
						<Card
							className="mx-auto p-2 pro-card "
							style={{ width: '15rem' }}>
							<Card.ImgOverlay className="overlay-left"></Card.ImgOverlay>
							<Card.ImgOverlay className="overlay-right"></Card.ImgOverlay>
							<Card className="position-relative inner-card">
								<Card.ImgOverlay className="pro-desc position-absolute">
									{ele.description}
								</Card.ImgOverlay>
								<Card.Img
									className="pro-img"
									variant="top"
									src={ele.image}
									alt="product img"
								/>
							</Card>
							<Card.Body className="pro-text">
								<Card.Title className="pro-title">{ele.title}</Card.Title>
								<Card.Text className="pro-price">{ele.price} $</Card.Text>
							</Card.Body>
							<div className="d-flex justify-content-between">
								<Link
									className="btn btn-warning"
									variant="warning"
									data-parent-id={ele.id}
									to={`/products/active/${ele.id}`}>
									More
								</Link>
								<Button
									variant="primary"
									onClick={() => {
										dispatch(addToCart(ele));
									}}>
									Add To Cart
								</Button>
							</div>
						</Card>
					</Col>
			  )))
			: (products = <h1>sorry no new products available at the moment</h1>);
		return products;
	};
	return (
		<>
			<Container className="products">
				<Row>{setIt()}</Row>
			</Container>
		</>
	);
}
