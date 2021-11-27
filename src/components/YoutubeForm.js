import { React } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextError from './TextError';
import * as Yup from 'yup';

const initialValues = {
  name: '',
  email: '',
  channel: '',
  comment: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
};
const onSubmit = (values) => {
  console.log('formSubmit Data ==>', values);
};

const validateSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('invalid email')
    .required('email is required')
    .max(25)
    .label('This Email'),
  channel: Yup.string()
    .required('Channel name is required')
    .min(4, 'Min length should be at least 4'),
  address: Yup.string().required('address is required'),
});
function YoutubeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className='form-control'>
          <label htmlFor='name'>Name</label>
          <Field type='text' name='name' id='name' />
          <ErrorMessage name='name' component={TextError} />
        </div>
        <div className='form-control'>
          <label htmlFor='password'>E-mail</label>
          <Field type='email' name='email' id='email' />
          <ErrorMessage name='email'>
            {(errMsg) => {
              return <div className='error'>{errMsg}</div>;
            }}
          </ErrorMessage>
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <Field type='text' name='channel' id='channel' />
          <ErrorMessage name='channel' />
        </div>
        <div className='form-control'>
          <label htmlFor='comment'>Comment</label>
          <Field
            as='textarea'
            rows={15}
            placeholder={'day 1: Temple visit,&#13;&#10;'}
            id='comment'
            name='comment'
          />
          <ErrorMessage name='comment' />
        </div>
        <div className='form-control'>
          <label htmlFor='address'>Address</label>
          <Field name='address'>
            {(props) => {
              console.log('props ==>', props);
              const { field, form, meta } = props;
              return (
                <div>
                  <input type='text' id='address' {...field} />
                  {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                  ) : null}
                </div>
              );
            }}
          </Field>
        </div>
        <div className='form-control'>
          <label htmlFor='facebook' />
          <Field type='text' id='facebook' name='social.facebook' />
        </div>
        <div className='form-control'>
          <label htmlFor='twitter' />
          <Field type='text' id='twitter' name='social.twitter' />
        </div>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;
