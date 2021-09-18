import React, { useEffect, useState } from 'react';
import {
	FaBath,
	FaBed,
	FaHeart,
	FaMapMarkerAlt,
	FaPhoneVolume,
	FaRegEnvelope,
} from 'react-icons/fa';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getProperty } from '../apis/houses';
import HouseRelated from '../components/HouseRelated';
import Loader from '../components/Loader';
import GoBack from '../components/GoBack';
import { capitalize, money } from '../apis/funcs';
import animation from '../assets/load-house.json';
import AppSlider from '../components/AppSlider';
import colors from '../config/colors';
import OwnerContact from '../components/OwnerContact';

const HouseScreen = () => {
	const { id } = useParams();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [yOffset, setYOffset] = useState(0);
	const [winWidth, setWinWidth] = useState(0);

	const [related, setRelated] = useState([]);

	const history = useHistory();

	const getWidth = () => {
		setWinWidth(window.innerWidth);
	};

	useEffect(() => {
		getProperty(id)
			.then((res) => {
				if (res.data) {
					setData(res.data);
					setRelated(res.related.filter((h) => h.id !== Number(id)));
					setLoading(false);
				}
			})
			.catch((e) => console.log(e));

		window.addEventListener('scroll', () => setYOffset(window.pageYOffset));
		window.addEventListener('resize', getWidth);
		return () => {
			window.removeEventListener('scroll', () =>
				setYOffset(window.pageYOffset)
			);
			window.removeEventListener('resize', getWidth);
		};
	}, [id]);

	const moveToHouse = (id) => history.push(`/property/${id}`);

	return (
		<Con>
			{loading ? (
				<Loader animation={animation} speed={2} height={100} />
			) : (
				<div className="inner">
					<div className="h-topbar">
						<GoBack />
						{yOffset > 70 && (
							<div className="tb-title">
								<span className="tb-name">
									{capitalize(data.apt_name)}
								</span>
								<span className="tb-loc">
									<FaMapMarkerAlt /> Located in{' '}
									{capitalize(data.town) +
										', ' +
										capitalize(data.county)}
								</span>
							</div>
						)}
					</div>

					<div className="h-bottom">
						<div className="slider-con">
							<div className="title-con">
								<p className="title">
									{capitalize(data.apt_name)}
								</p>
								<div className="sub-title">
									<span className="loc">
										<FaMapMarkerAlt /> Located in{' '}
										{capitalize(data.town) +
											', ' +
											capitalize(data.county)}
									</span>

									<div className="st-etc">
										<span className="save st-btn">
											<IoHeartOutline /> Save
										</span>
									</div>
								</div>
							</div>

							<AppSlider
								rounded
								height={winWidth < 690 ? 250 : 400}
								data={
									data.img2
										? [data.img1, data.img2]
										: [data.img1]
								}
							/>

							<div className="specs">
								<div className="spec-rent">
									<span className="rooms">
										{data.no_of_bedrooms} bedrooms{' . '}
										{data.no_of_bathrooms} bathrooms
									</span>
									<span className="rent">
										KES {money(data.rent)}
									</span>
								</div>

								<div className="h-desc">
									<p className="spec-title">Description</p>
									<p className="spec-subtitle">
										{data.apt_desc}
									</p>
								</div>
							</div>
						</div>

						<div className="sidebar">
							{/* {!owner && ( */}
							<>
								<OwnerContact data={data} />

								{related.length > 0 && (
									<div className="related-houses">
										<h3>Related properties</h3>

										<div className="related-list">
											{related.map((p, index) => (
												<HouseRelated
													data={p}
													key={index}
													onClick={() =>
														moveToHouse(p.id)
													}
												/>
											))}
										</div>
									</div>
								)}
							</>
							{/* )} */}
						</div>
					</div>
				</div>
			)}
		</Con>
	);

	// return (
	// 	<Container>
	// 		<div className="top-bar">
	// 			<GoBack />
	// 		</div>
	// 		<div className="main">
	// 			<main>
	// 				<Left>
	// 					<div className="house-images">
	// 						<div className="image-border">
	// 							<div className="main-image">
	// 								<img src={data.img1} alt="img1" />
	// 								{/* <Slider
	// 									className="slider"
	// 									autoplay
	// 									infinite
	// 									speed={500}
	// 									slidesToScroll={1}
	// 									slidesToShow={1}>
	// 									{/* {[data].map((d) => (
	// 								<ImgContainer>
	// 									<img src={data.img1} alt="img1" />
	// 								</ImgContainer>
	// 								 ))}
	// 								</Slider>
	// 								*/}
	// 							</div>
	// 						</div>
	// 					</div>
	// 					<div className="details">
	// 						<div className="name-rent">
	// 							<span className="name">{data.apt_name}</span>
	// 							<span className="rent">
	// 								KES {money(data.rent)}
	// 							</span>
	// 						</div>
	// 						<p className="location">
	// 							<FaMapMarkerAlt />{' '}
	// 							{data.town + ', ' + data.county}
	// 						</p>
	// 						<div className="specs">
	// 							<div className="spec">
	// 								<span className="spec-title">Bathroom</span>
	// 								<span className="spec-body">
	// 									<FaBath /> {data.no_of_bathrooms}
	// 								</span>
	// 							</div>
	// 							<div className="spec">
	// 								<span className="spec-title">Bedroom</span>
	// 								<span className="spec-body">
	// 									<FaBed /> {data.no_of_bedrooms}
	// 								</span>
	// 							</div>
	// 							<div className="desc">
	// 								<p className="desc-title">Description</p>
	// 								<p className="desc-body">{data.apt_desc}</p>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				</Left>

	// 				<Right>
	// 					<div className="landlord-card">
	// 						<div className="name-pic">
	// 							<span className="landlord-name">
	// 								Jonathan Straus
	// 							</span>
	// 							<span className="landlord-date">
	// 								Joined in Sep 01,2018
	// 							</span>
	// 						</div>

	// 						<div className="landlord-contact">
	// 							<span className="landlord-c">
	// 								<FaPhoneVolume />
	// 								Call
	// 							</span>
	// 							<span className="landlord-e">
	// 								<FaRegEnvelope /> Send a message
	// 							</span>
	// 						</div>
	// 					</div>

	// 					<p className="related-title">Related Searches</p>
	// 					<div className="related-houses">
	// 						{[].map((house) => (
	// 							<HouseRelated data={house} key={house.id} />
	// 						))}
	// 					</div>
	// 				</Right>
	// 			</main>
	// 		</div>
	// 	</Container>
	// );
};

