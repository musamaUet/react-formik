import { React } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  channel: '',
};
const onSubmit = (values) => {
  console.log('formSubmit Data ==>', values);
};

const validate = (values) => {
  let errors = {};
  let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!values.name) errors.name = 'Required';
  if (!values.email) errors.email = 'Required';
  else if (!emailRegex.test(values.email)) errors.email = 'Invalid email';
  if (!values.channel) errors.channel = 'Required';
  else if (values.channel?.length < 3)
    errors.channel = 'Channel name must be three characters long.';
  return errors;
};
function YoutubeForm(props) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  console.log('form.errors', formik.errors);
  console.log('onBlur', formik.touched);
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        name='name'
        id='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className='error'>{formik.errors.name}</div>
      ) : null}
      <label htmlFor='password'>E-mail</label>
      <input
        type='email'
        name='email'
        id='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className='error'>{formik.errors.email}</div>
      ) : null}
      <label htmlFor='channel'>Channel</label>
      <input
        type='text'
        name='channel'
        id='channel'
        value={formik.values.channel}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.channel && formik.errors.channel ? (
        <div className='error'>{formik.errors.channel}</div>
      ) : null}
      <button type='submit'>Submit</button>
    </form>
  );
}

export default YoutubeForm;
