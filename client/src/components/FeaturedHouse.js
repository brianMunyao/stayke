import React, { useState } from 'react';
import styled from 'styled-components';

import { capitalize, money } from '../apis/funcs';
import colors from '../config/colors';
import Loader from './Loader';
import animation from '../assets/image-loading.json';

const FeaturedHouse = ({ data, onClick }) => {
	const [imgHeight, setImgHeight] = useState(0);
	const [imgLoaded, setImgLoaded] = useState(false);

	const onImgLoad = ({ target }) => {
		setImgHeight(target.offsetHeight);
		setImgLoaded(true);
	};

	return (
		<Container h={imgHeight} onClick={() => onClick(data.id)}>
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
			<img src={data.img1} alt={data.apt_name} onLoad={onImgLoad} />

			<div className="featured-info">
				<div className="name-loc">
					<span className="name">{capitalize(data.apt_name)}</span>
					<span className="loc">
						{capitalize(data.town) + ', ' + capitalize(data.county)}
					</span>
				</div>

				<div className="rent">KES {money(data.rent)}</div>
			</div>
		</Container>
	);
};

const Container = styled.div`
	cursor: pointer;
	position: relative;
	height: 300px;
	width: 94%;
	margin: 0 3%;
	background: ${colors.greyImgBg};
	border-radius: 10px;
	overflow: hidden;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: #00000029;
	}

	img {
		height: ${(props) => (props.h < 300 ? '100%' : 'auto')};
		width: ${(props) => (props.h < 300 ? 'auto' : '100%')};
		position: absolute;
		margin: auto;
		top: -9999px;
		left: -9999px;
		right: -9999px;
		bottom: -9999px;
	}

	.featured-info {
		position: absolute;
		background: white;
		height: 90px;
		z-index: 1;
		bottom: 20px;
		left: 20px;
		right: 20px;
		padding: 10px;
		border-radius: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		.name-loc {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			letter-spacing: 0.5px;
			* {
				padding: 2px 0;
			}
			.name {
				font-weight: 700;
				font-size: 21px;
			}
			.loc {
				font-size: 13px;
				color: ${colors.darkGrey};
			}
		}
		.rent {
			background: ${colors.primary};
			color: white;
			padding: 5px 10px;
			border-radius: 7px;
		}
	}
	@media (max-width: 1120px) {
		img {
			height: 100%;
			width: auto;
		}
	}
	@media (max-width: 768px) {
		.featured-info {
			height: 75px;
			bottom: 12px;
			left: 12px;
			right: 12px;
			.name-loc {
				.name {
					font-size: 18px;
				}
			}
			.rent {
				padding: 4px 7px;
				font-size: 15px;
			}
		}
	}
	@media (max-width: 690px) {
	}
	@media (max-width: 540px) {
	}
`;

export default FeaturedHouse;
