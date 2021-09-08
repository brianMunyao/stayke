import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import { IoFolderOpen, IoImage } from 'react-icons/io5';

import animation from '../assets/uploading.json';
import colors from '../config/colors';

const AptImgScreen = () => {
	const [image, setImage] = useState(null);
	const [formError, setFormError] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const location = useLocation();
	const history = useHistory();

	const handleFileChange = (file) => {
		try {
			if (file.type.split('/', 1)[0] === 'image') {
				setImage(file);
				setFormError('');
			} else {
				setFormError('Only image files allowed');
			}
		} catch (e) {}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (image == null) {
			setFormError('Image requred');
		} else {
			let formData = new FormData();
			formData.set('file', image);
			setSubmitting(true);

			await axios
				.put(
					`http://localhost:5000/property/${location.state}`,
					formData,
					{
						headers: { 'Content-Type': 'multipart/form-data' },
					}
				)
				.then((res) => {
					console.log(res);
					setFormError('');
					setSubmitting(false);
					history.push('/properties');
				})
				.catch((e) => {
					console.log(e);
					setSubmitting(false);
					setFormError('Server error, try again later');
				});
		}
	};

	if (!location.state) return <Redirect to="/list/property" />;

	return (
		<Container>
			<Inner file={image}>
				<FileLabel htmlFor="file">
					<div className="title">
						<p className="t">Post your house</p>
						<p className="st">Image should be jpeg, jpg or png</p>
						<p className="et">{formError}</p>
					</div>

					<div className="drop">
						<IoFolderOpen />
						<p>Upload the main house image</p>
					</div>

					<input
						type="file"
						name="file"
						id="file"
						onChange={(e) => handleFileChange(e.target.files[0])}
					/>
				</FileLabel>

				<div className="files">
					{image && (
						<FileList>
							<IoImage />
							{image.name.length > 36
								? image.name.substr(0, 35) + '...'
								: image.name}
						</FileList>
					)}
					<button className="btn" onClick={handleSubmit}>
						Upload
					</button>
				</div>

				{submitting && (
					<div className="loader">
						<Lottie
							isClickToPauseDisabled={true}
							options={{
								loop: true,
								autoplay: true,
								animationData: animation,
							}}
							height={150}
						/>
					</div>
				)}
			</Inner>
		</Container>
	);
};

const FileList = styled.div`
	height: 20px;
	opacity: 0.7;
	display: flex;
	align-items: center;
	user-select: none;
	font-size: 14px;
	letter-spacing: 0.5px;

	svg {
		margin: 0 8px;
	}
`;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	min-height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #f5f5f5;
`;

const Inner = styled.div`
	position: relative;
	background: ${colors.white};
	transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	width: 380px;
	display: grid;
	grid-template-rows: ${(props) => (props.file ? '1fr 70px' : '1fr 0px')};
	height: ${(props) => (props.file ? '400px' : '300px')};
	box-shadow: 10px 10px 10px ${colors.lightGrey};
	border-radius: 20px;
	padding: 15px 25px;
	overflow: hidden;

	div.loader {
		position: absolute;
		background: #6060664e;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	div.files {
		margin: 10px 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		button {
			display: ${(props) => (props.file ? 'block' : 'none')};
			width: 100%;
			border: none;
			background: ${colors.primary};
			color: ${colors.white};
			transition: all 0.1s linear;
			border-radius: 8px;
			padding: 5px 15px;
			cursor: pointer;

			&:hover {
				background: ${colors.primaryDark};
			}
			&:active {
				background: ${colors.primaryDarker};
			}
			&:disabled {
				background: ${colors.primaryLight};
				cursor: not-allowed;
			}
		}
	}
`;

const FileLabel = styled.label`
	display: grid;
	grid-template-rows: ${(props) =>
		props.file ? '80px 1fr 60px' : '80px 1fr 0px'};

	input {
		display: none;
		width: 0;
		height: 0;
	}

	div.title {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		text-align: center;
		padding: 5px 0;
		letter-spacing: 0.4px;
		transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		p.t {
			font-size: 28px;
			font-weight: 600;
		}
		p.st {
			font-size: 13px;
			opacity: 0.6;
		}
		p.et {
			font-size: 14px;
			color: ${colors.error};
		}
	}

	div.drop {
		border: dashed 1.5px ${colors.primaryLight};
		border-radius: 10px;
		height: 100%;
		width: 100%;
		padding: 5px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;

		svg {
			font-size: 90px;
			color: ${colors.primary};
			margin-bottom: 10px;
		}
		p {
			color: ${colors.primaryLight};
			font-size: 15px;
		}
	}
`;

export default AptImgScreen;
