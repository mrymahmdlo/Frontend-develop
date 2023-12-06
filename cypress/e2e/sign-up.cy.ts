import {
  stepOneTests,
  stepTwoTests,
  stepThreeTests,
  stepFourTests
} from './sign-up';

describe('render the sign up page correctly', () => {
  it('passes', () => {
    cy.visit('/sign-up');
  });
});

describe('test all sign up flows with real and mock API', () => {
  beforeEach(() => {
    cy.visit('/sign-up'); // go to sign up page
  });

  // Sign up step one (send email) tests
  stepOneTests();
  // Sign up step two (otp) tests
  stepTwoTests();
  // Sign up step three (send information) tests
  stepThreeTests();
  // Sign up step four (favorite market) tests
  stepFourTests();
});
