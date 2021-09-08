import React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie';

import colors from '../config/colors';
import animation from '../assets/circle_loader.json';

const FormItem = ({
	width,
	id,
	Icon,
	inputType,
	label,
	placeholder,
	value,
	error,
	disabled,
	onChange,
	onBlur,
}) => {
	if (inputType === 'submit') {
		return (
			<FormButton type="submit" disabled={disabled}>
				{disabled ? (
					<Lottie
						isClickToPauseDisabled={true}
						options={{
							loop: true,
							autoplay: true,
							animationData: animation,
						}}
						height={25}
					/>
				) : (
					label
				)}
			</FormButton>
		);
	} else {
		return (
			<FormInput width={width}>
				<label htmlFor={id}>{label}</label>
				<div>
					<Icon />
					<input
						id={id}
						name={id}
						type={inputType}
						value={value}
						placeholder={placeholder ? placeholder : label}
						onChange={onChange}
						onBlur={onBlur}
					/>
				</div>
				<p>{error}</p>
			</FormInput>
		);
	}
};

const FormInput = styled.div`
	width: ${(props) => (props.width ? props.width : '100%')};
	height: 75px;
	margin: 4px 0;
	overflow: hidden;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 18px 1fr 15px;

	label {
		font-size: 12.5px;
		font-weight: 600;
		letter-spacing: 0.1px;
		transform: translateX(10px);
		color: #585858;
	}
	div {
		position: relative;
		overflow: hidden;
		svg {
			opacity: 0.6;
			position: absolute;
			z-index: 1;
			top: 50%;
			transform: translate(10px, -50%);
			pointer-events: none;
		}
		input {
			width: 100%;
			height: 100%;
			padding: 0 10px 0 32px;
			border-radius: 10px;
			font-size: 14px;
			border: 1.5px solid rgb(225, 225, 225);
			transition: all 0.1s linear;
			&:focus {
				border: 1.5px solid ${colors.primary};
			}
		}
	}

	p {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.1px;
		color: ${colors.error};
		text-align: right;
	}
`;

const FormButton = styled.button`
	font-size: 15px;
	margin: 5px 0;
	height: 35px;
	width: 100%;
	cursor: pointer;
	background: ${colors.primary};
	color: rgb(240, 240, 240);
	transition: all 0.1s linear;
	border-radius: 8px;
	border: none;
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
`;

export default FormItem;
