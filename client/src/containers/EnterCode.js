import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect, useHistory } from 'react-router';
import styled from 'styled-components';

import { randomGen, sendEmail } from '../apis/funcs';
import { isLoggedIn, updateUser } from '../apis/users';
import colors from '../config/colors';

const EnterCode = () => {
	const [cookies, setCookie] = useCookies(['user']);
	const [codeSent, setCodeSent] = useState(false);
	const [code, setCode] = useState(null);
	const [userCode, setUserCode] = useState(0);
	const [error, setError] = useState('');

	const history = useHistory();

	useEffect(() => {
		if (!codeSent) {
			const c = randomGen();
			setCode(c);
			sendEmail({
				to_email: cookies.user.email,
				to_name: cookies.user.fullname,
				message: c,
			});
			setCodeSent(true);
		}
	}, [codeSent, cookies.user.email, cookies.user.fullname, code]);

	const handleChange = (e) => {
		if (userCode === 0) {
			setUserCode(e.target.value.toString().substring(1));
		} else {
			setUserCode(e.target.value);
		}
	};

	const checkCode = () => {
		if (code === Number(userCode)) {
			updateUser({ verified: true }, cookies.user.id).then((res) => {
				setCookie('user', res.data);
				history.push('/');
			});
		} else {
			setError('code incorrect');
		}
	};

	const CodeNum = ({ c, index }) => {
		let classname = 'codeNum';

		//for default state
		if (c === 0) {
			classname = classname + ' empty';
			return <div className={classname}>{c[index]}</div>;
		}

		//normal operations
		if (c.toString().length === index) {
			classname = classname + ' active';
		} else if (c.toString().length > index) {
			classname = classname + ' entered';
		} else {
			classname = classname + ' empty';
		}

		return <div className={classname}>{c[index]}</div>;
	};

	if (!isLoggedIn(cookies)) {
		return <Redirect to="/login" />;
	} else {
		if (cookies.user.verified) {
			return <Redirect to="/" />;
		}
	}

	return (
		<Container>
			<div className="inner">
				<p className="title">Confirm Your Email</p>
				<p className="subtitle">
					Please confirm your account by entering the authentication
					code sent to{' '}
					{cookies.user.email.substr(0, 4) +
						'***@' +
						cookies.user.email.split('@')[1]}
				</p>

				<p className="error">{error}</p>
				<CodeCon>
					{Array(6)
						.fill(0)
						.map((v, i) => (
							<CodeNum c={userCode} index={i} key={i} />
						))}
				</CodeCon>
				<input
					type="number"
					autoFocus
					value={userCode}
					onBlur={(e) => e.target.focus()}
					onChange={handleChange}
					max={999999}
				/>

				<button onClick={checkCode}>Upload</button>
			</div>
		</Container>
	);
};

const CodeCon = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	padding: 15px 0 25px;
	.codeNum {
		height: 45px;
		width: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		font-weight: 600;
	}
	.active {
		border-bottom: 2px solid ${colors.primaryDark};
	}
	.empty {
		border-bottom: 2px solid ${colors.grey};
	}
	.entered {
		border-bottom: 2px solid ${colors.primaryLight};
	}
`;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	min-height: 300px;
	display: flex;
	align-items: center;
	justify-content: center;

	div.inner {
		width: 400px;
		padding: 15px;
		background: ${colors.lightGrey};

		.title {
			font-size: 23px;
			font-weight: 600;
			text-align: center;
			padding: 15px 0;
		}
		.subtitle {
			text-align: center;
			opacity: 0.8;
			padding: 5px 0;
		}
		.error {
			color: ${colors.error};
			text-align: center;
		}
		input {
			width: 0;
			height: 0;
			opacity: 0;
			pointer-events: none;
		}
		button {
			width: 100%;
			border: none;
			background: ${colors.primary};
			color: ${colors.white};
			transition: all 0.1s linear;
			border-radius: 8px;
			padding: 5px 15px;
			cursor: pointer;

			&:hover {
				background: ${colors.primaryDark};
			}
			&:active {
				background: ${colors.primaryDarker};
			}
			&:disabled {
				background: ${colors.primaryLight};
				cursor: not-allowed;
			}
		}
	}
`;

export default EnterCode;
