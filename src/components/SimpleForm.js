import React, { useEffect, useState } from 'react';
import validator from 'validator';
import InputField from './InputField';

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0,
    country: '',
    password: '',
  });

  const [formDataError, setFormDataError] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((field) => field !== '');
    const noErrors = Object.values(formDataError).every((error) => error === '');
    setButtonDisabled(!(allFieldsFilled && noErrors));
  }, [formData, formDataError]);

  const validateInput = (name, value) => {
    let hasValidationError = false;

    switch (name) {
      case 'name':
        if (!validator.isLength(value, { min: 3, max: 10 })) {
          setFormDataError({
            ...formDataError,
            name: 'Name cannot be less than 3!',
          });
          hasValidationError = true;
        } else {
          setFormDataError({
            ...formDataError,
            name: '',
          });
        }
        break;

      case 'email':
        if (!validator.isEmail(value)) {
          setFormDataError({
            ...formDataError,
            email: 'Email is not valid!',
          });
          hasValidationError = true;
        } else {
          setFormDataError({
            ...formDataError,
            email: '',
          });
        }
        break;

      case 'age':
        if (!validator.isNumeric(value)) {
          setFormDataError({
            ...formDataError,
            age: 'Age must be a number',
          });
          hasValidationError = true;
        } else {
          setFormDataError({
            ...formDataError,
            age: '',
          });
        }
        break;

      case 'password':
        if (!validator.isStrongPassword(value, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 })) {
          setFormDataError({
            ...formDataError,
            password: 'Password must contain at least 8 characters',
          });
          hasValidationError = true;
        } else {
          setFormDataError({
            ...formDataError,
            password: '',
          });
        }
        break;

      case 'country':
        if (!validator.isLength(value, { min: 3 })) {
          setFormDataError({
            ...formDataError,
            country: 'Country must be at least 3 characters long',
          });
          hasValidationError = true;
        } else {
          setFormDataError({
            ...formDataError,
            country: '',
          });
        }
        break;

      default:
        console.log(`Unexpected error`);
    }

    return !hasValidationError;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (validateInput(name, value)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!buttonDisabled) {
      console.log('Form Data:', formData);
    }
  };

  return (
    <form className='container mx-auto w-full	flex justify-center flex-col' onSubmit={handleSubmit}>
      <h2 className='text-6xl m-6 text-slate-100 drop-shadow-2xl '>Signup</h2>

      <div className='bg-slate-500 shadow-xl w-auto md:w-1/2 p-8 m-2 rounded-md h-full flex flex-col gap-4 justify-center self-center items-center'>
        {Object.keys(formData).map((el) => (
          <InputField
            key={el}
            labelName={el}
            formData={formData}
            handleInputChange={handleInputChange}
            formDataError={formDataError}
          />
        ))}

        <button
          className='rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300 w-1/2 disabled:opacity-50'
          type="submit"
          disabled={buttonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleForm;
