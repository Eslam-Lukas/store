import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import index from '../../innerIndex';

export default function Theme() {
	useEffect(() => {
		index();
	});
	let classes = ' circle-50 m-1 border ';
	const dataColor = [
		'#198754',
		'#d53343',
		'#ffc107',
		'#0dc4e9',
		'#f0f1f2',
		'#202428',
		'#6c757d',
		'red',
		'green',
		'blue',
		'#0d6bf5',
		'#777',
		'#c6c6c6a8',
		'#1277cd',
		'navajowhite',
		'slateblue',
	];
	let variant = [
		'Primary',
		'Secondary',
		'Success',
		'pills',
		'Danger',
		'Warning',
		'Info',
		'Light',
		'Dark',
	];
	const variantColor = [
		'#0d6efd',
		'#697179',
		'#188351',
		'#ffffff',
		'#d53343',
		'#ffc107',
		'#0dcaf0',
		'#f8f9fa',
		'#212529',
	];

	const variantGenerate = () => (
		<>
			<h1 className="bg-inherit">variant</h1>
			{variantColor.map((e, i) => (
				<span
					key={e}
					className={`variant-bick ${classes}`}
					data-variant={variant[i]}
					data-color={e}
					style={{ background: e }}></span>
			))}
		</>
	);

	const genrate = () => (
		<>
			<h1 className="bg-inherit">background color</h1>
			{dataColor.map((e, i) => {
				if (i === 0) {
					classes = `active color-bick ${classes}`;
				}
				return (
					<span
						key={e}
						className={classes}
						style={{ background: e }}
						data-color={e}></span>
				);
			})}
		</>
	);

	return (
		<Card.Body
			className="theme"
			style={{ minHeight: '26rem' }}>
			{variantGenerate()}
			{genrate()}
		</Card.Body>
	);
}
