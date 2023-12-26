import { validationMessageHandler as message } from './validationMessageHandler';

// Form validation rules
export const getUserInformationsValidations = {
  password: {
    required: message.required('Password'),
    minLength: message.minLength('Password', 8),
    maxLength: message.maxLength('Password', 32),
    validate: {
      noSpaceCharacter: (v: string) => message.noSpaceChar('Password', v),
      strongPassword: (v: string) => message.strongPassword(v)
    }
  },
  gender: {
    required: message.required('Gender')
  },
  dateOfBirth: {
    required: message.required('Date of birth')
  },
  location: {
    required: message.required('Location')
  },
  mobile: {
    validate: {
      matchPattern: (v: string) => {
        return message.mobile(v);
      }
    }
  },
  email: {
    required: message.required('ایمیل'),
    maxLength: message.maxLength('ایمیل', 100),
    validate: {
      matchPattern: (v: string) => message.email(v)
    }
  }
};
