import { React } from 'react';
import { useFormik } from 'formik';

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
};
function YoutubeForm(props) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        name='name'
        id='name'
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <label htmlFor='password'>E-mail</label>
      <input
        type='email'
        name='email'
        id='email'
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <label htmlFor='channel'>Channel</label>
      <input
        type='text'
        name='channel'
        id='channel'
        value={formik.values.channel}
        onChange={formik.handleChange}
      />
      <button type='submit'>Submit</button>
    </form>
  );
}

export default YoutubeForm;
