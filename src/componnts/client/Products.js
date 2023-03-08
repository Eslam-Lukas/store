import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '../../rtk/slices/Product-slice';
import Loading from '../puplic/Loading';
import { addToCart } from '../../rtk/slices/Cart-slice';
import { Link } from 'react-router-dom';
export default function Products() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	let products = useSelector((state) => state.products);
	const modify = useSelector((state) => state.modify.products);

	const lag = () => {
		let allProducts = [];
		if (modify.length !== 0) {
			for (let i = 0; i < modify.length; i++) {
				const obj1 = modify[i];
				if (obj1.opreation === 'add') {
					let obj2Index = -1;
					for (let j = 0; j < products.length; j++) {
						if (obj1.id === products[j].id) {
							obj2Index = j;
							break;
						}
					}
					if (obj2Index !== -1) {
						allProducts.push(products[obj2Index]);
						products.splice(obj2Index, 1);
					}
					allProducts.push(obj1);
				} else if (obj1.opreation === 'removed') {
					products = products.filter((obj2) => obj1.id !== obj2.id);
				}
			}
			for (let i = 0; i < products.length; i++) {
				allProducts.push(products[i]);
			}
		} else {
			allProducts.push(...products);
		}
		return allProducts;
	};

	let check = () => {
		if (products !== 'loading') {
			return lag().map((ele, ind) => (
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
								to={`active/${ele.id}`}>
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
			));
		} else if (products === 'loading') {
			return <Loading />;
		}
	};
	return (
		<>
			<Container className="products">
				<Row>{check()}</Row>
			</Container>
		</>
	);
}
