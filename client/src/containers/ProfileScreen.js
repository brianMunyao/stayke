import React from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';

import { isLoggedIn } from '../apis/users';

const ProfileScreen = () => {
	const [cookies] = useCookies(['user']);

	if (!isLoggedIn(cookies)) {
		return <Redirect to="/login" />;
	}
	return <div> Profile </div>;
};

export default ProfileScreen;
