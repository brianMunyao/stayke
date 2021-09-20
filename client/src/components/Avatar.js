import React from 'react';
import styled from 'styled-components';

import colors from '../config/colors';

const Avatar = ({ name = '', size = 40 }) => {
	const getInitials = (n = '') => {
		const splits = n.split(' ');
		let initials = '';

		for (let i = 0; i < 2; i++) {
			initials += splits[i].charAt(0);
		}
		return initials;
	};
	return (
		<AvatarStyle size={size} className="avatar">
			{getInitials(name)}
		</AvatarStyle>
	);
};

const AvatarStyle = styled.div`
	background: ${colors.primaryDark};
	color: white;
	width: ${(props) => `${props.size}px`};
	height: ${(props) => `${props.size}px`};
	border-radius: 25px;
	letter-spacing: 0.5px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default Avatar;
