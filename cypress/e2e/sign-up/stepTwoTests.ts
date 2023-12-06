import { fillOtpInput } from '../utils';
import passStepOne from './passStepOne';
import passStepTwo from './passStepTwo';

export default function stepTwoTests() {
  beforeEach(() => {
    cy.intercept('POST', '/api/auth/signup/verify-otp/', {
      statusCode: 400,
      body: {
        errors: [
          {
            detail: 'Incorrect token. Please try again.'
          }
        ]
      }
    }).as('send-otp');
  });

  context('Render test', () => {
    it('check back component', () => {
      // Pass step one
      passStepOne();

      cy.contains('Back to sign up').click();
      cy.getByData('send-email-form').should('exist');
    });
  });

  context('Validation tests', () => {
    it('fill correct email but wrong otp', () => {
      // Pass step one
      passStepOne();

      // Fill otp input
      fillOtpInput();
      // Wait for sign up send otp request
      cy.wait('@send-otp').its('response.statusCode').should('eq', 400);
      cy.contains('Incorrect token. Please try again.');
    });

    it('fill correct email and otp go to step 3', () => {
      // Pass step one
      passStepOne();
      // Pass step two
      passStepTwo();
      // Check we are in step 3 (send user information) or not
      cy.getByData('send-user-info');
    });
  });

  it('fill correct email and otp and submit step 3 immediately', () => {
    // Pass step one
    passStepOne();
    // Pass step two
    passStepTwo();
    // Submit form
    cy.getByData('submit-btn').click();
    cy.contains('Password is required');
    cy.contains('Gender is required');
    cy.contains('Location is required');
    cy.contains('Date of birth is required');
  });
}
