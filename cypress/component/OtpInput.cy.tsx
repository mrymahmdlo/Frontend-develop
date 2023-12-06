import React, { useState } from 'react';
import OtpInput from '@/components/General/OtpInput/index';

describe('<OtpInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<OtpInput value='' onChange={() => {}} />);
  });
});

const Sample = () => {
  const [value, setValue] = useState('');
  return <OtpInput value={value} onChange={setValue} />;
};

describe('OtpInput component', () => {
  beforeEach(() => {
    cy.mount(<Sample />);
  });

  // check if the input has the correct length and value
  it('should display the correct length and value of the input', () => {
    cy.get('.MuiOtpInput-Box').children().should('have.length', 6); // default length is 6
    cy.get('.MuiOtpInput-Box')
      .children()
      .each(($el) => {
        cy.wrap($el).find('input').should('have.value', ''); // default value is empty
      });
  });

  // check if the input accepts only numeric values
  it('should accept only numeric values in the input', () => {
    cy.get('.MuiOtpInput-Box').children().first().find('input').type('a'); // try to type a non-numeric value
    cy.get('.MuiOtpInput-Box')
      .children()
      .first()
      .find('input')
      .should('have.value', ''); // should not change the value

    cy.get('.MuiOtpInput-Box').children().first().find('input').type('1'); // try to type a numeric value
    cy.get('.MuiOtpInput-Box')
      .children()
      .first()
      .find('input')
      .should('have.value', '1'); // should change the value
  });

  // check if the input triggers the onChange callback with the correct value
  it('should trigger the onChange callback with the correct value', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy'); // create a spy for the onChange prop
    cy.mount(<OtpInput value='' onChange={onChangeSpy} />); // mount the component with the spy

    cy.get('.MuiOtpInput-Box').children().first().find('input').type('1'); // type a numeric value
    cy.get('@onChangeSpy').should('have.been.calledWith', '1'); // check if the spy was called with the correct value
  });

  // check if the input displays the error message when provided
  it('should display the error message when provided', () => {
    const errorMessage = 'Invalid OTP'; // create an error message
    cy.mount(
      <OtpInput value='' onChange={() => {}} errorMessage={errorMessage} />
    ); // mount the component with the error message

    cy.get('.error-message').should('have.text', errorMessage); // check if the error message is displayed
    cy.get('.MuiInputBase-root').should('have.css', 'color', 'rgb(243, 2, 76)'); // check if the input border color is red
  });
});
