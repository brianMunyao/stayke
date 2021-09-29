import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
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
		getWidth();
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
						</div>
					</div>
				</div>
			)}
		</Con>
	);
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
					font-size: 15px;
					opacity: 0.7;
					display: flex;
					align-items: center;
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
		}
	}
`;

export default HouseScreen;
