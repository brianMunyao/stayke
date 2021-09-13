import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoPerson } from 'react-icons/io5';
import styled from 'styled-components';
import { FaBed, FaDollarSign, FaMapMarkerAlt, FaShower } from 'react-icons/fa';

import { createApartment } from '../apis/houses';
import { isLoggedIn } from '../apis/users';
import FormItem from '../components/FormItem';
import Logo from '../components/Logo';
import colors from '../config/colors';
import { counties } from '../apis/funcs';

const AptFormScreen = () => {
	const [formError, setFormError] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [cookies, setCookie] = useCookies(['user']);

	const history = useHistory();

	const formik = useFormik({
		validateOnBlur: true,
		initialValues: {
			apt_name: '',
			county: '',
			town: '',
			no_of_bedrooms: '',
			no_of_bathrooms: '',
			rent: '',
			apt_desc: '',
		},
		validationSchema: Yup.object({
			apt_name: Yup.string().required('House name is required'),
			county: Yup.string().required('County is required'),
			town: Yup.string().required('Town is required'),
			no_of_bedrooms: Yup.string().required('Field is required'),
			no_of_bathrooms: Yup.string().required('Field is required'),
			rent: Yup.string().required('Rent is required'),
			apt_desc: Yup.string().optional('op'),
		}),
		onSubmit: async (values) => {
			console.log(values);
			// setSubmitting(true);
			// setFormError('');

			// try {
			// 	const res = await createApartment({
			// 		...values,
			// 		user_id: cookies.user.id,
			// 		img1: null,
			// 	});

			// 	if (res.data) {
			// 		setCookie('user', { ...cookies.user, hasProperties: true });
			// 		history.push('/upload/image/', res.data.id);
			// 	} else {
			// 		setFormError(res.error);
			// 	}
			// } catch (e) {
			// 	setFormError('Submittion error.');
			// 	setSubmitting(false);
			// }
		},
	});

	if (!isLoggedIn(cookies)) return <Redirect to="/login" />;

	return (
		<Container>
			<Navbar>
				<Logo link size={40} />
			</Navbar>
			<Form>
				<FormInner>
					<h2>Register Your House</h2>

					<p className="error">{formError && formError}</p>

					<form onSubmit={formik.handleSubmit}>
						<FormItem
							id="apt_name"
							Icon={IoPerson}
							inputType="text"
							label="House name"
							value={formik.values.apt_name}
							error={formik.errors.apt_name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>

						<DualInputs>
							<FormItem
								width="48%"
								id="county"
								Icon={FaMapMarkerAlt}
								label="County"
								list={counties}
								value={formik.values.county}
								error={formik.errors.county}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<FormItem
								width="48%"
								id="town"
								Icon={FaMapMarkerAlt}
								inputType="text"
								label="Town"
								value={formik.values.town}
								error={formik.errors.town}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</DualInputs>

						<DualInputs>
							<FormItem
								width="48%"
								id="no_of_bedrooms"
								Icon={FaBed}
								inputType="number"
								label="No of bedrooms"
								placeholder="e.g. 1"
								value={formik.values.no_of_bedrooms}
								error={formik.errors.no_of_bedrooms}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<FormItem
								width="48%"
								id="no_of_bathrooms"
								Icon={FaShower}
								inputType="number"
								label="No of bathrooms"
								placeholder="e.g. 2"
								value={formik.values.no_of_bathrooms}
								error={formik.errors.no_of_bathrooms}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
						</DualInputs>

						<FormItem
							id="rent"
							Icon={FaDollarSign}
							inputType="number"
							label="Rent"
							value={formik.values.rent}
							error={formik.errors.rent}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<FormItem
							id="apt_desc"
							textarea
							label="Brief Description"
							placeholder="describe your house"
							value={formik.values.apt_desc}
							error={formik.errors.apt_desc}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						<FormItem
							disabled={submitting}
							inputType="submit"
							label="Submit"
						/>
					</form>
				</FormInner>
			</Form>
		</Container>
	);
};

const Container = styled.div`
	width: 100%;
	height: 100vh;
	min-height: 600px;
	display: flex;
	flex-direction: column;
`;

const Navbar = styled.nav`
	width: 100%;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Form = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
`;

const FormInner = styled.div`
	width: 350px;
	height: 500px;

	h2 {
		text-align: center;
		padding: 5px 0 10px;
		letter-spacing: 0.6px;
	}

	p.error {
		color: ${colors.error};
		text-align: center;
		font-size: 14px;
	}
`;

const DualInputs = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export default AptFormScreen;
