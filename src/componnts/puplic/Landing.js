import React from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Landing() {
	return (
		<Container
			fluid
			className="home">
			<Container className="inner">
				<Card className="welcome">
					<Card.Subtitle className="text-uppercase">
						outfit of the day
					</Card.Subtitle>
					<Card.Title className="text-uppercase">
						all your styles are here
					</Card.Title>
					<Card.Text className="w-md-50">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt
						dolores molestias maxime impedit corporis inventore.{' '}
					</Card.Text>
					<Link
						className="btn btn-light btn-outline-primary w-st-30"
						to={'products'}>
						buy now
					</Link>
				</Card>
			</Container>

			{/* <nav
				id="social"
				class="social">
				<div class="icons">
					<span>
						<i
							id="facebook"
							class="facebook fa-brands fa-facebook fa-2xl"></i>
					</span>
					<span>
						<i
							id="github"
							class="github fa-brands fa-github fa-2xl"></i>
					</span>
					<span>
						<i
							id="instagram"
							class="instagram fa-brands fa-instagram fa-2xl"></i>
					</span>
					<span>
						<i
							id="twitter"
							class="twitter fa-brands fa-twitter fa-2xl"></i>
					</span>
					<span>
						<i
							id="linkedin"
							class="linkedin fa-brands fa-linkedin fa-2xl"></i>
					</span>
					<span>
						<i
							id="google"
							class="google fa-brands fa-google fa-2xl"></i>
					</span>
					<span>
						<i
							id="windows"
							class="windows fa-brands fa-windows fa-2xl"></i>
					</span>
				</div>
			</nav> */}
		</Container>
	);
}
