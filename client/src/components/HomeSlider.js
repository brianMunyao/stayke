import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import colors from '../config/colors';
import main from '../assets/main.jpg';
import video from '../assets/vid.mp4';

const HomeSlider = ({ data = [] }) => {
	const [searchTerm, setSearchTerm] = useState('');

	const history = useHistory();

	const goToSearch = () => {
		history.push('/search', searchTerm);
	};

	return (
		<SliderCon>
			<Slider
				className="slider"
				autoplay
				infinite
				speed={1500}
				autoplaySpeed={10000}
				slidesToScroll={1}
				slidesToShow={1}>
				<div className="image-con">
					<video src={video} autoPlay loop />
				</div>
				{data.length > 0 ? (
					data.slice(-3, -1).map((d) => (
						<div className="image-con" key={d.id}>
							<img src={d.img1} alt="img1" />
						</div>
					))
				) : (
					<div className="image-con">
						<img src={main} alt="main" />
					</div>
				)}
			</Slider>
			<div className="title-con">
				<p className="title">
					Let's Find Your
					<br />
					Dream House
				</p>

				<div className="search-bar">
					<input
						value={searchTerm}
						onKeyPress={(e) => {
							if (e.key === 'Enter') goToSearch();
						}}
						onChange={(e) => setSearchTerm(e.target.value)}
						type="text"
						placeholder="County, town or house name"
					/>
					<div className="search-bar-btn" onClick={goToSearch}>
						Search
					</div>
				</div>
			</div>
		</SliderCon>
	);
};

const SliderCon = styled.div`
	position: relative;
	.title-con {
		position: absolute;
		width: 500px;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 30px;
		@media (max-width: 690px) {
			top: 30%;
			left: 50%;
			transform: translateX(-50%);
			margin-left: 0;
			width: 90%;
		}
		@media (max-width: 540px) {
			top: 18%;
		}

		p.title {
			font-size: 70px;
			line-height: 70px;
			font-weight: 700;
			color: white;
			user-select: none;
			letter-spacing: 1px;

			@media (max-width: 768px) {
				font-size: 70px;
				line-height: 70px;
			}
			@media (max-width: 690px) {
				font-size: 50px;
				line-height: 58px;
				text-align: center;
			}
			@media (max-width: 540px) {
				font-size: 35px;
				line-height: 44px;
			}
		}
		.search-bar {
			position: relative;
			background: white;
			margin-top: 20px;
			height: 60px;
			border-radius: 8px;
			@media (max-width: 690px) {
				height: 50px;
			}

			* {
				position: absolute;
			}
			input {
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				font-size: 16px;
				padding: 0 90px 0 10px;
				background: none;
			}
			.search-bar-btn {
				background: ${colors.primary};
				color: white;
				top: 50%;
				right: 10px;
				padding: 10px 15px;
				border-radius: 8px;
				transform: translateY(-50%);
				user-select: none;
				cursor: pointer;
				transition: all 0.2s linear;

				&:hover {
					background: ${colors.primaryDark};
				}
				@media (max-width: 690px) {
					right: 5px;
					padding: 8px 15px;
				}
			}
		}
	}
	.image-con {
		position: relative;
		width: 100%;
		height: 500px;
		overflow: hidden;
		&::after {
			position: absolute;
			background: #0000003d;
			content: '';
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
		}

		img,
		video {
			width: 100%;
			position: absolute;
			margin: auto;
			top: -9999px;
			left: -9999px;
			right: -9999px;
			bottom: -9999px;
			@media (max-width: 540px) {
				height: 100%;
			}
		}
		video {
			@media (max-width: 768px) {
				height: 100%;
				width: auto;
			}
		}

		@media (max-width: 768px) {
			height: 450px;
		}
		@media (max-width: 690px) {
			height: 400px;
		}
		@media (max-width: 620px) {
			height: 350px;
		}
		@media (max-width: 540px) {
			height: 300px;
		}
	}
`;

export default HomeSlider;
