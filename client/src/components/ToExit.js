import React from 'react';
import styled from 'styled-components';

const ToExit = ({ nav, right, visible, onClick }) => {
	return (
		<Container
			nav={nav}
			right={right}
			visible={visible}
			onClick={onClick}
		/>
	);
};

const Container = styled.div`
	position: fixed;
	height: 100vh;
	top: 0;
	left: 0;
	right: ${(props) => props.right + 'px'};
	background: #ffffffc1;
	z-index: 1;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	transform: ${(props) =>
		props.visible ? 'translateX(0)' : 'translateX(-110%)'};
	/* display: ${(props) => (props.nav ? 'block' : 'none')}; */

	@media (min-width: 768px) {
		/* display: ${(props) => (props.nav ? 'none' : 'block')}; */
	}
`;

export default ToExit;
