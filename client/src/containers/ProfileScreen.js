import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaPlusCircle } from 'react-icons/fa';
import { Redirect, useHistory } from 'react-router';
import ScrollLock from 'react-scrolllock';
import styled from 'styled-components';

import { capitalize } from '../apis/funcs';
import { deleteProperty, getMyProperties } from '../apis/houses';
import { isLoggedIn } from '../apis/users';
import Avatar from '../components/Avatar';
import HouseCard from '../components/HouseCard';
import HouseListCon from '../components/HouseListCon';
import SideView from '../components/SideView';
import TopNav from '../components/TopNav';
import colors from '../config/colors';

const ProfileScreen = () => {
	const [navOpen, setNavOpen] = useState(false);
	const [scrollLock, setScrollLock] = useState(false);
	const [myProperties, setMyProperties] = useState([]);
	const [openHouseID, setOpenHouseID] = useState(null);

	const [cookies] = useCookies(['user']);

	const history = useHistory();

	const _getMyProperties = useCallback(async () => {
		try {
			if (!isLoggedIn(cookies)) return;
			const res = await getMyProperties(cookies.user.id);
			if (res.data) {
				setMyProperties(res.data);
			}
		} catch (e) {}
	}, [cookies]);

	useEffect(() => {
		_getMyProperties();
		if (openHouseID !== null) {
			setScrollLock(true);
		}
	}, [_getMyProperties, openHouseID]);

	const toggleNav = () => {
		setNavOpen(!navOpen);
		setScrollLock(!scrollLock);
	};

	const addNewProperty = () => {
		history.push('/list/property');
	};

	const editHouse = (id) => {
		setOpenHouseID(id);
	};

	const deleteHouse = async (id) => {
		const res = await deleteProperty(id);
		_getMyProperties();
	};

	const closeOpenHouse = () => {
		setOpenHouseID(null);
		setScrollLock(false);
	};

	if (!isLoggedIn(cookies)) {
		return <Redirect to="/login" />;
	}

	return (
		<ScrollLock isActive={scrollLock}>
			<Container>
				<TopNav visible={navOpen} toggleNav={toggleNav} />
				<div className="p-inner">
					<Avatar
						name={cookies.user.fullname}
						size={100}
						textSize={40}
					/>

					<p className="p-name">
						{capitalize(cookies.user.fullname)}
					</p>

					<p className="p-date-joined">
						Joined on{' '}
						{moment(cookies.user.date_created).format(
							'MMMM Do YYYY'
						)}
					</p>

					<div className="p-item">
						<span className="p-email">{cookies.user.email}</span>
						{cookies.user.verified ? (
							<span className="p-verified">Verified</span>
						) : (
							<span className="p-unverified">Not Verified</span>
						)}
					</div>

					<p className="p-title">
						My Properties ({myProperties.length})
					</p>

					<HouseListCon style={{ width: '100%' }}>
						<div className="p-new-house" onClick={addNewProperty}>
							<FaPlusCircle fill={colors.primaryLight} />
						</div>
						{myProperties.map((p, index) => (
							<HouseCard
								key={index}
								owner
								editHouse={editHouse}
								deleteHouse={deleteHouse}
								data={p}
								onClick={() => setOpenHouseID(p.id)}
							/>
						))}
					</HouseListCon>
				</div>

				<SideView
					owner
					id={openHouseID}
					visible={openHouseID !== null}
					update={(id) => setOpenHouseID(id)}
					close={closeOpenHouse}
				/>
			</Container>
		</ScrollLock>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
	padding-bottom: 50px;

	.p-inner {
		width: 100%;
		padding: 50px 20px;
		display: flex;
		align-items: center;
		flex-direction: column;

		.p-title {
			width: 100%;
			padding: 5px 10px;
			font-weight: 600;
			letter-spacing: 0.3px;
			opacity: 0.9;
		}

		.p-name {
			font-size: 30px;
			font-weight: 600;
			padding: 10px 0;
			letter-spacing: 0.3px;
		}

		.p-date-joined {
			opacity: 0.7;
			padding: 5px 0;
		}
		.p-item {
			padding: 5px 0;
			letter-spacing: 0.3px;

			* {
				padding: 0 3px;
			}

			.p-verified {
				color: ${colors.successDark};
			}
			.p-unverified {
				color: ${colors.error};
			}
		}

		.p-new-house {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 50px;
			border: 1px dashed ${colors.primary};
			border-radius: 10px;
			cursor: pointer;
			transition: all 0.1s linear;
			&:hover {
				font-size: 60px;
			}
		}
	}
`;

export default ProfileScreen;
