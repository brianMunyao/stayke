import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

import Logo from './Logo';
import { isLoggedIn } from '../apis/users';
import colors from '../config/colors';
import ToExit from './ToExit';

const TopNav = ({ visible, toggleNav }) => {
	const [cookies, removeCookie] = useCookies(['user']);

	const logout = () => {
		// window.location.reload();
		removeCookie('user');
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
			{/* <UserIcon /> */}
			<div className="logout" onClick={logout}>
				Logout
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
			{}

			<Link to="/" className="middle-link">
				About
			</Link>
		</>
	);

	return (
		<>
			<ToExit visible={visible} right={200} onClick={toggleNav} nav />
			<Nav visible={visible}>
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
		background-color: white;
		display: none;
		flex-direction: column;
		transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: 0px 10px 50px rgb(175, 175, 175);
		transform: ${(props) =>
			props.visible ? 'translateX(0)' : 'translateX(110%)'};

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
		border: 1.5px solid ${colors.primary};
		color: white;
		background: ${colors.primary};
		padding: 5px 10px;
		border-radius: 8px;
		&:hover {
			color: ${colors.primary};
			background: ${colors.white};
		}
	}

	.middle-link {
		border-bottom: 1.5px solid transparent;
		&:hover {
			color: ${colors.primary};
			border-bottom: 1.5px solid ${colors.primary};
		}
	}
	.logout {
		color: white;
		background: ${colors.error};
		opacity: 0.8;
		padding: 5px 12px;
		border-radius: 8px;
		transition: all 0.2s linear;
		cursor: pointer;
		&:hover {
			opacity: 1;
		}
	}

	.nav-bars {
		font-size: 20px;
		cursor: pointer;
	}
`;

export default TopNav;
