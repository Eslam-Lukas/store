import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../rtk/slices/Product-slice';

export default function AddAndRemove() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchProducts());
	});
	return (
		<Container className="control-cont  d-flex justify-content-center align-items-center p-3 m-auto flex-column flex-lg-row gap-3 ">
			<Link
				to={'addproduct'}
				className="btn btn-primary  btn-control">
				Add Product
			</Link>
			<Link
				to={'removeproduct'}
				className="btn btn-danger test-an btn-control ">
				remove product
			</Link>
			<Link
				to={'panel'}
				className="btn btn-light  btn-control">
				Control panel
			</Link>
		</Container>
	);
}
