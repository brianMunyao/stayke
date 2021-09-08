import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';

const AppSlider = ({ data, height, rounded, autoplay = true }) => {
	return (
		<SliderCon height={height} rounded={rounded}>
			<Slider
				className="slider"
				autoplay={autoplay}
				infinite
				speed={500}
				autoplaySpeed={4000}
				slidesToScroll={1}
				slidesToShow={1}
				prevArrow={<PrevArrow />}
				nextArrow={<NextArrow />}>
				{data.map((d, i) => (
					<div className="image-con" key={i}>
						<img src={d} alt="img1" />
					</div>
				))}
			</Slider>
		</SliderCon>
	);
};

const PrevArrow = ({ onClick }) => {
	return (
		<div
			className="arrow l-arrow"
			onClick={(e) => {
				onClick();
				e.stopPropagation();
			}}>
			<FaCaretLeft />
		</div>
	);
};
const NextArrow = ({ onClick }) => {
	return (
		<div
			className="arrow r-arrow"
			onClick={(e) => {
				onClick();
				e.stopPropagation();
			}}>
			<FaCaretRight />
		</div>
	);
};

const SliderCon = styled.div`
	position: relative;
	&:hover {
		.arrow {
			opacity: 1;
		}
	}

	.image-con {
		position: relative;
		height: ${(props) => `${props.height}px`};
		width: 100%;
		border-radius: ${(props) => (props.rounded ? '5px' : 0)};
		overflow: hidden;

		img {
			width: 100%;
			position: absolute;
			margin: auto;
			top: -9999px;
			left: -9999px;
			right: -9999px;
			bottom: -9999px;
		}
		div {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 100px;
		}
	}
	.arrow {
		position: absolute;
		top: 0;
		z-index: 1;
		height: ${(props) => `${props.height}px`};
		width: 30px;
		background: #ffffff3e;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		opacity: 0;
		transition: all 0.2s linear;
		font-size: 20px;
		&:hover {
			background: #ffffff6f;
		}
	}
	.r-arrow {
		right: 0;
	}
`;

export default AppSlider;
