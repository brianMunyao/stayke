import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AptFormScreen from './containers/AptFormScreen';
import AptImgScreen from './containers/AptImgScreen';
import HomeScreen from './containers/HomeScreen';
import LoginScreen from './containers/LoginScreen';
import MyProperty from './containers/MyProperty';
import SearchScreen from './containers/SearchScreen';
import SignUpScreen from './containers/SignUpScreen';

const MainApp = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={HomeScreen} />

				<Route path="/property/:id" component={HomeScreen} />

				<Route path="/search" component={SearchScreen} />

				<Route path="/login" component={LoginScreen} />

				<Route path="/signup" component={SignUpScreen} />

				<Route path="/list/property" component={AptFormScreen} />

				<Route path="/upload/image" component={AptImgScreen} />

				<Route path="/properties" component={MyProperty} />
			</Switch>
		</Router>
	);
};

export default MainApp;
