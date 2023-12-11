export const patterns = {
  // eslint-disable-next-line no-useless-escape
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  username: /"^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$"/, // length of username set to 32
  mobile: /(09)[0-9]{8}/,
  strongPassword: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/
};

// todo
// messages must be multilingual
export const validationMessageHandler = {
  confirmPassword: (value: string, passwordValue: string) =>
    value === passwordValue || `Password and Confirm password does not match`,

  digits: (fieldName: string, value: string, digits: number) =>
    value.length === digits || `${fieldName} must be ${digits} digits.`,

  email: (value: string) =>
    patterns.email.test(value) || 'Email address must be a valid address',

  usernameOrEmail: (value: string) =>
    patterns.username.test(value) ||
    patterns.email.test(value) ||
    'Username/Email must be a valid string',

  noSpaceChar: (fieldName: string, value: string) =>
    value.indexOf(' ') === -1 || `${fieldName} must not contain any spaces`,

  maxLength: (fieldName: string, value: number = 50) => ({
    value: value,
    message: `${fieldName} is too long (maximum is ${value} characters)`
  }),

  minLength: (fieldName: string, value: number = 8) => ({
    value: value,
    message: `${fieldName} is too small (minimum is ${value} characters)`
  }),

  mobile: (value: string) =>
    patterns.mobile.test(value) || `شماره تماس معتبر نیست `,

  required: (fieldName: string) => `${fieldName} is required`,

  strongPassword: (value: string) =>
    patterns.strongPassword.test(value) ||
    'Password must has at least one uppercase, lowercase, and number'
};
