import React, { useEffect, useState } from 'react';
import ScrollLock from 'react-scrolllock';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { getProperties } from '../apis/houses';
import HouseCard from '../components/HouseCard';
import HomeSlider from '../components/HomeSlider';
import Loader from '../components/Loader';
import SideView from '../components/SideView';
import TopNav from '../components/TopNav';
import HouseListCon from '../components/HouseListCon';
import FeaturedList from '../components/FeaturedList';

const HomeScreen = () => {
	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState([]);
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
						console.log(res);
					}
				})
				.catch((err) => console.log(err));
		} catch (e) {
			console.log('caught err, getProperties, home');
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
					// onClick={(id) => setOpenHouseID(id)}
				/>

				{properties.length > 0 && (
					<div className="houses-section">
						<p className="section-title">New Listings</p>
						<p className="section-subtitle">
							Be the first to check out the latest houses listed.
						</p>

						<HouseListCon>
							{properties.map((p, index) => (
								<HouseCard
									key={index}
									data={p}
									onClick={() => moveToHouse(p.id)}
									// onClick={() => setOpenHouseID(p.id)}
								/>
							))}
						</HouseListCon>
					</div>
				)}

				{/* <SideView
					id={openHouseID}
					visible={openHouseID !== null}
					update={(id) => setOpenHouseID(id)}
					close={closeOpenHouse}
				/> */}

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

		@media (max-width: 1150px) {
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
