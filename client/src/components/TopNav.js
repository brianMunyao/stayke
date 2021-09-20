import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

import Logo from './Logo';
import { isLoggedIn } from '../apis/users';
import colors from '../config/colors';
import ToExit from './ToExit';
import Avatar from './Avatar';

const TopNav = ({ visible, toggleNav }) => {
	const [cookies, removeCookie] = useCookies(['user']);
	const [avatarHover, setAvatarHover] = useState(false);

	const logout = () => removeCookie('user');

	const onMouseEnter = () => {
		if (window.innerWidth > 768) setAvatarHover(true);
	};

	const linksOnAuth = !isLoggedIn(cookies) ? (
		<>
			<Link to="/login" className="signin">
				Login
			</Link>
			<Link to="/signup" className="signup">
				Create account
			</Link>
		</>
	) : (
		<>
			<div className="auth-link middle-link">Profile</div>
			<div className="line nav-line"></div>
			<div
				className="user-icon"
				onMouseOver={onMouseEnter}
				onMouseLeave={() => setAvatarHover(false)}>
				<Avatar name={cookies.user.fullname} size={35} />
				<span className="user-fullname">{cookies.user.fullname}</span>
			</div>
			<div className="signout" onClick={logout}>
				Sign Out
			</div>
		</>
	);

	const MiddleLinks = () => (
		<>
			<Link to="/" className="middle-link">
				Home
			</Link>
			{isLoggedIn(cookies) ? (
				cookies.user.hasProperties ? (
					<Link to="/properties" className="middle-link">
						My Properties
					</Link>
				) : (
					<Link to="/list/property" className="middle-link">
						List Property
					</Link>
				)
			) : (
				<Link to="/list/property" className="middle-link">
					List Property
				</Link>
			)}

			<Link to="/" className="middle-link">
				About
			</Link>
		</>
	);

	return (
		<>
			<ToExit visible={visible} right={200} onClick={toggleNav} nav />
			<Nav visible={visible} avatarHover={avatarHover}>
				<Logo width={120} link />

				<FaBars className="nav-bars" onClick={toggleNav} />

				<div className="mob-nav">
					<FaTimes className="close-nav-bar" onClick={toggleNav} />
					<MiddleLinks />
					{linksOnAuth}
				</div>

				<div className="middle-links">
					<MiddleLinks />
				</div>
				<div className="auths">{linksOnAuth}</div>

				<div className="nav-more">
					<div className="more-square"></div>
					<div className="more-link">Profile</div>
					<div className="line"></div>
					<div className="more-link" onClick={logout}>
						Sign Out
					</div>
				</div>
			</Nav>
		</>
	);
};

const Nav = styled.nav`
	z-index: 5;
	display: flex;
	width: 100%;
	height: 60px;
	align-items: center;
	padding: 0 40px;
	background-color: rgb(250, 250, 250);
	box-shadow: 1px 0px 10px rgb(209, 209, 209);
	justify-content: space-between;

	a {
		transition: all 0.2s linear;
		margin: 0 10px;
		letter-spacing: 0.5px;
		font-size: 15px;
		color: ${colors.darkGrey};
	}

	.nav-bars {
		display: none;
		@media (max-width: 768px) {
			display: block;
		}
	}
	.middle-links,
	.auths {
		display: block;
		@media (max-width: 768px) {
			display: none;
		}
	}

	/** new
	 */
	.mob-nav {
		position: fixed;
		top: 0;
		right: 0;
		width: 200px;
		height: 100vh;
		padding: 20px 0 50px;
		z-index: 5;
		background: white;
		display: none;
		flex-direction: column;
		transition: transform 0.3s linear;
		box-shadow: 0px 10px 50px rgb(175, 175, 175);
		transform: ${(props) =>
			props.visible ? 'translateX(0)' : 'translateX(110%)'};
		overflow: auto;

		@media (max-width: 768px) {
			display: flex;
		}

		.close-nav-bar {
			margin-bottom: 15px;
			font-size: 25px;
			cursor: pointer;
		}
		* {
			margin: 10px auto;
		}
		a.signin,
		.logout {
			margin-top: auto;
		}
	}

	a.signin {
		padding: 3px;
		margin-left: auto;
		border-bottom: 1.5px solid transparent;
		&:hover {
			border-bottom: 1.5px solid ${colors.primary};
			color: ${colors.primary};
		}
	}
	a.signup {
		color: white;
		background: ${colors.primary};
		padding: 5px 10px;
		border-radius: 8px;
		&:hover {
			background: ${colors.primaryDark};
		}
		&:active {
			background: ${colors.primaryDarker};
		}
	}

	.middle-link {
		border-bottom: 1.5px solid transparent;
		&:hover {
			color: ${colors.primary};
			border-bottom: 1.5px solid ${colors.primary};
		}
	}

	.user-icon {
		display: flex;
		flex-direction: row;
		align-items: center;
		user-select: none;
		cursor: pointer;

		span {
			margin-left: 8px;
			font-size: 17px;
			font-weight: 600;
			@media (min-width: 768px) {
				display: none;
			}
		}
	}
	.signout {
		color: ${colors.error};
		user-select: none;
		opacity: 0.7;
		cursor: pointer;
		padding: 2px;
		&:hover {
			opacity: 1;
		}
	}
	.signout,
	.auth-link {
		@media (min-width: 768px) {
			display: none;
		}
	}
	.auth-link {
		user-select: none;
		cursor: pointer;
	}

	.nav-bars {
		font-size: 20px;
		cursor: pointer;
	}
	.nav-more {
		position: absolute;
		width: 300px;
		top: 60px;
		right: 10px;
		z-index: 1;
		display: ${(props) => (props.avatarHover ? 'block' : 'none')};
		background: white;
		border-radius: 10px;
		padding: 10px;
		box-shadow: 2px 3px 10px #5757579b;
		&:hover {
			display: block;
		}
		.more-square {
			width: 25px;
			height: 20px;
			position: absolute;
			right: 35px;
			top: -12px;
		}

		.more-link {
			padding: 8px 10px;
			transition: all 0.1s linear;
			user-select: none;
			cursor: pointer;
			&:hover {
				background: ${colors.lightGrey};
			}
		}
	}
	.line {
		width: 92%;
		margin: 4px 4%;
		height: 1px;
		background: #bbbbbb;
		opacity: 0.2;
	}
	.nav-line {
		display: block;
		@media (min-width: 768px) {
			display: none;
		}
	}
`;

export default TopNav;
