import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import FeaturedHouse from './FeaturedHouse';
import colors from '../config/colors';

const FeaturedList = ({ data, onClick }) => {
	return (
		<Container>
			<p className="section-title">Featured Houses</p>
			<p className="section-subtitle">
				Browse through a list of the best exclusive properties
				available.
			</p>
			<Slider
				infinite
				slidesToScroll={data.length < 2 ? data.length : 2}
				slidesToShow={data.length < 2 ? data.length : 2}
				autoplaySpeed={10000}
				responsive={[
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
				]}>
				{data.map((data, i) => (
					<FeaturedHouse data={data} key={i} onClick={onClick} />
				))}
			</Slider>
		</Container>
	);
};

const Container = styled.div`
	overflow-x: hidden;
	padding: 20px 100px;
	transition: all 0.2s linear;
	.slick-slider {
		margin: 0 8px;
	}
	.slick-arrow {
		transform: scale(1.2);
	}
	.slick-arrow::before {
		color: ${colors.primary};
	}

	.slick-center {
	}

	@media (max-width: 1150px) {
		padding: 20px 50px;
	}
	@media (max-width: 768px) {
		padding: 20px;
	}
	@media (max-width: 690px) {
	}
	@media (max-width: 540px) {
	}
`;
export default FeaturedList;
