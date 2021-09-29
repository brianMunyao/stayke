import React, { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useLocation } from 'react-router-dom';
import ScrollLock from 'react-scrolllock';

import SearchRadioBtn from '../components/SearchRadioBtn';
import GoBack from '../components/GoBack';
import HouseCard from '../components/HouseCard';
import { searchHouse } from '../apis/houses';
import colors from '../config/colors';
import SideView from '../components/SideView';

const SearchScreen = () => {
	const [searched, setSearched] = useState([]);
	const [alternative, setAlternative] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [filter, setFilter] = useState({
		term: '',
		bathrooms: 0,
		bedrooms: 0,
		rent: [0, 100000],
	});

	const [filtersOpen, setFiltersOpen] = useState(false);
	const [openHouseID, setOpenHouseID] = useState(null);
	const [scrollLock, setScrollLock] = useState(false);
	const closeOpenHouse = () => {
		setOpenHouseID(null);
		setScrollLock(false);
	};

	const location = useLocation();

	const createSliderWithTooltip = Slider.createSliderWithTooltip;
	const Range = createSliderWithTooltip(Slider.Range);

	const applyFilter = useCallback(async (f) => {
		searchHouse(f).then((res) => {
			if (res.data) {
				setSearched(res.data);

				const _alt = [];
				res.alt.forEach((val) => {
					let absent = true;
					res.data.forEach((house) => {
						if (val.id === house.id) {
							absent = false;
						}
					});
					if (absent) _alt.push(val);
				});

				setAlternative(_alt);
			} else {
				console.log('error', res);
			}
		});
	}, []);

	const updateFilter = (lbl, val) => {
		const _filter = { ...filter };
		_filter[lbl] = val;
		setFilter(_filter);
		applyFilter(_filter);
	};

	const resetFilter = () => {
		const defaultFilter = {
			term: '',
			bathrooms: 0,
			bedrooms: 0,
			rent: [0, 100000],
		};
		setFilter(defaultFilter);
		applyFilter(defaultFilter);
	};

	const radioMap = (val, index, lbl) => {
		return (
			<SearchRadioBtn
				key={index}
				label={val}
				name={lbl + index}
				val={index}
				selected={filter[lbl]}
				onClick={() => updateFilter(lbl, index)}
			/>
		);
	};

	useEffect(() => {
		if (!loaded) {
			const f = { ...filter, term: location.state || '' };
			setFilter(f);
			applyFilter(f);
			setLoaded(true);
		}
	}, [filter, loaded, location.state, applyFilter]);

	return (
		<ScrollLock isActive={scrollLock}>
			<Container filtersOpen={filtersOpen}>
				<div className="top-bar">
					<GoBack />
					<div className="search-bar">
						<FaSearch />
						<input
							autoFocus
							type="text"
							placeholder="Search property.."
							value={filter.term}
							onChange={(e) =>
								updateFilter('term', e.target.value)
							}
						/>
					</div>
				</div>

				<div className="main">
					<span
						className="filters-title"
						onClick={() => setFiltersOpen(!filtersOpen)}>
						Advanced search
					</span>
					<div className="filters">
						<div className="filter">
							<p className="filter-title">Bedrooms</p>
							<div className="filter-radios-nums">
								{['Any', 1, 2, '3+'].map((val, index) =>
									radioMap(val, index, 'bedrooms')
								)}
							</div>
						</div>

						<div className="filter">
							<p className="filter-title">Bathrooms</p>
							<div className="filter-radios-nums">
								{['Any', 1, 2, '3+'].map((val, index) =>
									radioMap(val, index, 'bathrooms')
								)}
							</div>
						</div>

						<div className="filter">
							<div className="filter-title-div">
								<p className="filter-title">Rent</p>
								<span className="filter-range-val">
									{`KES${filter.rent[0].toLocaleString()} - KES${filter.rent[1].toLocaleString()}`}
								</span>
							</div>

							<div className="filter-range">
								<Range
									step={500}
									max={100000}
									min={0}
									defaultValue={filter.rent}
									onAfterChange={(val) =>
										updateFilter('rent', val)
									}
								/>
							</div>
						</div>

						{/* <div className="func-btns apply" onClick={applyFilter}>
						Apply Filters
					</div> */}
						<div className="func-btns reset" onClick={resetFilter}>
							Clear Filters
						</div>
						{/* <div className="filterToggle">
							{filtersOpen ? (
								<IoChevronUpCircleOutline
									onClick={() => setFiltersOpen(!filtersOpen)}
								/>
							) : (
								<IoChevronDownCircleOutline
									onClick={() => setFiltersOpen(!filtersOpen)}
								/>
							)}
						</div> */}
					</div>

					<div className="houses">
						<p className="houses-title">
							{searched.length} result(s) found
						</p>

						<div className="houses-list">
							{searched.map((house) => (
								<HouseCard
									data={house}
									key={house.id}
									onClick={() => setOpenHouseID(house.id)}
								/>
							))}
						</div>
						{alternative.length > 0 && (
							<>
								<h3 className="alt-title">You may also like</h3>

								<div className="houses-list">
									{alternative.map((house) => (
										<HouseCard
											data={house}
											key={house.id}
											onClick={() =>
												setOpenHouseID(house.id)
											}
										/>
									))}
								</div>
							</>
						)}
					</div>
				</div>
				<SideView
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
	height: 100vh;
	display: flex;
	flex-flow: column;

	.top-bar {
		height: 50px;
		border-bottom: 0.5px solid rgb(235, 235, 235);
		display: flex;
		align-items: center;

		.back {
			display: flex;
			align-items: center;
			font-size: 14px;
			padding: 5px 15px;
			cursor: pointer;
			color: rgb(112, 112, 112);
			svg {
				transition: all 0.1s linear;
				margin-right: 6px;
			}
			&:hover svg {
				margin-right: 3px;
			}
		}
		.search-bar {
			position: relative;
			overflow: hidden;
			height: 35px;
			width: 300px;
			border: 0.5px solid rgb(221, 221, 221);
			border-radius: 20px;
			display: flex;
			align-items: center;
			svg {
				margin-left: 10px;
				opacity: 0.5;
			}
			input {
				position: absolute;
				height: 100%;
				width: 100%;
				background-color: transparent;
				border: none;
				padding: 0 15px 0 35px;
				font-size: 16px;
				transition: all 0.1px linear;
			}
			&:hover {
				box-shadow: 1px 1px 10px rgb(240, 240, 240);
			}
		}
	}

	.main {
		flex-grow: 1;
		position: relative;
		overflow: hidden;

		.filters-title {
			display: none;
			color: ${colors.primary};
			cursor: pointer;
			padding: 2px 5px;
			margin: 0 10px;
			&:hover {
				text-decoration: underline;
			}
			@media (max-width: 830px) {
				display: flex;
			}
		}

		.filters {
			padding: 10px;
			left: 0;
			width: 250px;
			border-right: 0.5px solid rgb(247, 247, 247);
			position: absolute;
			overflow-y: auto;
			height: 100%;
			top: 0;
			transition: all 0.1s linear;
			pointer-events: all;
			z-index: 10;

			@media (max-width: 830px) {
				pointer-events: ${(props) =>
					props.filtersOpen ? 'all' : 'none'};
				width: 100%;
				top: 22px;
				height: ${(props) => (props.filtersOpen ? '150px' : '0')};
				display: grid;
				grid-template-columns: 1fr 1fr;
				column-gap: 10px;
				overflow: hidden;
			}
		}
		.houses {
			right: 0;
			left: 250px;
			padding: 10px 15px;
			position: absolute;
			overflow-y: auto;
			bottom: 0;
			top: 0;
			transition: all 0.1s linear;
			@media (max-width: 830px) {
				left: 0;
				top: ${(props) => (props.filtersOpen ? '172px' : '22px')};
			}

			.houses-list {
				transition: all 0.2s linear;
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
				grid-auto-rows: 250px;
				gap: 15px;
			}

			.houses-title {
				font-size: 14px;
				font-weight: 600;
				letter-spacing: 0.3px;
				margin-bottom: 10px;
				color: rgb(148, 148, 148);
			}
			.alt-title {
				margin: 15px 0;
				letter-spacing: 0.3px;
			}
		}
		.filter {
			border-bottom: 1px solid rgb(245, 245, 245);
			padding: 5px 0 10px;
			.filter-title {
				font-size: 15px;
				font-weight: 600;
				padding-bottom: 5px;
			}
			.filter-radios,
			.filter-radios-nums {
				display: grid;
				gap: 5px;
				grid-auto-rows: 35px;
			}
			.filter-radios {
				grid-template-columns: 1fr 1fr;
				padding: 0 5px;
			}
			.filter-radios-nums {
				grid-template-columns: repeat(auto-fit, minmax(20px, 1fr));
				padding: 0 5px;
			}
			.filter-range {
				height: 20px;
				display: flex;
				align-items: center;
				padding: 0 10px;
			}
			.filter-title-div {
				position: relative;
				display: flex;
				align-items: center;
				.filter-range-val {
					position: absolute;
					right: 0;
					color: ${colors.primary};
					font-weight: 600;
					font-size: 13px;
				}
			}
		}
		.func-btns {
			padding: 5px 10px;
			margin-top: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 5px;
			cursor: pointer;
			transition: all 0.1s linear;
		}
		.apply {
			border: 1px solid ${colors.success};
			background: ${colors.success};
			color: ${colors.white};
			&:hover {
				background: ${colors.successDark};
			}
		}
		.reset {
			border: 1px solid black;
			&:hover {
				border: 1px solid ${colors.error};
				color: ${colors.error};
				box-shadow: 1px 1px 10px ${colors.errorLight};
			}
		}
	}
`;

export default SearchScreen;