const Con = styled.div`
	width: 100%;
	height: 100vh;

	.inner {
		position: relative;
		width: 100%;

		.h-topbar {
			position: fixed;
			z-index: 1;
			top: 0;
			left: 0;
			width: 100%;
			height: 60px;
			padding: 2px 5px;
			background-color: white;
			display: flex;
			flex-direction: row;
			align-items: center;

			.tb-title {
				display: flex;
				flex-direction: column;
				letter-spacing: 0.2px;
				padding-left: 5px;

				.tb-name {
					font-weight: 600;
					font-size: 17px;
				}
				.tb-loc {
					display: flex;
					align-items: center;
					font-size: 13px;
					opacity: 0.4;
					svg {
						margin-right: 2px;
					}
				}
			}
		}

		.h-bottom {
			display: grid;
			grid-template-columns: 70% 30%;
			width: 100%;
			padding: 60px 0 20px;

			@media (max-width: 1050px) {
				display: grid;
				grid-template-columns: 100%;
			}

			.title-con {
				padding: 10px 5px;
				.title {
					font-size: 30px;
					font-weight: 600;
					padding-bottom: 5px;
				}
				.sub-title {
					display: flex;
					flex-direction: row;
					justify-content: space-between;

					.st-btn {
						display: flex;
						flex-direction: row;
						align-items: center;
						cursor: pointer;
						transition: all 0.1s linear;

						svg {
							margin-right: 3px;
						}
					}
					.save {
						&:hover {
							color: ${colors.pink};
						}
					}
				}
				.loc {
					/* font-size: 16px; */
					/* font-size: 12px;*/
					font-size: 15px;
					opacity: 0.7;
					/* font-weight: 400; */

					display: flex;
					align-items: center;
					/* margin: 3px 10px 0; */
					* {
						margin-right: 2px;
					}
				}
			}
			.slider-con {
				position: relative;
				width: 100%;
				padding: 0 5%;

				div.specs {
					padding-bottom: 10px;
					.spec-rent {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 8px 0;
						opacity: 0.8;
						.rooms {
						}
						.rent {
							font-size: 24px;
							font-weight: 700;
						}
					}

					.h-desc {
						.spec-title {
							/* font-size: 14px; */
							font-weight: 600;
							margin-bottom: 2px;
						}
						.spec-body {
							color: rgb(124, 124, 124);
							display: flex;
							align-items: center;
							letter-spacing: 0.2px;
							svg {
								margin-right: 7px;
								font-size: 15px;
							}
						}
						.desc-body,
						.spec-subtitle {
							color: rgb(124, 124, 124);
							cursor: pointer;
							letter-spacing: 0.2px;
							.desc-link {
								color: ${colors.primaryLight};
							}
						}
					}
				}
			}
			.sidebar {
				padding: 0 5%;
			}
		}
	}

	@media (max-width: 1050px) {
		.h-bottom {
			display: flex;
			flex-direction: column;
			/* grid-template-columns: 100%; */
		}
	}
	@media (max-width: 768px) {
	}
	@media (max-width: 690px) {
	}
	@media (max-width: 540px) {
	}
`;

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
