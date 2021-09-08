import React, { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import ScrollLock from 'react-scrolllock';
import { FaEye, FaPen, FaPlusCircle } from 'react-icons/fa';
import styled from 'styled-components';

import { deleteProperty, getMyProperties, getProperties } from '../apis/houses';
import { isLoggedIn } from '../apis/users';
import HouseCard from '../components/HouseCard';
import HouseListCon from '../components/HouseListCon';
import GoBack from '../components/GoBack';
import { capitalize } from '../apis/funcs';
import SideView from '../components/SideView';
import colors from '../config/colors';

const MyProperty = () => {
	const [cookies] = useCookies(['user']);
	const [myProperties, setMyProperties] = useState([]);
	const [editMode, setEditMode] = useState(false);

	const [openHouseID, setOpenHouseID] = useState(null);
	const [scrollLock, setScrollLock] = useState(false);

	const history = useHistory();

	const _getMyProperties = useCallback(async () => {
		try {
			if (!isLoggedIn(cookies)) return;
			const res = await getMyProperties(cookies.user.id);
			if (res.data) {
				setMyProperties(res.data);
			}
		} catch (e) {}

		// console.log(res);
	}, [cookies]);

	useEffect(() => {
		// try {
		_getMyProperties();
		if (openHouseID !== null) {
			setScrollLock(true);
		}
		// } catch (e) {}
	}, [_getMyProperties, openHouseID]);

	if (!isLoggedIn(cookies)) {
		return <Redirect to="/" />;
	}

	const addNewProperty = () => {
		history.push('/list/property');
	};

	const editHouse = (id) => {
		setOpenHouseID(id);
	};

	const deleteHouse = async (id) => {
		const res = await deleteProperty(id);
		// window.location.reload();
		_getMyProperties();
	};

	const closeOpenHouse = () => {
		setOpenHouseID(null);
		setScrollLock(false);
	};

	const toggleMode = () => setEditMode(!editMode);

	return (
		<ScrollLock isActive={scrollLock}>
			<Container>
				<div className="topbar">
					<div className="back">
						<GoBack />
						<div className="name">
							{myProperties.length > 0 &&
								capitalize(myProperties[0].fullname)}
						</div>
					</div>
					{/* <div className="mode">
						{editMode ? (
							<span onClick={toggleMode}>
								<FaEye />
								Public View
							</span>
						) : (
							<span onClick={toggleMode}>
								<FaPen /> Edit Mode
							</span>
						)}
					</div> */}
				</div>
				<HouseListCon>
					<div className="new-house" onClick={addNewProperty}>
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
	.topbar {
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.back {
			display: flex;
			align-items: center;
		}
		.name {
			font-weight: 600;
			font-size: 20px;
		}
	}
	div.mode {
		cursor: pointer;
		background: red;
		span {
		}
	}
	.new-house {
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
`;

export default MyProperty;
