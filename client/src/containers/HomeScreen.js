import React, { useEffect, useState } from 'react';
import ScrollLock from 'react-scrolllock';
import styled from 'styled-components';

import { getProperties } from '../apis/houses';
import HouseCard from '../components/HouseCard';
import HomeSlider from '../components/HomeSlider';
import Loader from '../components/Loader';
import SideView from '../components/SideView';
import TopNav from '../components/TopNav';
import HouseListCon from '../components/HouseListCon';

const HomeScreen = () => {
	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState([]);
	const [openHouseID, setOpenHouseID] = useState(null);

	const [navOpen, setNavOpen] = useState(false);
	const [scrollLock, setScrollLock] = useState(false);

	useEffect(() => {
		try {
			getProperties()
				.then((res) => {
					if (res.data) {
						setProperties(res.data);
						setTimeout(() => setLoading(false), 1000);
					} else {
						console.log(res);
					}
				})
				.catch((err) => console.log(err));
		} catch (e) {
			console.log('caught err, getProperties, home');
		}

		if (openHouseID !== null) {
			setScrollLock(true);
		}
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

	if (loading) return <Loader />;
	return (
		<ScrollLock isActive={scrollLock}>
			<Home id="main">
				<TopNav visible={navOpen} toggleNav={toggleNav} />

				<HomeSlider data={properties} />

				<div className="houses-section">
					<p className="featured-title">Featured Houses</p>

					<HouseListCon>
						{properties.map((p, index) => (
							<HouseCard
								key={index}
								data={p}
								onClick={() => setOpenHouseID(p.id)}
							/>
						))}
					</HouseListCon>
				</div>

				<div className="houses-section">
					<p className="featured-title">New Listings</p>

					<HouseListCon>
						{properties.map((p, index) => (
							<HouseCard
								key={index}
								data={p}
								onClick={() => setOpenHouseID(p.id)}
							/>
						))}
					</HouseListCon>
				</div>

				<SideView
					id={openHouseID}
					visible={openHouseID !== null}
					update={(id) => setOpenHouseID(id)}
					close={closeOpenHouse}
				/>

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
	.featured-title {
		font-size: 30px;
		padding: 20px 30px;
		font-weight: 700;
		color: #6c6b69;
		text-align: center;
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
