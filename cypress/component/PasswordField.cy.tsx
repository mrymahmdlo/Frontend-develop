import { PasswordField } from '@/components/General';
import { useState } from 'react';

const Sample = () => {
  const [value, setValue] = useState('');
  return <PasswordField value={value} onChange={setValue} />;
};

describe('PasswordField component', () => {
  beforeEach(() => {
    cy.mount(<Sample />);
  });

  // check if the input has the correct label and value
  it('should display the correct label and value of the input', () => {
    cy.get('.MuiFormLabel-root').should('have.text', 'Password'); // default label is Password
    cy.get('.MuiInputBase-input').should('have.value', ''); // default value is empty
  });

  // check if the input accepts any values
  it('should accept any values in the input', () => {
    cy.get('.MuiInputBase-input').type('test123'); // type a value
    cy.get('.MuiInputBase-input').should('have.value', 'test123'); // should change the value
  });

  // check if the input triggers the onChange callback with the correct value
  it('should trigger the onChange callback with the correct value', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy'); // create a spy for the onChange prop
    cy.mount(<PasswordField value='' onChange={onChangeSpy} />); // mount the component with the spy

    cy.get('.MuiInputBase-input').type('t'); // type a value
    cy.get('@onChangeSpy').should('have.been.calledWith', 't'); // check if the spy was called with the correct value
  });

  // check if the input toggles between password and text type when clicking the icon
  it('should toggle between password and text type when clicking the icon', () => {
    cy.get('.MuiInputBase-input').should('have.attr', 'type', 'password'); // default type is password
    cy.get('.MuiSvgIcon-root').click(); // click the icon
    cy.get('.MuiInputBase-input').should('have.attr', 'type', 'text'); // should change the type to text
    cy.get('.MuiSvgIcon-root').click(); // click the icon again
    cy.get('.MuiInputBase-input').should('have.attr', 'type', 'password'); // should change the type back to password
  });

  // check if the input displays the error message when provided
  it('should display the error message when provided', () => {
    const errorMessage = 'Invalid password'; // create an error message
    cy.mount(
      <PasswordField value='' onChange={() => {}} errorMessage={errorMessage} />
    ); // mount the component with the error message

    cy.get('.error-message').should('have.text', errorMessage); // check if the error message is displayed
    cy.get('.MuiFilledInput-root').should(
      'have.css',
      'border-color',
      'rgb(243, 2, 76)'
    ); // check if the input border color is red
  });
});
