import Products from './componnts/client/Products';
import './css/main.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainNavbar from './componnts/client/Navbar';
import Cart from './componnts/client/Cart';
import ActiveProduct from './componnts/client/ActiveProduct';
import Order from './componnts/client/Order';
import Login from './componnts/puplic/Login';
import Rigster from './componnts/puplic/Rigster';
import AddAndRemove from './componnts/admin/AddAndRemove';
import AddProduct from './componnts/admin/AddProduct';
import RemoveProduct from './componnts/admin/RemoveProduct';
import Samry from './componnts/admin/Samry';
import New from './componnts/client/New';
import Landing from './componnts/puplic/Landing';
import Footer from './componnts/puplic/Footer';

function App() {
	return (
		<>
			<MainNavbar />
			<Routes>
				<Route
					path="/"
					element={<Landing />}
				/>
				<Route
					path="products"
					element={<Outlet />}>
					<Route
						path=""
						element={<Products />}
					/>
					<Route
						path="active/:id"
						element={<ActiveProduct />}
					/>
					<Route
						path="new"
						element={<New />}
					/>
				</Route>
				<Route
					path="cart"
					element={<Cart />}
				/>
				<Route
					path="order"
					element={<Order />}
				/>
				<Route
					path="login"
					element={<Login />}
				/>
				<Route
					path="rigster"
					element={<Rigster />}
				/>
				<Route
					path="admin"
					element={<Outlet />}>
					<Route
						path=""
						element={<AddAndRemove />}
					/>

					<Route
						path="addproduct"
						element={<AddProduct />}
					/>
					<Route
						path="removeproduct"
						element={<RemoveProduct />}
					/>
					<Route
						path="panel"
						element={<Samry />}
					/>
				</Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
