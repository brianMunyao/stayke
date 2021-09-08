import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const SearchRadioBtn = ({ selected, label, name, val, onClick }) => {
	const tempStyle =
		selected === val
			? {
					border: '1px solid ' + colors.primary,
					backgroundColor: colors.primary,
					color: 'white',
			  }
			: {
					border: '1px solid rgb(220, 220, 220)',
					backgroundColor: 'white',
					color: 'rgb(100, 100, 100)',
			  };

	return (
		<Label
			htmlFor={name}
			className="search-radio"
			style={tempStyle}
			onClick={onClick}>
			{label}
			<input type="radio" name={name} id={name} value={val} />
		</Label>
	);
};

const Label = styled.label`
	font-size: 14px;
	letter-spacing: 0.5px;
	margin: 2px;
	border-radius: 5px;
	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transition: all 0.1s linear;

	input {
		position: absolute;
		height: 0;
		width: 0;
	}
`;

export default SearchRadioBtn;
