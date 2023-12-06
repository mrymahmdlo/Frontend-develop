import { validationMessageHandler as message } from './validationMessageHandler';

// Form validation rules
export const signUpValidations = {
  email: {
    required: message.required('Email'),
    maxLength: message.maxLength('Email', 100),
    validate: {
      matchPattern: (v: string) => message.email(v)
    }
  }
};
