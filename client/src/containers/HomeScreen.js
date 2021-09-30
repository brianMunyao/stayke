import React, { useEffect, useState } from 'react';
import ScrollLock from 'react-scrolllock';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { IoCall, IoHome, IoSearch } from 'react-icons/io5';

import { getNewestPropeties, getProperties } from '../apis/houses';
import HouseCard from '../components/HouseCard';
import HomeSlider from '../components/HomeSlider';
import Loader from '../components/Loader';
import TopNav from '../components/TopNav';
import HouseListCon from '../components/HouseListCon';
import FeaturedList from '../components/FeaturedList';
import colors from '../config/colors';
import { sendEmail } from '../apis/funcs';
import { isSubscribed } from '../apis/users';

const HomeScreen = () => {
	const [loading, setLoading] = useState(true);
	const [properties, setProperties] = useState([]);
	const [newest, setNewest] = useState([]);
	const [openHouseID, setOpenHouseID] = useState(null);
	const [subscription, setSubscription] = useState('');
	const [cookies, setCookie] = useCookies(['sub']);

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

	const handleSubChange = (e) => {
		setSubscription(e.target.value);
	};
	const handleSubSubmit = () => {
		if (Yup.string().email().isValidSync(subscription)) {
			if (!isSubscribed(cookies)) {
				sendEmail({ to_email: subscription }, 'template_xm745kj');
				setCookie('sub', { email: subscription });
			}
		}
	};

	const toggleNav = () => {
		if (openHouseID !== null) {
			setOpenHouseID(null);
		}
		setNavOpen(!navOpen);
		setScrollLock(!scrollLock);
	};

	const moveToHouse = (id) => history.push(`/property/${id}`);

	if (loading) return <Loader />;
	return (
		<ScrollLock isActive={scrollLock}>
			<Home id="main" sub={isSubscribed(cookies)}>
				<TopNav visible={navOpen} toggleNav={toggleNav} />

				<HomeSlider data={properties} />

				<div className="working-section" id="how">
					<p className="section-title">How It Works</p>
					<p className="section-subtitle">
						Our simple steps that help you find the perfect home.
					</p>

					<div className="working-items">
						<div className="working-item">
							<IoSearch />
							<div>
								<p className="w-title">Search</p>
								<p className="w-subtitle">
									Browse through the listed properties with
									properties you like.
								</p>
							</div>
						</div>
						<div className="working-item">
							<IoHome />
							<div>
								<p className="w-title">Find Home</p>
								<p className="w-subtitle">
									Settle on a house choice you may be
									interested to live in.
								</p>
							</div>
						</div>
						<div className="working-item">
							<IoCall />
							<div>
								<p className="w-title">Call to Book</p>
								<p className="w-subtitle">
									Get in touch with the property owner to book
									your next perfect home.
								</p>
							</div>
						</div>
					</div>
				</div>

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
							value={subscription}
							onChange={handleSubChange}
							type="email"
							placeholder="Enter your email here"
						/>
						<span onClick={handleSubSubmit}>
							{isSubscribed(cookies) ? 'Subscribed' : 'Subscribe'}
						</span>
					</div>
				</div>

				<Footer>
					© {new Date().getFullYear()} stayKe. All rights reserved
				</Footer>
			</Home>
		</ScrollLock>
	);
};

const iconShake = keyframes`
	0%{
		transform: rotate(0);
	}
	20%{
		transform: rotate(10deg)
	}
	30%{
		transform: rotate(5deg);
	}
	40%{
		transform: rotate(0);
	}
	60%{
		transform: rotate(-10deg);
	}
	80%{
		transform: rotate(-5deg);
	}
	100%{
		transform: rotate(0);
	}
`;

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

	.working-section {
		width: 100%;
		padding: 10px 80px;
		transition: all 0.1s linear;

		.working-items {
			display: grid;
			gap: 20px;
			width: 90%;
			margin: 0 5%;
			grid-template-columns: repeat(3, minmax(250px, 1fr));
			grid-auto-rows: 210px;

			.working-item {
				width: 86%;
				margin: 0 7%;
				height: 100%;
				box-shadow: 1px 1px 10px #d8d8d8a2;
				padding: 10px 15px;
				border-radius: 5px;
				transition: all 0.1s linear;
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				user-select: none;
				background: white;

				svg {
					font-size: 40px;
					margin: 5px 10px;
					color: ${colors.primary};
					transition: all 0.1s linear;
				}
				p {
					padding: 4px 2px;
					letter-spacing: 0.2px;
				}
				.w-title {
					font-size: 17px;
					font-weight: 700;
					opacity: 0.7;
				}
				.w-subtitle {
					font-size: 15px;
					font-weight: 400;
					opacity: 0.6;
				}

				&:hover {
					svg {
						animation: ${iconShake} 0.4s ease-in-out 1;
					}
				}
			}
		}
		@media (max-width: 1120px) {
			padding: 10px 50px;
			.working-items {
				gap: 15px;
				width: 96%;
				margin: 0 2%;
				.working-item {
					width: 86%;
					margin: 0 7%;
				}
			}
		}
		@media (max-width: 900px) {
			padding: 10px;

			.working-items {
				.working-item {
					width: 100%;
					margin: 0;
				}
			}
		}
		@media (max-width: 850px) {
			.working-items {
				grid-template-columns: repeat(3, minmax(220px, 1fr));
			}
		}
		@media (max-width: 760px) {
			.working-items {
				grid-template-columns: 1fr;
				.working-item {
					width: 50%;
					margin: 0 25%;
				}
			}
		}
		@media (max-width: 600px) {
			.working-items {
				.working-item {
					width: 70%;
					margin: 0 15%;
				}
			}
		}

		@media (max-width: 500px) {
			.working-items {
				.working-item {
					width: 88%;
					margin: 0 6%;
				}
			}
		}
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
				cursor: ${(props) => (props.sub ? 'auto' : 'pointer')};
				margin: 5px 5px 5px 2px;
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 7px;
				background: ${(props) =>
					props.sub ? colors.primaryLight : colors.primary};
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
