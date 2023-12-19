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
    value === passwordValue || `کلمه عبور و تکرار منطبق نیست`,

  digits: (fieldName: string, value: string, digits: number) =>
    value.length === digits || `${fieldName} must be ${digits} digits.`,

  email: (value: string) =>
    patterns.email.test(value) || 'آدرس ایمیل باید معتبر باشد',

  usernameOrEmail: (value: string) =>
    patterns.username.test(value) ||
    patterns.email.test(value) ||
    'نام کاربری باید معتبر باشد',

  noSpaceChar: (fieldName: string, value: string) =>
    value.indexOf(' ') === -1 || `${fieldName} نباید دارای فاصله باشد`,

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

  required: (fieldName: string) => `${fieldName} باید پر شود`,

  strongPassword: (value: string) =>
    patterns.strongPassword.test(value) ||
    'کلمه عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک و یک عدد باشد'
};
