import { fillOtpInput } from './utils';

export {};

const femail = 'example@test.com' as const;
const trueEmail = 'perriex@gmail.com' as const;

const phone = '09111111111' as const;
const password = '1q2wE35t' as const;
const repPassword = '1q2wE35t' as const;
const nonerepPassword = '1q2wE45t' as const;

describe('render the forget password page correctly', () => {
  it('passes', () => {
    cy.visit('/forget-password');
  });
});

describe('test all steps with API', () => {
  beforeEach(() => {
    cy.visit('/forget-password');
  });
  it('invalid email', () => {
    cy.get('[data-test-id=user_email]').should('have.value', '');
    cy.get('[data-test-id=user_email]').type(femail);
    cy.contains('Next').click();
    cy.contains('Invalid input.');
  });
  it('invalid phone number', () => {
    cy.get('[test-id=phone-tab]').trigger('click');
    cy.get('[data-test-id=user_phone]').type(phone);
    cy.contains('Next').click();
    cy.contains('Invalid input.');
  });
  it('valid email', () => {
    cy.get('[data-test-id=user_email]').should('have.value', '');
    cy.get('[data-test-id=user_email]').type(trueEmail);
    cy.contains('Next').click();
    cy.contains('The verification code has been sent to your email');
  });
  it('valid email but wrong otp', () => {
    cy.get('[data-test-id=user_email]').should('have.value', '');
    cy.get('[data-test-id=user_email]').type(trueEmail);
    cy.contains('Next').click();
    fillOtpInput();
    cy.contains('Incorrect token. Please try again.');
  });
  it('valid email, valid otp, wrong token', () => {
    cy.get('[data-test-id=user_email]').should('have.value', '');
    cy.get('[data-test-id=user_email]').type(trueEmail);
    cy.contains('Next').click();
    cy.contains('Enter confirmation code');
    cy.intercept(
      'POST',
      'http://82.115.26.242:30010/api/auth/forget-password/otp/',
      { fixture: 'forget-password.json' }
    ).as('sendToken');
    fillOtpInput();
    cy.get('[id=new-password]').type(password);
    cy.get('[id=repeat-password]').type(repPassword);
    cy.contains('Next').click();
    cy.contains('Token is either invalid or expired.');
  });
});

describe('test all steps with mock API', () => {
  beforeEach(() => {
    cy.visit('/forget-password');
    cy.intercept(
      'POST',
      'http://82.115.26.242:30010/api/auth/forget-password/',
      { res: true }
    ).as('sendOtp');
    cy.intercept(
      'POST',
      'http://82.115.26.242:30010/api/auth/forget-password/otp/',
      { fixture: 'forget-password.json' }
    ).as('sendToken');
    cy.intercept(
      'POST',
      'http://82.115.26.242:30010/api/auth/forget-password/change-password/',
      { res: true }
    ).as('resetPassword');
  });

  it('submit form step one and two correctly, but step three wrong', () => {
    cy.get('[data-test-id=user_email]').should('have.value', '');
    cy.get('[data-test-id=user_email]').type(femail);
    cy.contains('Next').click();
    cy.contains('Enter confirmation code');
    cy.contains(femail);
    fillOtpInput();
    cy.contains('Reset password');
    cy.get('[id=new-password]').type(password);
    cy.get('[id=repeat-password]').type(nonerepPassword);
    cy.get('.Mui-disabled');
  });

  it('submit all forms correctly', () => {
    cy.get('[data-test-id=user_email]').should('have.value', '');
    cy.get('[data-test-id=user_email]').type(femail);
    cy.contains('Next').click();
    cy.contains('Enter confirmation code');
    cy.contains(femail);
    fillOtpInput();
    cy.contains('Reset password');
    cy.get('[id=new-password]').type(password);
    cy.get('[id=repeat-password]').type(repPassword);
    cy.contains('Next').click();
    cy.url().should('include', '/log-in');
  });
});

describe('test content of forms', () => {
  beforeEach(() => {
    cy.visit('/forget-password');
  });
  it('proper text renders in step one', () => {
    cy.contains('Trouble logging in?');
    cy.contains(
      'Enter your username or email and we’ll send you a link to get back into your account.'
    );
    cy.get('[test-id=phone-tab]').trigger('click');
    cy.contains(
      'Enter your phone number and we’ll send you a link to get back into your account.'
    );
  });
  it('click help link in step one', () => {
    cy.contains('Can’t reset your password?').trigger('click');
    cy.url().should('include', '/help-center');
  });
  it('fill email form in step one', () => {
    cy.get('[data-test-id=user_email]').should('have.value', '');
    cy.get('[data-test-id=user_email]').type(femail);
  });
  it('fill wrong email and click next in step one', () => {
    cy.get('[data-test-id=user_email]').should('have.value', '');
    cy.get('[data-test-id=user_email]').type(femail.slice(1, 6));
    cy.contains('Next').click();
    cy.contains('Username/Email must be a valid string');
  });
  it('fill phone form in step one', () => {
    cy.get('[test-id="phone-tab"]').trigger('click');
    cy.get('[data-test-id=user_phone]').should('have.value', '');
    cy.get('[data-test-id=user_phone]').type(phone);
  });
});
