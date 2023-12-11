import { validationMessageHandler as message } from './validationMessageHandler';

export const logInValidations = {
  mobileOrEmail: {
    required: message.required('Email, phone number or username'),
    maxLength: message.maxLength('Email, phone number or username', 100),
    validate: {
      matchPattern: (v: string) => {
        const isMobile = /^\d+$/.test(v);
        if (isMobile) {
          return message.mobile(v);
        } else {
          return message.email(v);
        }
      }
    }
  },
  password: {
    required: message.required('Password')
  },
  mobile: {
    validate: {
      matchPattern: (v: string) => {
        return message.mobile(v);
      }
    }
  }
};
