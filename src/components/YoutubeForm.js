import { React } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  channel: '',
};
const onSubmit = (values) => {
  console.log('formSubmit Data ==>', values);
};

const validateSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('required'),
  channel: Yup.string()
    .required('Channel name is required')
    .min(4, 'Min length should be at least 4'),
});
function YoutubeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <label htmlFor='name'>Name</label>
        <Field type='text' name='name' id='name' />
        <ErrorMessage name='name' />
        <label htmlFor='password'>E-mail</label>
        <Field type='email' name='email' id='email' />
        <ErrorMessage name='email' />
        <label htmlFor='channel'>Channel</label>
        <Field type='text' name='channel' id='channel' />
        <ErrorMessage name='channel' />
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;
