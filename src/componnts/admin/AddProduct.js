import React, { useEffect } from 'react';
import { fetchProducts } from '../../rtk/slices/Product-slice';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPro, done } from '../../rtk/slices/Modify-slice';
export default function AddProduct() {
	const dispatch = useDispatch();
	const product = useSelector((state) => state.products);
	const modifyitem = useSelector((state) => state.modify.products);
	const categories = useSelector((state) => state.filter);
	const accepted = useSelector((state) => state.modify.accepted);
	const opj = {
		id: product.length + modifyitem.length + 1,
		rating: {},
	};
	function adToOpj(e) {
		if (e.value !== '') {
			if (
				e.id.split('product-').join('') !== 'rate' &&
				e.id.split('product-').join('') !== 'count'
			) {
				opj[e.id.split('product-').join('')] = e.value;
			} else {
				opj.rating[e.id.split('product-').join('')] = e.value;
			}
		}
	}
	async function addCheck() {
		dispatch(addPro(opj));
		let form = document.querySelectorAll('.add-form');
		if (accepted) {
			form.forEach((e) => (e.value = ''));
			dispatch(done());
		}
	}
	let rowClasses = 'add-row mb-2 flex-column flex-lg-row';
	return (
		<Container className="add-product">
			<Form>
				<fieldset>
					<Form.Group className="mb-3 ">
						<Row className={`${rowClasses}`}>
							<Form.Label htmlFor="product-title">title</Form.Label>
							<Form.Control
								className="add-form"
								id="product-title"
								placeholder=""
								onFocus={() => dispatch(fetchProducts())}
								onChange={(ele) => adToOpj(ele.target)}
							/>
						</Row>
						<Row className={`${rowClasses}`}>
							<Form.Label htmlFor="product-description">description</Form.Label>
							<Form.Control
								className="add-form"
								id="product-description"
								placeholder=""
								onChange={(ele) => adToOpj(ele.target)}
							/>
						</Row>
						<Row className={`${rowClasses}`}>
							<Form.Label htmlFor="product-image">image src</Form.Label>
							<Form.Control
								className="add-form"
								id="product-image"
								placeholder=""
								onChange={(ele) => adToOpj(ele.target)}
							/>
						</Row>
						<Row className={`${rowClasses}`}>
							<Form.Label htmlFor="product-price">price</Form.Label>
							<Form.Control
								className="add-form"
								id="product-price"
								placeholder=""
								onChange={(ele) => adToOpj(ele.target)}
							/>
						</Row>{' '}
						<Row className={`${rowClasses}`}>
							<Form.Label htmlFor="product-rate">rate</Form.Label>
							<Form.Control
								className="add-form"
								id="product-rate"
								placeholder=""
								onChange={(ele) => adToOpj(ele.target)}
							/>
						</Row>{' '}
						<Row className={`${rowClasses}`}>
							<Form.Label htmlFor="product-count">stock</Form.Label>
							<Form.Control
								className="add-form"
								id="product-count"
								placeholder=""
								onChange={(ele) => adToOpj(ele.target)}
							/>
						</Row>
					</Form.Group>
					<Form.Group className="mb-3">
						<Row className={`${rowClasses}`}>
							<Form.Label htmlFor="product-category">category</Form.Label>
							<Form.Select
								className="add-form add-form-select"
								id="product-category"
								onChange={(ele) => adToOpj(ele.target)}>
								{categories.map((e) => (
									<option key={e}>{e}</option>
								))}
							</Form.Select>
						</Row>
					</Form.Group>
				</fieldset>
				<Button
					type="submit"
					variant="primary"
					id="addpro"
					onClick={(e) => {
						e.preventDefault();
						addCheck();
					}}>
					add product
				</Button>
			</Form>
		</Container>
	);
}
