import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';

import animation from '../assets/house-loader.json';

const Loader = () => {
	return (
		<Container>
			<Lottie
				isClickToPauseDisabled={true}
				options={{
					loop: true,
					autoplay: true,
					animationData: animation,
				}}
				height={150}
			/>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default Loader;
