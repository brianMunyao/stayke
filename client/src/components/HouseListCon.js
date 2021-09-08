import React from 'react';
import styled from 'styled-components';

const HouseListCon = ({ children }) => {
	return <Container>{children}</Container>;
};

const Container = styled.div`
	transition: all 0.2s linear;
	flex-grow: 1;
	margin: 0 80px;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	grid-auto-rows: 250px;
	gap: 15px;
	@media (max-width: 690px) {
		margin: 0 50px;
	}
	@media (max-width: 540px) {
		margin: 0 30px;
	}
`;

export default HouseListCon;
