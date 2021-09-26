import React, { useEffect, useState } from 'react';
import {
	FaBath,
	FaBed,
	FaMapMarkerAlt,
	FaPlusCircle,
	FaTimesCircle,
	FaTrashAlt,
} from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { capitalize, money } from '../apis/funcs';
import { deleteImage, getProperty, updateInfo } from '../apis/houses';
import colors from '../config/colors';
import AppSlider from './AppSlider';
import EditableText from './EditableText';
import HouseRelated from './HouseRelated';
import Loader from './Loader';
import OwnerContact from './OwnerContact';
import animation from '../assets/load-house.json';

const SideView = ({ id, visible, owner, update, close }) => {
	const [related, setRelated] = useState([]);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	const history = useHistory();

	useEffect(() => {
		if (id !== null && visible) {
			try {
				getProperty(id)
					.then((res) => {
						if (res.data) {
							setData(res.data);
							setRelated(res.related.filter((h) => h.id !== id));
							setLoading(false);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			} catch (e) {}
			document.querySelector('#divBody').scrollTo(0, 0);
		}
	}, [id, owner, visible]);

	const addImage = () => history.push('/upload/image/', id);

	const _deleteImage = async (label) => {
		const res = await deleteImage(id, label);
		if (res.data) close();
	};

	const updateData = (val, label) => {
		const obj = {};
		obj[label] = val;
		updateInfo(obj, id).then((res) => {
			if (res.data) {
				setData(res.data);
			}
		});
	};

	const ImageOwner = ({ image, label }) => {
		return (
			<div className="image-owner">
				{image ? (
					<>
						<img src={image} alt="house" />
						<div className="img-cover">
							<span onClick={() => _deleteImage(label)}>
								<FaTrashAlt />
							</span>
						</div>
					</>
				) : (
					<div className="img-new" onClick={addImage}>
						<FaPlusCircle fill={colors.primaryLight} />
					</div>
				)}
			</div>
		);
	};

	return (
		<Container visible={visible}>
			<div className="exit" onClick={close}></div>
			<div id="divBody" className="inner" visible={visible}>
				{loading ? (
					<Loader animation={animation} speed={2} height={100} />
				) : (
					<div className="inner-container">
						<div className="close">
							<FaTimesCircle onClick={close} />
						</div>

						{owner ? (
							<div className="image-list">
								<ImageOwner image={data.img1} label="img1" />
								<ImageOwner image={data.img2} label="img2" />
							</div>
						) : data.img2 ? (
							<AppSlider
								height={250}
								data={[data.img1, data.img2]}
								autoplay={false}
								rounded
							/>
						) : (
							<AppSlider
								height={250}
								data={[data.img1]}
								autoplay={false}
								rounded
							/>
						)}

						<div className="info">
							<div className="name-rent">
								<span className="name">
									<EditableText
										value={capitalize(data.apt_name)}
										onBlur={(val) =>
											updateData(val, 'apt_name')
										}
									/>
								</span>

								<span className="rent">
									<EditableText
										value={data.rent}
										onBlur={(val) =>
											updateData(val, 'rent')
										}
										display={`KES ${money(data.rent)}`}
									/>
								</span>
							</div>

							<p className="location">
								<FaMapMarkerAlt />{' '}
								{capitalize(data.town) +
									', ' +
									capitalize(data.county)}
							</p>

							<div className="specs">
								<div className="spec">
									<span className="spec-title">Bathroom</span>
									<span className="spec-body">
										<FaBath />
										<EditableText
											value={data.no_of_bathrooms}
											inputStyle={{ width: '40px' }}
											onBlur={(val) =>
												updateData(
													val,
													'no_of_bathrooms'
												)
											}
										/>
									</span>
								</div>
								<div className="spec">
									<span className="spec-title">Bedroom</span>
									<span className="spec-body">
										<FaBed />
										<EditableText
											value={data.no_of_bedrooms}
											inputStyle={{ width: '40px' }}
											onBlur={(val) =>
												updateData(
													val,
													'no_of_bedrooms'
												)
											}
										/>
									</span>
								</div>
								<div className="spec">
									<p className="spec-title">Description</p>
									<p className="desc-body">
										<EditableText
											value={data.apt_desc}
											inputStyle={{
												width: '258px',
												height: '100px',
											}}
											textarea
											onBlur={(val) =>
												updateData(val, 'apt_desc')
											}
										/>
									</p>
								</div>
							</div>

							{!owner && (
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
															update(p.id)
														}
													/>
												))}
											</div>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	transition: all 0.2s ease-in-out;
	transform: ${(props) =>
		props.visible ? 'translateX(0)' : 'translateX(110%)'};

	display: grid;
	grid-template-rows: 100%;
	grid-template-columns: 1fr 500px;

	@media (max-width: 540px) {
		grid-template-columns: 0 1fr;
		.inner {
			border-radius: 0;
		}
	}

	.exit {
		background: #ffffff96;
	}
	.inner {
		position: relative;
		background: white;
		overflow-x: hidden;
		overflow-y: scroll !important;
		-webkit-overflow-scrolling: touch;
		box-shadow: 1px 2px 10px ${colors.grey};
		transform: ${(props) =>
			props.visible ? 'translateX(0)' : 'translateX(110%)'};
		transition: transform 0.2s ease-in-out;

		.close {
			display: flex;
			align-items: center;
			svg {
				cursor: pointer;
				margin: 10px;
				font-size: 20px;
			}
		}

		.inner-container {
			padding: 40px 10px 10px;
			.close {
				position: absolute;
				z-index: 1;
				top: 0;
				left: 0;
				width: 100%;
				background: #ffffffb5;
			}
		}
		.image-list {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 200px;
			column-gap: 10px;
			justify-content: space-evenly;
			.image-owner {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 10px;
				img {
					height: 100%;
					position: absolute;
					margin: auto;
					top: -9999px;
					left: -9999px;
					right: -9999px;
					bottom: -9999px;
				}
				.img-new {
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
				.img-cover {
					z-index: 10;
					position: absolute;
					transition: all 1s linear;
					display: none;
					align-items: center;
					justify-content: center;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: #00000065;
					span {
						margin: 0 10px;
						width: 45px;
						height: 45px;
						background: ${colors.error};
						color: white;
						display: flex;
						align-items: center;
						justify-content: center;
						transition: all 0.2s linear;
						border-radius: 30px;
						opacity: 0.8;
						cursor: pointer;
						&:hover {
							opacity: 1;
						}
					}
				}
				&:hover .img-cover {
					display: flex;
				}
			}
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
				color: ${colors.primary};
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
				letter-spacing: 0.2px;
				svg {
					margin-right: 7px;
					font-size: 15px;
				}
			}
			.desc-body {
				color: rgb(124, 124, 124);
				cursor: pointer;
				letter-spacing: 0.2px;
				.desc-link {
					color: ${colors.primaryLight};
				}
			}
		}

		.related-houses {
			h3 {
				margin: 15px 0;
				letter-spacing: 0.3px;
				opacity: 0.7;
			}
		}
	}
`;

export default SideView;
