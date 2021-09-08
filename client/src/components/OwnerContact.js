import moment from 'moment';
import React from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import styled from 'styled-components';

import { capitalize } from '../apis/funcs';
import colors from '../config/colors';

const OwnerContact = ({ data }) => {
	return (
		<Container>
			<p className="owner">{capitalize(data.fullname)}</p>
			<p className="date">
				Created on {moment(data.date_created).format('MMMM Do YYYY')}
			</p>

			<div className="links">
				<a href={`tel:${data.phone}`} className="call">
					<div>
						<FaPhoneAlt />
					</div>
				</a>
				<a href={`mailto:${data.email}`} className="email">
					<div>
						<FaEnvelope />
					</div>
				</a>
			</div>
		</Container>
	);
};

const Container = styled.div`
	margin: 10px 0;
	box-shadow: 2px 3px 10px ${colors.lightGrey};
	padding: 15px 5px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;

	p {
		text-align: center;
	}
	.owner {
		font-size: 18px;
		font-weight: 600;
		padding-bottom: 5px;
	}
	.date {
		font-size: 13px;
		letter-spacing: 0.2px;
		opacity: 0.6;
	}
	div.links {
		padding-top: 10px;
		display: flex;
		flex-direction: row;

		a {
			margin: 0 10px;

			div {
				width: 45px;
				height: 45px;
				background: ${colors.primary};
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: all 0.2s linear;
				border-radius: 30px;
				&:hover {
					background: ${colors.primaryDark};
				}
				&:active {
					background: ${colors.primaryDarker};
				}
			}
		}
	}
`;

export default OwnerContact;
