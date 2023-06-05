// LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'; // Import Yup for form validation
import data from '../Data';
import './style.css'

const LoginPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: values => {
      const user = data.find(
        user => user.username.toLowerCase() === values.username.toLowerCase() && user.password === values.password
      );

      if (user) {
        navigate('/home', {state: {name:user.name}});
      } else {
        alert('Invalid username or password');
      }
    }
  });

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit} className="form">
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

        <button type="submit" className="submit-button">Sign In</button>
      </form>
      <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default LoginPage;
