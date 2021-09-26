import React, { useState } from 'react';
import {
	FaBath,
	FaBed,
	FaImage,
	FaMapMarkerAlt,
	FaPencilAlt,
	FaTrash,
} from 'react-icons/fa';
import styled from 'styled-components';

import { capitalize, money } from '../apis/funcs';
import colors from '../config/colors';
import AppSlider from './AppSlider';
import Loader from './Loader';
import animation from '../assets/image-loading.json';

const HouseCard = ({ owner, editHouse, deleteHouse, data, onClick }) => {
	const {
		id,
		apt_name,
		img1,
		img2,
		rent,
		county,
		town,
		no_of_bedrooms,
		no_of_bathrooms,
	} = data;

	const [hovered, setHovered] = useState(false);
	const [imgLoaded, setImgLoaded] = useState(false);

	return (
		<House
			onClick={!owner ? onClick : () => null}
			hovered={hovered}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			{img2 ? (
				<AppSlider height={175} data={[img1, img2]} autoplay={false} />
			) : (
				<div className="img">
					{img1 && !imgLoaded && (
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
					{img1 ? (
						<img
							src={img1}
							alt="house"
							onLoad={() => setImgLoaded(true)}
						/>
					) : (
						<div>
							<FaImage fill={colors.errorLight} />
						</div>
					)}
				</div>
			)}

			<p className="loc">
				<FaMapMarkerAlt />
				{capitalize(town) + ', ' + capitalize(county)}
			</p>
			<p className="name">{capitalize(apt_name)}</p>

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

			<span className="rent">KES {money(rent)}</span>

			{owner && (
				<div className="manage" onClick={() => editHouse(id)}>
					<div className="edit" onClick={() => editHouse(id)}>
						<FaPencilAlt />
					</div>
					<div
						className="delete"
						onClick={(e) => {
							e.stopPropagation();
							deleteHouse(id);
						}}>
						<FaTrash />
					</div>
				</div>
			)}
		</House>
	);
};

const House = styled.div`
	cursor: pointer;
	height: 100%;
	width: 100%;
	position: relative;
	background: white;
	border-radius: 5px;
	overflow: hidden;
	box-shadow: 2px 10px 20px #dee2e7;
	transition: all 0.2s linear;

	&:hover {
		box-shadow: 2px 10px 30px #c4cbd4;
		transform: translateY(-1px);
	}
	.img {
		position: relative;
		width: 100%;
		height: 175px;
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

	p.loc {
		font-size: 12px;
		opacity: 0.5;
		font-weight: 500;
		display: flex;
		align-items: center;
		margin: 3px 10px 0;
		* {
			margin-right: 2px;
		}
	}
	p.name {
		font-size: 15px;
		font-weight: 600;
		padding: 2px 10px;
	}
	span.rent {
		font-weight: 700;
		color: ${colors.primary};
		position: absolute;
		bottom: 8px;
		left: 10px;
	}
	div.props {
		position: absolute;
		right: 8px;
		bottom: 8px;
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

	div.manage {
		z-index: 10;
		position: absolute;
		transition: all 1s linear;
		display: ${(props) => (props.hovered ? 'flex' : 'none')};
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000000c5;

		div {
			margin: 0 10px;
			width: 45px;
			height: 45px;
			background: ${colors.primary};
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.2s linear;
			border-radius: 30px;
			opacity: 0.8;
			&.delete {
				background: ${colors.error};
			}
			&:hover {
				opacity: 1;
			}
		}
	}
`;

export default HouseCard;
