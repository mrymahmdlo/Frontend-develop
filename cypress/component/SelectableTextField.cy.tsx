import { SelectableTextField } from '@/components/General';
import ThemeRegistry from '@/lib/ThemeRegistery';
import { mount } from 'cypress/react18';

describe('SelectableTextField', () => {
  it('renders the component with default props', () => {
    mount(
      <ThemeRegistry>
        <SelectableTextField
          onClick={() => alert('Clicked')}
          value='Hello'
          label='Name'
        />
      </ThemeRegistry>
    );
  });
});

describe('SelectableTextField', () => {
  it('renders the component with default props', () => {
    mount(
      <ThemeRegistry>
        <SelectableTextField
          onClick={() => alert('Clicked')}
          value='Hello'
          label='Name'
        />
      </ThemeRegistry>
    );
    // check that the container is visible
    cy.get('[data-test-id=selectable-container]').should('be.visible');
    // check that the text field has the correct value and label
    cy.get('input').should('have.value', 'Hello');
    cy.get('label').should('contain.text', 'Name');
    // check that the icon is displayed
    cy.get('svg');
  });

  it('renders the component with custom props', () => {
    mount(
      <ThemeRegistry>
        <SelectableTextField
          onClick={() => alert('Clicked')}
          value='World'
          label='Greeting'
          errorMessage='Invalid input'
        />
      </ThemeRegistry>
    );
    // check that the container is visible
    cy.get('[data-test-id=selectable-container]').should('be.visible');
    // check that the text field has the correct value and label
    cy.get('input').should('have.value', 'World');
    cy.get('label').should('contain.text', 'Greeting');
    // check that the icon is displayed
    cy.get('svg');
    // check that the error message is displayed
    cy.contains('Invalid input');
  });

  it('triggers an alert when clicked', () => {
    mount(
      <ThemeRegistry>
        <SelectableTextField
          onClick={() => alert('Clicked')}
          value='Hello'
          label='Name'
        />
      </ThemeRegistry>
    );
    // check that the container is visible
    cy.get('[data-test-id=selectable-container]').should('be.visible');
    // check that the text field has the correct value and label
    cy.get('input').should('have.value', 'Hello');
    cy.get('label').should('contain.text', 'Name');
    // check that the icon is displayed
    cy.get('svg');
    // check that the container triggers an alert when clicked
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Clicked');
    });
    cy.get('[data-test-id=selectable-container]').click();
  });
});
