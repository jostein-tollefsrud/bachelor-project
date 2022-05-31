import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Textfield from './Textfield';
import Button from './Button';
import FormFeedback from './FormFeedback';

import { useRouter } from 'next/router';

const ContactForm = () => {
  const [successSubmission, setSuccessSubmission] = useState(false);
  const [submission, setSubmission] = useState(false);

  const router = useRouter();
  const { locale } = router;
  const norsk = locale === 'nb';

  // Form submit handler - sending to backend, which sends the email
  const handleSubmit = async (inputFields) => {
    console.log(inputFields);

    let final = Object.assign(
      { templateId: 'd-075f8b12c0ba429a95955b458f5ae183' },
      inputFields
    );

    const res = await fetch('/api/sendgrid', {
      body: JSON.stringify(final),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    setSubmission(true);
    if (res.status === 200) {
      setSuccessSubmission(true);
    } else {
      //const { error } = await res.json();
      console.log(error);
      setSuccessSubmission(false);
    }
  };

  const INITIAL_FORM_STATE = {
    Navn: '',
    Epost: '',
    Emne: '',
    Melding: '',
    Utstyr: [],
  };

  const FORM_VALIDATION = Yup.object().shape({
    Navn: Yup.string()
      .required(norsk ? 'Nødvendig!' : 'Required!')
      .min(
        2,
        norsk
          ? 'Navn må inneholde minst 2 tegn!'
          : 'Must include minimum 2 characters!'
      ),
    Epost: Yup.string()
      .email(norsk ? 'Feil email format!' : 'Wrong email format!')
      .required(norsk ? 'Nødvendig!' : 'Required'),
    Emne: Yup.string().required(norsk ? 'Nødvendig!' : 'Required!'),
    Melding: Yup.string().required(norsk ? 'Nødvendig!' : 'Required!'),
  });

  return (
    // <MainContainer>

    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values);
        resetForm();
      }}
    >
      {({ isSubmitting, values, handleChange, handleBlur }) => (
        <Form>
          {submission && (
            <FormFeedback
              submissionSuccess={successSubmission}
              handleExit={() => setSubmission(false)}
            />
          )}
          <Textfield
            label={norsk ? 'Navn' : 'Name'}
            name="Navn"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Textfield
            label={norsk ? 'E-post' : 'E-mail'}
            name="Epost"
            type="mail"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Textfield
            label={norsk ? 'Emne' : 'Subject'}
            name="Emne"
            type="text"
            value={values.subject}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Textfield
            label={norsk ? 'Melding' : 'Message'}
            name="Melding"
            type="text"
            multiline={true}
            rows={4}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />

          <Button disabled={isSubmitting}>
            {isSubmitting
              ? norsk
                ? 'Sender'
                : 'Sending'
              : norsk
              ? 'Send melding'
              : 'Send message'}
          </Button>
        </Form>
      )}
    </Formik>

    // </MainContainer>
  );
};

export default ContactForm;
