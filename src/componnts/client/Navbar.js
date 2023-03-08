import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import FilterProducts from './Filter';
import { useEffect, useState } from 'react';
import OffcanvasHeader from 'react-bootstrap/esm/OffcanvasHeader';
import { navControol } from '../../innerIndex';

export default function MainNavbar() {
	const [showFilter, setShowFilter] = useState(false);
	const handelFilterShow = () => {
		setShowFilter(!showFilter);
	};
	useEffect(() => {
		navControol();
	});

	const showAndHide = () => {
		let show;
		showFilter ? (show = 'visble') : (show = 'none');
		if (window.location.href.split('/')[3] !== 'products') {
			show = 'none';
		}
		return <FilterProducts show={show} />;
	};
	return (
		<Navbar
			bg="light"
			expand="lg"
			className="mb-2 nav-bar">
			<Container>
				<Link
					className="navbar-brand"
					to={'/'}>
					Lukas
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Offcanvas
					id={`offcanvasNavbar-expand`}
					aria-labelledby={`offcanvasNavbarLabel-expand`}
					placement="end">
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link
								to={'/products'}
								className="nav-link nav-link-css active">
								Home
							</Link>
							<Link
								to={'/products/new'}
								className="nav-link nav-link-css">
								New
							</Link>

							<Link
								to={'/cart'}
								className="nav-link nav-link-css ">
								Cart
							</Link>
							<Link
								to={'/login'}
								className="nav-link nav-link-css ">
								Log in
							</Link>
							<div
								className="nav-link nav-link-css btn-filter "
								title="filter"
								id="filter-btn"
								onClick={(e) => {
									handelFilterShow();
								}}>
								filter
								{showAndHide()}
							</div>
							<OffcanvasHeader
								closeButton
								className="close"></OffcanvasHeader>
						</Nav>
					</Navbar.Collapse>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	);
}
