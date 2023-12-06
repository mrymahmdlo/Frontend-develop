import { validationMessageHandler as message } from './validationMessageHandler';

// Form validation rules
export const forgetPasswordValidations = {
  email: {
    maxLength: message.maxLength('Email', 100),
    validate: {
      matchPattern: (v: string) => message.usernameOrEmail(v)
    }
  },
  phoneNumber: {
    maxLength: message.maxLength('Phone number', 11),
    validate: {
      matchPattern: (v: string) => message.mobile(v)
    }
  },
  password: {
    required: message.required('Password'),
    minLength: message.minLength('Password', 8),
    maxLength: message.maxLength('Password', 32),
    validate: {
      noSpaceCharacter: (v: string) => message.noSpaceChar('Password', v),
      strongPassword: (v: string) => message.strongPassword(v)
    }
  },
  repPassword: {
    required: message.required('Password'),
    minLength: message.minLength('Password', 8),
    maxLength: message.maxLength('Password', 32),
    validate: {
      noSpaceCharacter: (v: string) => message.noSpaceChar('Password', v),
      strongPassword: (v: string) => message.strongPassword(v)
    }
  }
};
