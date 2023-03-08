import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import whatsapp from '../../database/img/icons/whatsapp.png';
import facebook from '../../database/img/icons/facebook.png';
import linkedin from '../../database/img/icons/linkedin.png';
import gmail from '../../database/img/icons/gmail.png';
import twitter from '../../database/img/icons/twitter.png';
import github from '../../database/img/icons/github.png';

export default function Footer() {
	const imgClasses = 'social-icon icon';

	const social = [github, gmail, linkedin, twitter, whatsapp, facebook];
	const links = [
		'https://github.com/Eslam-Lukas',
		'https://theviperstrikes29@gmail.com',
		'https://www.linkedin.com/in/eslam-seif-21588524b',
		'https://twitter.com/Eslam_Seif29',
		'https://wa.me/+201012667689',
		'https://www.facebook.com/theviper.strikes.3',
	];
	const toApp = (i) => window.open(links[i]);
	const cardClasses = 'w-st-100 w-md-50 border-0 bg-transparent';
	return (
		<Container
			fluid
			className="footer d-flex justify-content-center align-items-center flex-wrap flex-lg-nowrap">
			<Card className={`icons ${cardClasses}`}>
				{social.map((e, i) => (
					<Card.Img
						key={i + 'icon'}
						className={`${imgClasses}`}
						onClick={() => toApp(i)}
						src={e}></Card.Img>
				))}
			</Card>
			<Card className={`copy ${cardClasses}`}>
				<Card.Title>
					made by <span className="lukas">lukas</span>
				</Card.Title>
				<Card.Text>
					all right reserved &copy;
					<span className="fw-bold"> {new Date().getFullYear()}</span>
				</Card.Text>
			</Card>
		</Container>
	);
}
