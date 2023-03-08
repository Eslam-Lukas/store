import Spinner from 'react-bootstrap/Spinner';
export default function Loading() {
	return (
		<>
			<Spinner
				animation="grow"
				variant="warning"
				style={{
					width: '200px',
					height: '200px',
					position: 'absolute',
					top: 'calc(50% - 100px)',
					left: 'calc(50% - 100px)',
				}}>
				<span
					style={{
						color: 'black',
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50% , -50%)',
					}}>
					Loading
				</span>
			</Spinner>
		</>
	);
}
