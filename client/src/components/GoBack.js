import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const GoBack = () => {
	const history = useHistory();
	const onClick = () => history.goBack();
	return (
		<Back onClick={onClick}>
			<FaArrowLeft /> Back
		</Back>
	);
};

const Back = styled.div`
	display: flex;
	align-items: center;
	font-size: 14px;
	padding: 5px 8px;
	cursor: pointer;
	color: rgb(112, 112, 112);

	svg {
		transition: all 0.1s linear;
		margin-right: 6px;
	}

	&:hover svg {
		margin-right: 3px;
	}
`;

export default GoBack;
