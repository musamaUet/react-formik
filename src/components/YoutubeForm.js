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
  phoneNumbers: ['', ''],
};
const onSubmit = (values, onSubmitProps) => {
  console.log('onSubmitProps', onSubmitProps);
  onSubmitProps.setSubmitting(true);
  console.log('formSubmit Data ==>', values);
  //after formSubmission and apis responding
  onSubmitProps.setSubmitting(false);
  // after successful form data submission with apis.
  onSubmitProps.resetForm();
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
  social: Yup.object({
    facebook: Yup.string().min(3).max(100).required().label('Facebook'),
    twitter: Yup.string().min(3).max(100).required().label('Twitter'),
  }),
  phoneNumbers: Yup.array().of(
    Yup.string()
      .min(5)
      .max(20)
      .required('Phone Number is required')
      .label('Phone Number')
  ),
  password: Yup.string().min(6).max(25).required('password required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password', ''), 'Password did not match'])
    .required('confirm password is required'),
  phone: Yup.string().when('modeOfContact', {
    is: 'telephonic',
    then: Yup.string().required('required'),
  }),
});
const validateComment = (value) => {
  let error;
  if (!value) {
    error = 'Comment is required!';
  }
  return error;
};
function YoutubeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSchema}
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={true}
      validateComment={true}
      validateOnMount={false}
      // enableReinitialize={true}
    >
      {(formik) => {
        console.log('formik object ==>', formik);
        return (
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
                validate={validateComment}
              />
              <ErrorMessage name='comment' />
            </div>
            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              <Field name='address'>
                {(props) => {
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
              <label htmlFor='facebook'>Facebook</label>
              <Field type='text' id='facebook' name='social.facebook' />
              <ErrorMessage name='social.facebook' />
            </div>
            <div className='form-control'>
              <label htmlFor='twitter'>Twitter</label>
              <Field type='text' id='twitter' name='social.twitter' />
              <ErrorMessage name='social.twitter' />
            </div>
            <div className='form-control'>
              <label htmlFor='primaryPh'>Primary Phone</label>
              <Field type='number' id='primaryPh' name='phoneNumbers[0]' />
              <ErrorMessage name='phoneNumbers[0]' />
            </div>
            <div className='form-control'>
              <label htmlFor='secondaryPh'>Secondary Phone</label>
              <Field type='number' id='secondaryPh' name='phoneNumbers[1]' />
              <ErrorMessage name='phoneNumbers[1]' />
            </div>

            <button
              type='button'
              onClick={() => formik.setFieldTouched('comment')}
            >
              Validat Comment Field
            </button>
            <button
              type='button'
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                })
              }
            >
              Validate All Fields
            </button>
            <button
              type='submit'
              // fomik.isSubmitting is true till that form-submission is running in background.
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
