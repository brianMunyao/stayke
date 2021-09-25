import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';

import colors from '../config/colors';
import Loader from './Loader';
import animation from '../assets/image-loading.json';

const AppSlider = ({ data, height, rounded, autoplay = false }) => {
	const [imgLoaded, setImgLoaded] = useState(false);

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
				prevArrow={<BasicArrow prev />}
				nextArrow={<BasicArrow />}>
				{data.map((d, i) => (
					<div className="image-con" key={i}>
						{!imgLoaded && (
							<Loader
								style={{
									width: '100%',
									height: '100%',
									zIndex: 2,
									position: 'absolute',
									top: 0,
									left: 0,
									background: colors.greyImgBg,
								}}
								animation={animation}
								height={100}
							/>
						)}
						<img
							src={d}
							alt="h"
							onLoad={() => setImgLoaded(true)}
						/>
					</div>
				))}
			</Slider>
		</SliderCon>
	);
};

const BasicArrow = ({ prev, onClick }) => {
	return (
		<Arrow
			className="arrow"
			prev={prev}
			onClick={(e) => {
				onClick();
				e.stopPropagation();
			}}>
			{prev ? <FaCaretLeft /> : <FaCaretRight />}
		</Arrow>
	);
};

const SliderCon = styled.div`
	position: relative;
	height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
	border-radius: ${(props) => (props.rounded ? '5px' : 0)};
	overflow: hidden;

	.image-con {
		position: relative;
		width: 100%;
		height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
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
	}
`;

const Arrow = styled.div`
	position: absolute;
	top: 0;
	z-index: 1;
	height: 100%;
	width: 30px;
	background: #ffffff3e;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	opacity: 0.6;
	transition: all 0.2s linear;
	font-size: 20px;
	right: ${(props) => !props.prev && 0};

	&:hover {
		background: #ffffff6f;
		opacity: 1;
	}
`;

export default AppSlider;
