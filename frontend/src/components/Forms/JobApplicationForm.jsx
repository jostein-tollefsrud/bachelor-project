import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Textfield from './Textfield';
import Button from './Button';
import Checkbox from './Checkbox';
import { useState } from 'react';
import FormFeedback from './FormFeedback';
import { useRouter } from 'next/router';

const JobApplicationForm = () => {
  const router = useRouter();
  const { locale } = router;
  const norsk = locale === 'nb';

  const [successSubmission, setSuccessSubmission] = useState(false);
  const [submission, setSubmission] = useState(false);
  const handleSubmit = async (inputFields) => {
    let final = Object.assign(
      { templateId: 'd-29962ce5666342d6a495a2ffd36a806c' },
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

  const checkBoxOptions = [
    {
      label: 'Booking',
      name: 'Stilling',
      id: 1,
      value: 'Booking',
    },
    {
      label: 'Bar',
      name: 'Stilling',
      id: 2,
      value: 'Taleanlegg',
    },
    {
      label: 'Cover',
      name: 'Stilling',
      id: 3,
      value: 'Cover',
    },
    {
      label: norsk ? 'Teknisk' : 'Technical',
      name: 'Stilling',
      id: 8,
      value: 'Teknisk',
    },
    {
      label: norsk ? 'PR og Foto' : 'PR and Photo',
      name: 'Stilling',
      id: 4,
      value: 'Pr&Foto',
    },
    {
      label: norsk ? 'Vakt' : 'Security',
      name: 'Stilling',
      id: 5,
      value: 'Vakt',
    },
    {
      label: 'Event',
      name: 'Stilling',
      id: 6,
      value: 'Event',
    },
    {
      label: norsk ? 'Vet ikke' : "Don't know",
      name: 'Stilling',
      id: 7,
      value: 'Vet ikke',
    },
  ];
  const INITIAL_FORM_STATE = {
    Navn: '',
    Epost: '',
    Om: '',
    Stilling: [],
  };

  const FORM_VALIDATION = Yup.object().shape({
    Navn: Yup.string()
      .required(norsk ? 'Nødvendig!' : 'Required!')
      .min(
        2,
        norsk
          ? 'Navn må inneholde minst 2 tegn!'
          : 'Must contain minimum two characters!'
      ),
    Epost: Yup.string()
      .email(norsk ? 'Feil e-post format!' : 'Incorrect email format!')
      .required(norsk ? 'Nødvendig!' : 'Required!'),
    Om: Yup.string().required(norsk ? 'Nødvendig!' : 'Required!'),
    // kanskje legge til mer validation her
    Stilling: Yup.array().required(norsk ? 'Nødvendig!' : 'Required!'),
  });

  return (
    // <MainContainer>
    <Formik
      initialValues={{ ...INITIAL_FORM_STATE }}
      validationSchema={FORM_VALIDATION}
      onSubmit={async (values) => {
        console.log(values);
        await handleSubmit(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {submission && (
            <FormFeedback
              submissionSuccess={successSubmission}
              handleExit={() => setSubmission(false)}
            />
          )}
          <Textfield label={norsk ? 'Navn' : 'Name'} name="Navn" type="text" />
          <Textfield
            label={norsk ? 'E-post' : 'Mail'}
            name="Epost"
            type="mail"
          />

          <div role="group" aria-labelledby="checkbox-group">
            <Checkbox
              type="checkbox"
              name="Stilling"
              checkBoxOptions={checkBoxOptions}
            />
          </div>

          <Textfield
            label={
              norsk ? 'Fortell oss litt om deg selv' : 'Tell us about yourself'
            }
            name="Om"
            type="text"
            multiline={true}
            rows={4}
          />

          <Button disabled={isSubmitting}>
            {norsk ? 'Send forespørsel' : 'Send request'}
          </Button>
        </Form>
      )}
    </Formik>
    // </MainContainer>
  );
};

export default JobApplicationForm;
