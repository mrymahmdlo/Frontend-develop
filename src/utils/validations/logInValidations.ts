import { validationMessageHandler as message } from './validationMessageHandler';

export const logInValidations = {
  mobileOrEmail: {
    required: message.required('شماره تماس'),
    maxLength: message.maxLength('شماره تماس', 100),
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
    required: message.required('کلمه عبور')
  },
  mobile: {
    validate: {
      matchPattern: (v: string) => {
        return message.mobile(v);
      }
    }
  }
};
