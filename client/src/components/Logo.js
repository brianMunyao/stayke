import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

const Logo = ({ link, size = 33 }) => {
	if (link) {
		return (
			<Link to="/">
				<img src={logo} alt="logo" height={size} />
			</Link>
		);
	}
	return <img src={logo} alt="logo" height={size} />;
};

export default Logo;
