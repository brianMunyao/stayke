import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const EditableText = ({
	textarea,
	style,
	inputStyle = {
		width: '150px',
	},
	display,
	value,
	onBlur,
}) => {
	const [active, setActive] = useState(false);
	const [hovered, setHovered] = useState(false);
	const [temp, setTemp] = useState(value);

	useEffect(() => {
		setTemp(value);
	}, [value]);

	const handleBlur = () => {
		if (value !== temp) {
			onBlur(temp);
		}
	};

	return (
		<Container
			style={style}
			hovered={hovered}
			onMouseOver={() => setHovered(true)}
			onMouseOut={() => setHovered(false)}
			onDoubleClick={() => setActive(true)}
			onBlur={() => setActive(false)}>
			{active ? (
				textarea ? (
					<textarea
						autoFocus
						value={temp}
						onChange={(e) => setTemp(e.target.value)}
						onBlur={handleBlur}
						onKeyUp={(e) => {
							if (e.key === 'Enter') e.currentTarget.blur();
						}}
						style={inputStyle}
					/>
				) : (
					<input
						autoFocus
						type="text"
						value={temp}
						onChange={(e) => setTemp(e.target.value)}
						onBlur={handleBlur}
						onKeyUp={(e) => {
							if (e.key === 'Enter') e.currentTarget.blur();
						}}
						style={inputStyle}
					/>
				)
			) : display ? (
				display
			) : textarea ? (
				<span>{value}</span>
			) : (
				value
			)}
		</Container>
	);
};

const Container = styled.div`
	border: ${(props) =>
		props.hovered
			? `1px dashed ${colors.primaryLight}`
			: '1px dashed transparent'};
	transition: all 0.2s ease-in-out;
	user-select: none;
	cursor: text;

	input,
	textarea {
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
	}
`;

export default EditableText;
