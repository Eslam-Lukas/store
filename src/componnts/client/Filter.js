import { useDispatch, useSelector } from 'react-redux';
import {
	fetchProducts,
	fetchProductsCategory,
} from '../../rtk/slices/Product-slice';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { categories } from '../../rtk/slices/Filter-slice';
import OffcanvasHeader from 'react-bootstrap/esm/OffcanvasHeader';
export default function FilterProducts(props) {
	//  ==================>>>>>>>>>>  <<<<<<<<<<<==================
	const filtered = useSelector((state) => state.products);
	const modify = useSelector((state) => state.modify.products);
	const dispatch = useDispatch();

	//  ==================>>>>>>>>>>  <<<<<<<<<<<==================
	let filtering = () => {
		if (filtered !== 'loading' && filtered !== 'not found') {
			return categories.map((e) => {
				return (
					<Link
						className="nav-link nav-link-css btn-filter"
						key={e}
						onClick={() => {
							dispatch(fetchProducts());
							setTimeout(() => {
								dispatch(fetchProductsCategory(e));
							}, 400);
						}}>
						{e}
					</Link>
				);
			});
		}
	};
	//  ==================>>>>>>>>>>  <<<<<<<<<<<==================
	const Toggle = () => {
		if (props.show === 'visble') {
			return (
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand-filter`}
					aria-labelledby={`offcanvasNavbarLabel-expand-filter`}
					placement="end">
					<Offcanvas.Title
						className="filter-title"
						id={`offcanvasNavbarLabel-expand-filter`}>
						filter
					</Offcanvas.Title>
					<Offcanvas.Body className="filter-body">
						<Nav className="justify-content-end flex-grow-1 pe-3">
							<Link
								className="nav-link nav-link-css btn-filter"
								onClick={() => {
									dispatch(fetchProducts());
								}}>
								All
							</Link>
							{filtering()}
						</Nav>
						<OffcanvasHeader
							closeButton
							className="close"></OffcanvasHeader>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			);
		}
	};
	return <>{Toggle()}</>;
}
