import { SubmitButton } from '@/components/General';

describe('SubmitButton component', () => {
  // check if the button has the correct text and width
  it('should display the correct text and width of the button', () => {
    cy.mount(<SubmitButton>Submit</SubmitButton>); // mount the component

    cy.get('button').should('have.text', 'Submit'); // default text
    cy.get('button').should('have.css', 'width', '500px'); // default width
  });

  // check if the button triggers the onSubmit callback when clicked
  it('should trigger the onSubmit callback when clicked', () => {
    cy.mount(<SubmitButton>Submit</SubmitButton>); // mount the component

    cy.get('button').click(); // click the button
  });

  // check if the button is disabled when provided
  it('should be disabled when provided', () => {
    cy.mount(<SubmitButton disabled={true}>Submit</SubmitButton>); // mount the component with disabled prop

    cy.get('button').should('have.attr', 'disabled'); // check if the button has disabled attribute
    cy.get('button').should(
      'have.css',
      'background-color',
      'rgba(29, 161, 243, 0.5)'
    ); // check if the button has lower opacity
  });
});
