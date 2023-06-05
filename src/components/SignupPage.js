// SignupPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; // Import Yup for form validation
import data from '../Data';
import './style.css'

const SignupPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'), 
      confirmPassword: Yup.string()
                    .required('Confirm Password is required')
                    .oneOf([Yup.ref('password'), null], 'Passwords must matched')
    }),
    onSubmit: values => {
      const existingUser = data.find(user => user.username.toLowerCase() === values.username.toLowerCase());
      if (existingUser) {
        alert('User already exists. Please choose a different username.');
      } else {
        const newUser = {
          id: data.length + 1,
          name: values.name,
          email: values.email,
          username: values.username,
          password: values.password
        };

        data.push(newUser);

        navigate('/login');
      }
    }
  });

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit} className="form">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="input-field"
        />
        {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="input-field"
        />
        {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="input-field"
        />
        {formik.touched.username && formik.errors.username && <div className="error">{formik.errors.username}</div>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="input-field"
        />
        {formik.touched.password && formik.errors.password && <div className="error">{formik.errors.password}</div>}

        <label htmlFor='confirmPassword'>Confirm Password</label>

        <input 
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className='input-field' 
          />

          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className='error'>{formik.errors.confirmPassword}</div>
          )}

        <button type="submit" className="submit-button">Sign Up</button>
      </form>
      <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignupPage;
