import React from 'react';
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa';

import styled from 'styled-components';
import colors from '../config/colors';
import { capitalize } from '../apis/funcs';

const HouseRelated = ({ data, onClick }) => {
	const {
		apt_name,
		img1,
		rent,
		county,
		town,
		no_of_bedrooms,
		no_of_bathrooms,
	} = data;

	return (
		<Container onClick={onClick}>
			<div className="image">
				<img src={img1} alt="img" />
			</div>
			<div className="details">
				<p className="name">{capitalize(apt_name)}</p>
				<p className="location">
					<FaMapMarkerAlt />
					{capitalize(town) + ', ' + capitalize(county)}
				</p>
				<div className="props">
					<span>
						<FaBath />
						{no_of_bathrooms}
					</span>
					<span>
						<FaBed />
						{no_of_bedrooms}
					</span>
				</div>
				<span className="rent">KES {rent.toLocaleString()}</span>
			</div>
		</Container>
	);
};

const Container = styled.div`
	position: relative;
	overflow: hidden;
	height: 100px;
	display: flex;
	box-shadow: 1px 1px 10px rgb(233, 233, 233);
	cursor: pointer;
	margin: 15px 5px;
	border-radius: 5px;
	transition: all 0.1s linear;
	padding: 5px;

	&:hover {
		transform: translateX(-5px);
		box-shadow: 1px 1px 10px rgb(202, 202, 202);
	}

	.image {
		width: 150px;
		height: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 5px;
		img {
			height: 100%;
			position: absolute;
			margin: auto;
			top: -9999px;
			left: -9999px;
			right: -9999px;
			bottom: -9999px;
		}
	}
	.details {
		padding: 5px 0 5px 8px;
		position: relative;
		width: 100%;
	}
	.name {
		font-weight: 600;
	}
	.location {
		display: flex;
		align-items: center;
		font-size: 13px;
		color: rgb(126, 126, 126);
		padding: 0 0 5px;
		svg {
			margin-right: 2px;
		}
	}
	.props {
		position: absolute;
		left: 5px;
		bottom: 5px;
		display: flex;
		flex-direction: row;
		span {
			background: rgb(236, 236, 236);
			padding: 2px 5px;
			margin: 0 5px;
			border-radius: 6px;
			display: flex;
			align-items: center;
			font-size: 14px;
			color: #747474;
			* {
				margin-right: 5px;
			}
		}
	}
	.rent {
		position: absolute;
		right: 5px;
		bottom: 5px;
		font-size: 18px;
		font-weight: 700;
		color: ${colors.primary};
	}
`;

export default HouseRelated;
