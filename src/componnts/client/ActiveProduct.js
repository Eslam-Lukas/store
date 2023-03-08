import { Button, Card, Carousel } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../rtk/slices/Cart-slice';
import { fetchProducts } from '../../rtk/slices/Product-slice';
import React, { useEffect } from 'react';
export default function ActiveProduct() {
	const products = useSelector((state) => state.products);
	const modify = useSelector((state) => state.modify.products);
	let finalCheck = [];
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);
	let proId = window.location.href
		.slice(window.location.href.lastIndexOf('active/'))
		.replace('active/', '');
	if (products !== 'loading' && products !== 'not found') {
		if (modify.length > 0) {
			finalCheck = [...products, ...modify];
		} else {
			finalCheck = products;
		}
	}
	const productFilter = () => {
		if (products !== 'loading' && products !== 'not found') {
			return finalCheck.map((ele) =>
				+ele.id === +proId ? (
					<React.Fragment key={ele.id}>
						<Carousel
							slide={false}
							className="active-product-carousel w-lg-50  mb-2 mb-lg-0 me-lg-2">
							<Carousel.Item>
								<img
									className="d-block w-100"
									src={ele.image}
									alt="First slide"
								/>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src={ele.image}
									alt="Second slide"
								/>
							</Carousel.Item>
							<Carousel.Item>
								<img
									className="d-block w-100"
									src={ele.image}
									alt="Third slide"
								/>
							</Carousel.Item>
						</Carousel>
						<Card className="active-product w-lg-50 w-xl-75">
							<Card.Body>
								<Card.Title>{ele.title}</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									{ele.category}
								</Card.Subtitle>
								<Card.Text>{ele.description}</Card.Text>
								<Card.Text>price {ele.price} $</Card.Text>
								<Card.Text>rating {ele.rating.rate}</Card.Text>
								<Card.Text>by {ele.rating.count} user</Card.Text>
							</Card.Body>
							<div className="d-flex mb-2 p-2">
								<Button
									className="me-auto "
									variant="success"
									onClick={() => dispatch(addToCart(ele))}>
									Add To Cart
								</Button>
								<Link
									className="btn btn-warning "
									to="/products">
									Back
								</Link>
							</div>
						</Card>
					</React.Fragment>
				) : (
					''
				),
			);
		} else {
			return <h1>not found</h1>;
		}
	};
	return (
		<Container className="cont-active-product d-flex flex-column flex-lg-row justify-content-between align-align-items-baseline mt-5 pb-5">
			{productFilter()}
		</Container>
	);
}
