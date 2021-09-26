import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoCall, IoLockClosed, IoMail, IoPerson } from 'react-icons/io5';

import { isLoggedIn, registerUser } from '../apis/users';
import FormItem from '../components/FormItem';
import FormContainer from './FormContainer';
import { encrypt } from '../apis/funcs';

const SignUpScreen = () => {
    const [formError, setFormError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [cookies, setCookie] = useCookies(['user']);

    const formik = useFormik({
        initialValues: {
            fullname: '',
            phone: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .min(4, 'Fullname must be more than 3 characters')
                .required('Fullname is required'),
            phone: Yup.number()
                .min(9, "Number can't have less than 9 digits")
                .required('Number is required'),
            email: Yup.string()
                .email('Enter a valid email')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be more than 8 characters')
                .required('Password is required'),
        }),
        onSubmit: async(values) => {
            setSubmitting(true);
            setFormError('');
            try {
                const res = await registerUser({
                    ...values,
                    password: encrypt(values.password),
                });
                if (res.data) {
                    setCookie('user', res.data);
                } else {
                    setFormError(res.error);
                    setSubmitting(false);
                }
            } catch (e) {
                console.log(e);
                setFormError('Try again later.');
                setSubmitting(false);
            }
        },
    });

    if (isLoggedIn(cookies)) {
        if (!cookies.user.verified) {
            return <Redirect to = "/verify" / > ;
        }
        return <Redirect to = "/" / > ;
    }

    return ( <
        FormContainer submitting = { submitting }
        title = "Create Account"
        btnText = "Register"
        formError = { formError }
        onSubmit = { formik.handleSubmit } >
        <
        FormItem id = "fullname"
        Icon = { IoPerson }
        inputType = "text"
        label = "Fullname"
        value = { formik.values.fullname }
        error = { formik.errors.fullname }
        onChange = { formik.handleChange }
        onBlur = { formik.handleBlur }
        />{' '} <
        FormItem id = "phone"
        Icon = { IoCall }
        inputType = "number"
        label = "Phone Number"
        placeholder = "e.g. 0712345678"
        value = { formik.values.phone }
        error = { formik.errors.phone }
        onChange = { formik.handleChange }
        onBlur = { formik.handleBlur }
        />{' '} <
        FormItem id = "email"
        Icon = { IoMail }
        inputType = "email"
        label = "Email Address"
        value = { formik.values.email }
        error = { formik.errors.email }
        onChange = { formik.handleChange }
        onBlur = { formik.handleBlur }
        />{' '} <
        FormItem id = "password"
        Icon = { IoLockClosed }
        inputType = "password"
        label = "Password"
        value = { formik.values.password }
        error = { formik.errors.password }
        onChange = { formik.handleChange }
        onBlur = { formik.handleBlur }
        />{' '} <
        /FormContainer>
    );
};

export default SignUpScreen;