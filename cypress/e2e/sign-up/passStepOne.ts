export default function passStepOne() {
  cy.intercept('POST', '/api/auth/signup/', { res: true }).as('send-email');

  // Type current email
  const newEamil = `example@test.com`;
  cy.getByData('sign-up-email').find('input').type(newEamil);

  // Submit form
  cy.getByData('submit-btn').click();

  // Wait for sign up send email request
  cy.wait('@send-email').its('response.statusCode').should('eq', 200);

  return newEamil;
}
