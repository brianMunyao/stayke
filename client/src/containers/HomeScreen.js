import React, { useEffect, useState } from 'react';
import ScrollLock from 'react-scrolllock';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { getNewestPropeties, getProperties } from '../apis/houses';
import HouseCard from '../components/HouseCard';
import HomeSlider from '../components/HomeSlider';
import Loader from '../components/Loader';
import TopNav from '../components/TopNav';
import HouseListCon from '../components/HouseListCon';
import FeaturedList from '../components/FeaturedList';
import colors from '../config/colors';

const HomeScreen = () => {
	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState([]);
	const [newest, setNewest] = useState([]);
	const [openHouseID, setOpenHouseID] = useState(null);

	const [navOpen, setNavOpen] = useState(false);
	const [scrollLock, setScrollLock] = useState(false);

	const history = useHistory();

	useEffect(() => {
		try {
			getProperties()
				.then((res) => {
					if (res.data) {
						setProperties(res.data);
						setTimeout(() => setLoading(false), 1000);
					} else {
						// error
					}
				})
				.catch((err) => {
					// error
				});

			getNewestPropeties()
				.then((res) => {
					if (res.data) setNewest(res.data);
					else {
						// error
					}
				})
				.catch((err) => {
					// error
				});
		} catch (e) {
			// error
		}

		if (openHouseID !== null) setScrollLock(true);
	}, [openHouseID]);

	const toggleNav = () => {
		if (openHouseID !== null) {
			setOpenHouseID(null);
		}
		setNavOpen(!navOpen);
		setScrollLock(!scrollLock);
	};

	const closeOpenHouse = () => {
		setOpenHouseID(null);
		setScrollLock(false);
	};

	const moveToHouse = (id) => history.push(`/property/${id}`);

	if (loading) return <Loader />;
	return (
		<ScrollLock isActive={scrollLock}>
			<Home id="main">
				<TopNav visible={navOpen} toggleNav={toggleNav} />

				<HomeSlider data={properties} />

				<FeaturedList
					data={properties}
					onClick={(id) => moveToHouse(id)}
				/>

				{newest.length > 0 && (
					<div className="houses-section">
						<p className="section-title">New Listings</p>
						<p className="section-subtitle">
							Be the first to check out the latest houses listed.
						</p>

						<HouseListCon>
							{newest.map((p, index) => (
								<HouseCard
									key={index}
									data={p}
									onClick={() => moveToHouse(p.id)}
								/>
							))}
						</HouseListCon>
					</div>
				)}

				<div className="subscribe">
					<div className="sub-text">
						Get the latest updates and special offers
					</div>

					<div className="sub-input">
						<input
							type="email"
							placeholder="Enter your email here"
						/>
						<span>Subscribe</span>
					</div>
				</div>

				<Footer>
					© {new Date().getFullYear()} stayKe. All rights reserved
				</Footer>
			</Home>
		</ScrollLock>
	);
};

const Home = styled.div`
	.houses-section {
		display: flex;
		flex-flow: column;
		padding-bottom: 15px;
	}
	.section-title {
		font-size: 30px;
		padding: 30px 0 10px;
		font-weight: 700;
		color: #6c6b69;
		text-align: center;

		@media (max-width: 1150px) {
			padding: 20px 0px 5px;
		}
	}
	.section-subtitle {
		padding: 5px 0 20px;
		color: #acaba9;

		text-align: center;
	}

	.subscribe {
		width: 90%;
		margin: 30px 5%;
		height: 200px;
		background: linear-gradient(
			160deg,
			${colors.primaryLight},
			${colors.primary}
		);
		padding: 20px;
		border-radius: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		color: white;
		letter-spacing: 0.5px;
		text-align: center;

		.sub-text {
			font-size: 30px;
			font-weight: 600;
		}
		.sub-input {
			background: white;
			width: 400px;
			height: 50px;
			border-radius: 7px;
			overflow: hidden;
			position: relative;
			display: grid;
			grid-template-columns: 1fr 100px;
			grid-template-rows: 100%;

			input {
				padding: 7px 2px 7px 7px;
			}
			span {
				user-select: none;
				cursor: pointer;
				margin: 5px 5px 5px 2px;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 7px;
				background: ${colors.primary};
			}
		}

		@media (max-width: 500px) {
			height: 180px;

			.sub-text {
				font-size: 22px;
			}
			.sub-input {
				width: 280px;
				height: 45px;
				grid-template-columns: 1fr 80px;
			}
		}
	}
`;

const Footer = styled.footer`
	color: #8e8e9e;
	font-weight: lighter;
	font-size: 15px;
	letter-spacing: 1px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 20px 0;
`;

export default HomeScreen;
