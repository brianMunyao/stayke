import React, { useState } from 'react';
import { useEffect } from 'react';
import {
	FaBath,
	FaBed,
	FaMapMarkerAlt,
	FaPhoneVolume,
	FaRegEnvelope,
} from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getProperty } from '../apis/houses';
import HouseRelated from '../components/HouseRelated';
import Loader from '../components/Loader';
import GoBack from '../components/GoBack';
import { money } from '../apis/funcs';

const HouseScreen = () => {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const _getProperty = async () => {
			const res = await getProperty(id);

			if (res.data) {
				setData(res.data);
				console.log(res.data);
				setTimeout(() => setLoading(false));
			} else {
				alert(res.error);
			}
		};

		setData(_getProperty());
	}, [id]);

	if (loading) {
		return <Loader />;
	}

	return (
		<Container>
			<div className="top-bar">
				<GoBack />
			</div>
			<div className="main">
				<main>
					<Left>
						<div className="house-images">
							<div className="image-border">
								<div className="main-image">
									<img src={data.img1} alt="img1" />
									{/* <Slider
										className="slider"
										autoplay
										infinite
										speed={500}
										slidesToScroll={1}
										slidesToShow={1}>
										{/* {[data].map((d) => (
									<ImgContainer>
										<img src={data.img1} alt="img1" />
									</ImgContainer>
									 ))} 
									</Slider> 
									*/}
								</div>
							</div>
						</div>
						<div className="details">
							<div className="name-rent">
								<span className="name">{data.apt_name}</span>
								<span className="rent">
									KES {money(data.rent)}
								</span>
							</div>
							<p className="location">
								<FaMapMarkerAlt />{' '}
								{data.town + ', ' + data.county}
							</p>
							<div className="specs">
								<div className="spec">
									<span className="spec-title">Bathroom</span>
									<span className="spec-body">
										<FaBath /> {data.no_of_bathrooms}
									</span>
								</div>
								<div className="spec">
									<span className="spec-title">Bedroom</span>
									<span className="spec-body">
										<FaBed /> {data.no_of_bedrooms}
									</span>
								</div>
								<div className="desc">
									<p className="desc-title">Description</p>
									<p className="desc-body">{data.apt_desc}</p>
								</div>
							</div>
						</div>
					</Left>

					<Right>
						<div className="landlord-card">
							<div className="name-pic">
								<span className="landlord-name">
									Jonathan Straus
								</span>
								<span className="landlord-date">
									Joined in Sep 01,2018
								</span>
							</div>

							<div className="landlord-contact">
								<span className="landlord-c">
									<FaPhoneVolume />
									Call
								</span>
								<span className="landlord-e">
									<FaRegEnvelope /> Send a message
								</span>
							</div>
						</div>

						<p className="related-title">Related Searches</p>
						<div className="related-houses">
							{[].map((house) => (
								<HouseRelated data={house} key={house.id} />
							))}
						</div>
					</Right>
				</main>
			</div>
		</Container>
	);
};

const Container = styled.div`
	background: white;
	width: 100%;
	height: 100vh;
	min-height: 500px;
	display: flex;
	flex-direction: column;

	.top-bar {
		display: flex;
		align-items: center;
		padding: 5px 10px;
	}

	.main {
		/* display: grid;
		grid-template-columns: 2fr 1fr;
		overflow-y: true; */
		padding: 0 10px;
		display: flex;
		flex-direction: column;
		flex: 1;
		/* min-height: 450px; */

		main {
			width: 100%;
			height: 100%;
			/* background: red; */
			display: grid;
			grid-template-columns: 2fr 1fr;
			grid-template-rows: 100%;
		}
	}
`;

const Left = styled.div`
	.image-border {
		border: 1px solid rgb(231, 231, 231);
		border-radius: 5px;
		padding: 2px;
	}
	.main-image {
		position: relative;
		height: 400px;
		width: 100%;
		border-radius: 5px;
		overflow: hidden;
		background-image: url(../assets/elements.png);
		background-size: 120px;
		background-repeat: repeat;

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
	.sub-images {
		position: relative;
		height: 200px;
		display: flex;
		flex-direction: row;
	}
	.name-rent {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 600;
		padding: 5px 0 3px;
		.name {
			font-size: 20px;
		}
		.rent {
			font-size: 25px;
			font-weight: 700;
		}
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
	.specs {
		display: flex;
		.spec {
			display: flex;
			flex-direction: column;
			padding: 5px 30px 8px 0;
		}
		.spec-title {
			font-size: 14px;
			font-weight: 600;
			margin-bottom: 6px;
		}
		.spec-body {
			color: rgb(124, 124, 124);
			display: flex;
			align-items: center;
			svg {
				margin-right: 7px;
				font-size: 15px;
			}
		}
	}
	.desc-title {
		font-size: 14px;
		font-weight: 600;
		padding: 2px 0 3px;
	}
	.desc-body {
		color: grey;
		font-size: 14px;
		letter-spacing: 0.2px;
	}
`;

const Right = styled.div`
	margin-left: 30px;
	display: flex;
	flex-flow: column;
	/* height: 100%; */

	.landlord-card {
		border: 1px solid rgb(236, 236, 236);
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		margin-bottom: 10px;
	}
	.name-pic {
		display: flex;
		align-items: center;
		flex-direction: column;
		span {
			font-weight: 600;
			padding: 2px 0;
		}
		.landlord-name {
			font-size: 20px;
		}
		.landlord-date {
			font-size: 12px;
			color: rgb(161, 161, 161);
		}
	}

	.landlord-contact {
		display: flex;
		flex-direction: column;
		width: 100%;

		* {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 35px;
			margin: 5px 0;
			border-radius: 5px;
			cursor: pointer;
			transition: all 0.2s linear;
		}

		.landlord-c {
			border: 1.5px solid #c7c7c7;
			background: white;
			/* &:hover {
				color: #f75757;
				transform: scale(1.01);
				box-shadow: 1px 1px 10px rgb(221, 221, 221);

				svg {
					animation: contact-landlord 1s 1 linear;
				}
			} 
			 &:hover {
				color: #f75757;
			} */
		}
		.landlord-e {
			border: 1.5px solid #f75757;
			background: #f75757;
			color: white;
			/* &:hover {
				transform: scale(1.01);
				box-shadow: 1px 1px 10px rgb(221, 221, 221);

				svg {
					animation: contact-landlord 1s 1 linear;
				}
			} */
		}
		svg {
			margin-right: 5px;
		}
	}

	.related-houses {
		height: 1px;
		flex-grow: 1;
		overflow-y: auto;
	}
	.related-title {
		padding: 5px 10px;
		font-size: 18px;
		font-weight: 600;
		opacity: 0.6;
	}
`;

const ImgContainer = styled.div`
	position: relative;
	width: 100%;
	height: 100px;
	border-radius: 5px;
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
`;

export default HouseScreen;
