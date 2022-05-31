import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import Textfield from './Textfield';
import Button from './Button';
import Checkbox from './Checkbox';
import DateTimePicker from './DateTimePicker';
import { useState } from 'react';
import FormFeedback from './FormFeedback';
import { useRouter } from 'next/router';

const BookingForm = () => {
  const router = useRouter();
  const { locale } = router;
  const norsk = locale === 'nb';

  const [successSubmission, setSuccessSubmission] = useState(false);
  const [submission, setSubmission] = useState(false);
  const handleSubmit = async (inputFields) => {
    let final = Object.assign(
      { templateId: 'd-a2bc641e767d4c6288b9bdcf7d97739e' },
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
      label: norsk ? 'Prosjektor' : 'Projector',
      name: 'Utstyr',
      id: 1,
      value: 'Prosjektor',
    },
    {
      label: norsk ? 'Taleanlegg' : 'Voice systems',
      name: 'Utstyr',
      id: 2,
      value: 'Taleanlegg',
    },
    {
      label: norsk ? 'Lys' : 'Lighting',
      name: 'Utstyr',
      id: 3,
      value: 'Lys',
    },
    {
      label: norsk ? 'Musikkanlegg' : 'Music system',
      name: 'Utstyr',
      id: 4,
      value: 'Musikkanlegg',
    },
  ];

  const INITIAL_FORM_STATE = {
    Navn: '',
    Epost: '',
    Dato: '',
    ArrangementType: '',
    Beskrivelse: '',
    Annet: '',
    Utstyr: [],
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
    Dato: Yup.date()
      .required(norsk ? 'Nødvendig!' : 'Required!')
      .min(
        new Date(),
        norsk ? 'Dato må være i fremtiden!' : 'Date must be in the future!'
      ),
    ArrangementType: Yup.string().required(norsk ? 'Nødvendig!' : 'Required!'),
    Beskrivelse: Yup.string().required(norsk ? 'Nødvendig!' : 'Required!'),
    Annet: Yup.string(),
    Utstyr: Yup.array().required(norsk ? 'Nødvendig!' : 'Required!'),
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
            label={norsk ? 'E-post' : 'Email'}
            name="Epost"
            type="mail"
          />
          <DateTimePicker
            label={norsk ? 'Ønsket dato' : 'Desired date'}
            name="Dato"
          />
          <Textfield
            label={norsk ? 'Type arrangement' : 'Type of event'}
            name="ArrangementType"
            type="text"
          />
          <Textfield
            label={
              norsk
                ? 'Beskrivelse av arrangementet'
                : 'Description of the event'
            }
            name="Beskrivelse"
            type="text"
            multiline={true}
            rows={4}
          />

          <div role="group" aria-labelledby="checkbox-group">
            <Checkbox
              type="checkbox"
              name="Utstyr"
              checkBoxOptions={checkBoxOptions}
              // onChange={handleChange}
            />
          </div>

          <Textfield
            label={norsk ? 'Annet' : 'Other'}
            name="Annet"
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

export default BookingForm;
