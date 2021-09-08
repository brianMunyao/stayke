import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const EditableText = ({ styles, display, value, onBlur }) => {
	const [active, setActive] = useState(false);
	const [hovered, setHovered] = useState(false);

	const [temp, setTemp] = useState(value);

	useEffect(() => {
		setTemp(value);
	}, [value]);

	return (
		<Container
			style={styles}
			hovered={hovered}
			onMouseOver={() => setHovered(true)}
			onMouseOut={() => setHovered(false)}
			onDoubleClick={() => setActive(true)}
			onBlur={() => setActive(false)}>
			{active ? (
				<input
					autoFocus
					type="text"
					value={temp}
					onChange={(e) => setTemp(e.target.value)}
				/>
			) : display ? (
				display
			) : (
				value
			)}
		</Container>
	);
};

const Container = styled.span`
	border: ${(props) =>
		props.hovered
			? `1px dashed ${colors.primaryLight}`
			: '1px dashed transparent'};
	transition: all 0.2s ease-in-out;
	/* padding: 2px; */
	user-select: none;
	cursor: text;
	/* width: max-content; */

	input {
		font-size: inherit;
		width: 100%;
	}
`;

export default EditableText;
