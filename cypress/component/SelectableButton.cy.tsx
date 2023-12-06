import { SelectableButton } from '@/components/General';
import { mount } from 'cypress/react18';
import React from 'react';

describe('SelectableButton', () => {
  it('renders the component with default props', () => {
    mount(<SelectableButton isActive={true}>Click me</SelectableButton>);
  });
});

describe('SelectableButton', () => {
  it('renders the component with custom props', () => {
    mount(
      <SelectableButton isActive={true} onSelect={() => alert('Hello')}>
        Click me
      </SelectableButton>
    );
    // check that the button is visible
    cy.get('button').should('be.visible');
    // check that the button has the correct text
    cy.get('button').should('contain.text', 'Click me');
    // check that the button has the active color
    cy.get('button').should(
      'have.css',
      'background-color',
      'rgb(25, 118, 210)'
    );
    // check that the button triggers an alert when clicked
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Hello');
    });
    cy.get('button').click();
  });
});
