import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div>
			<h1> PageNotFound </h1> <Link to="/pagenotfound"> Back home </Link>
		</div>
	);
};

export default PageNotFound;
