import { fillOtpInput } from '../utils';

export default function passStepTwo() {
  cy.intercept('POST', '/api/auth/signup/verify-otp/', { res: true }).as(
    'send-otp'
  );

  // Fill otp input
  fillOtpInput();

  // Wait for sign up send otp request
  cy.wait('@send-otp').its('response.statusCode').should('eq', 200);
}
