import React from 'react';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import colors from '../config/colors';
import animation from '../assets/404.json';

const PageNotFound = () => {
	return (
		<Container>
			<Lottie
				isClickToPauseDisabled={true}
				options={{
					loop: true,
					autoplay: true,
					animationData: animation,
				}}
				height={250}
			/>
			<h1>Oops, page does not exist.</h1>
			<Link to="/">
				<Button>Back To Home</Button>
			</Link>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	* {
		margin: 5px 0;
	}
`;
const Button = styled.div`
	padding: 7px 20px;
	background: ${colors.primary};
	color: white;
	border-radius: 20px;
	transition: all 0.2s linear;
	&:hover {
		background: ${colors.primaryDark};
	}
	&:active {
		background: ${colors.primaryDark};
	}
`;

export default PageNotFound;
